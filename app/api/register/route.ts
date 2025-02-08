import { hashPassword } from "@/lib/hash";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
    const { name, email, password } = await request.json();

    console.log(name, email, password);
    
    // Encrypt the password
    const hashedPassword = await hashPassword(password);

    // Form a DB payload
    const newUser = {
        name,
        password: hashedPassword,
        email,
    }

    try {
        await prisma.user.create({
            data: newUser,
        });

        return new NextResponse("User has been created", {
            status: 201,
        });
    } catch (error) {
        return new NextResponse(error.message, {
            status: 500,
        });
    }
}