"use client";

import { signIn } from "next-auth/react";

import { doCredentialLogin } from "@/app/actions/actions";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {

    const [error, setError] = useState("");
    const router = useRouter();

    async function handleFormSubmit(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);

            const response = await doCredentialLogin(formData);

            if (!!response.error) {
                setError(response.error.message);
            } else {
                router.push('/');
            }

        } catch (error) {
            console.error(error);
            setError("Check your credentials !");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {/* Social Login */}
            <h2 className="font-bold">OAuth authentification</h2>
            <div className="flex gap-5">
                <button className="border p-2" onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
                    Sign in with GitHub
                </button>
                <button className="border p-2" onClick={() => signIn("google", { redirectTo: "/dashboard" })}>
                    Sign in with Google
                </button>
            </div>

            {/* Credentials Login */}
            <div className="text-xl text-red-500">{error}</div>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 mt-5">
                <h2>Credentials authentification</h2>
                <label htmlFor="credentials-email">
                    Email
                    <input type="email" id="credentials-email" name="email" />
                </label>
                <label htmlFor="credentials-password">
                    Password
                    <input type="password" id="credentials-password" name="password" />
                </label>
                <input type="submit" value="Sign In" />
            </form>
        </div>
    )
}