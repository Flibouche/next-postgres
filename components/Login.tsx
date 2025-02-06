"use client";

import { signIn } from "next-auth/react";

const Login = () => {
    const credentialsAction = (formData: FormData) => {
        signIn("credentials", formData)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="font-bold">OAuth authentification</h2>
            <div className="flex gap-5">
                <button className="border p-2" onClick={() => signIn("github", { redirectTo: "/dashboard" })}>
                    Sign in with GitHub
                </button>
                <button className="border p-2" onClick={() => signIn("google", { redirectTo: "/dashboard" })}>
                    Sign in with Google
                </button>
            </div>

            <form action={credentialsAction} className="flex flex-col gap-2 mt-5">
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

export default Login