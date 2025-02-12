import { prisma } from "@/lib/prisma";
import { User } from "@/lib/types/types";
import { NextResponse } from "next/server";

type PartialUser = Pick<User, "id" | "email" | "name">;

export async function GET() {
    try {
        const users: PartialUser[] = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
            orderBy: {
                name: 'asc'
            }
        });

        if (!users) {
            return NextResponse.json({ data: null, message: "No users found", success: false }, { status: 404 })
        }

        return NextResponse.json({ data: users, message: "Users found", success: true }, { status: 200 })
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("[USERS_GET]", error);
        }
        return NextResponse.json({ data: null, message: `Internal Error: ${(error as Error).message}`, success: false }, { status: 500 });
    }
}