import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { isPasswordValid } from "./hash";
import { prisma } from "./prisma";

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
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {

                if (!credentials) return null;

                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        },
                    });

                    if (user) {
                        const isMatch = await isPasswordValid(
                            credentials.password,
                            user.password
                        );

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
            },
        }),
    ],
    callbacks: {
        // Ajout du rôle utilisateur au token JWT
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                // token.role = user.role;
            }
            return token;
        },

        // Ajout du rôle utilisateur à la session
        async session({session, token}) {
            if (session.user) {
                session.user.id = token.id as string;
                // session.user.role = token.role as string;
            }
            return session;
        },
        
        async redirect() {
            return "/dashboard";
        }
    }
} satisfies NextAuthConfig