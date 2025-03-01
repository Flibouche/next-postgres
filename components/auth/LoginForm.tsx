"use client";

import { doCredentialLogin } from "@/app/actions/actions";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SocialLogins from "./SocialLogins";


const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);

            const response = await doCredentialLogin(formData);

            if (response.error) {
                console.error(response.error);
                setError("Check your credentials");
            } else {
                router.push("/");
            }

        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
                setError(error.message);
            } else {
                console.error(error);
            }
        }
    }

    return (
        <>
            <div className="text-xl text-red-500">{error}</div>
            <form
                className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
                onSubmit={onSubmit}>
                <div className="my-2">
                    <label htmlFor="email">Email Address</label>
                    <input className="border mx-2 border-gray-500 rounded" type="email" name="email" id="email" />
                </div>

                <div className="my-2">
                    <label htmlFor="password">Password</label>
                    <input className="border mx-2 border-gray-500 rounded" type="password" name="password" id="password" />
                </div>

                <button type="submit" className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36">
                    Ceredential Login
                </button>
            </form>
            <SocialLogins />
        </>
    );
};

export default LoginForm;