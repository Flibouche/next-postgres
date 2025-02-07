import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { signInSchema } from "./zod";
import { getUser } from "./dal";
import { hashPassword } from "./hash";
import { compare } from "bcryptjs";

import { getUsersByEmail } from "@/app/data/users";

export default {
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {

                if (!credentials) return null;

                try {
                    const user = getUsersByEmail(credentials?.email);

                    if (user) {
                        const isMatch = user?.password === credentials?.password;

                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Check your password !");
                        }

                    } else {
                        throw new Error("User not found.");
                    }

                } catch (error) {
                    throw new Error(error);
                }
                // let user = null

                // const { email, password } = await signInSchema.parseAsync(credentials);

                // // logic to salt and hash password
                // const hashedPassword = hashPassword(password)

                // // logic to verify if the user exists
                // user = await getUser(email)

                // if (!user) {
                //     // No user found, so this is their first attempt to login
                //     // Optionally, this is also the place you could do a user registration
                //     throw new Error("Invalid credentials.")
                // }

                // const isValidPassword = await compare(hashedPassword, user.password)
                // if (!isValidPassword) {
                //     throw new Error("Invalid credentials.")
                // }

                // // return user object with their profile data
                // return user
            },
        }),
    ]
} satisfies NextAuthConfig