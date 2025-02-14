import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig, User } from "next-auth";
import { isPasswordValid } from "./hash";
import { prisma } from "./prisma";

declare module "next-auth" {
    interface User {
        role: string;
    }
}

export default {
    providers: [
        // Authentification par GitHub
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        // Authentification par Google
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        // Authentification par identifiants
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            // Fonction pour vérifier les identifiants
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
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },

        // Ajout du rôle utilisateur à la session
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },

        // Redirection après connexion
        async redirect({ url, baseUrl }) {
            // Vérification si un callback est présent dans l'URL pour rediriger l'utilisateur sur la page souhaitée
            const callbackUrl = new URL(url, baseUrl).searchParams.get("callbackUrl");
            // Redirige vers la page d'accueil si il n'y a pas de callback
            return callbackUrl ? decodeURIComponent(callbackUrl) : "/";
        }
    }
} satisfies NextAuthConfig