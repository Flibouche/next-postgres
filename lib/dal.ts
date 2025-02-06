import { prisma } from "./prisma"

export async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        return user;
    } catch (error) {
        console.error("Error fetching user", error);
        return null;
    }
}