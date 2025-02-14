"use server";

import { signIn, signOut } from "@/lib/auth";

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/dashboard" });
}

export async function doLogout() {
    await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        console.log(response);

        if (response.error) {
            console.log("Test");
            throw new Error(response.error);
        }

        return response;
    } catch (error) {
        throw new Error(error);
    }
}