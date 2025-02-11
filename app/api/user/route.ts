import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
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