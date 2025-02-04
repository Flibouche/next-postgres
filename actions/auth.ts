"use server";

import bcrypt from 'bcryptjs';
import { SignupFormSchema, FormState, LoginFormSchema } from '@/lib/definitions'
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
}

export async function login(state: FormState, formData: FormData) {
    const validatedFields = LoginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return {
            message: 'Invalid credentials.',
        }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return {
            message: 'Invalid credentials.'
        };
    }

    await createSession(user.id);

    redirect('/');
}

export async function logout() {
    deleteSession();
    redirect('/');
}