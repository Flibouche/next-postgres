"use server";

import { signIn, signOut } from "@/lib/auth";
// import nodemailer from "nodemailer";

export async function doSocialLogin(formData) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/dashboard" });
}

export async function doLogout() {
    await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(formData) {
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     port: 587,
    //     secure: false,
    //     auth: {
    //         user: process.env.EMAIL_USER,
    //         pass: process.env.EMAIL_PASSWORD,
    //     },
    // });

    // const mailOptions = {
    //     from: process.env.EMAIL_USER,
    //     to: "kevin.pfiffer2@gmail.com",
    //     subject: "Test",
    //     text: "Hello ceci est un test",
    // };

    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        // await transporter.sendMail(mailOptions);

        if (response.error) {
            console.log("Test");
            throw new Error(response.error);
        }

        return response;
    } catch (error) {
        throw new Error(error);
    }
}