"use server";

import bcrypt from 'bcryptjs';
import { SignupFormSchema, FormState } from '@/lib/definitions'
import prisma from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // 2. Prepare data for insertion into database
    const { name, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        return { message: 'A user with that email already exists.' }
    }

    // 3. Insert the user into the database or call an Auth Library's API
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    if (!user) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }

    console.log('User created:', user);

    await createSession(user.id);

    redirect('/posts');
}

export async function logout() {
    deleteSession();
    redirect('/');
}