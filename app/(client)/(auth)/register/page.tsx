import React from 'react'
import RegistrationForm from '@/components/auth/RegistrationForm'

import Link from 'next/link'
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
    const session = await auth();

    if (session?.user) redirect("/");

    return (
        <div className="flex flex-col justify-center items-center m-4">
            <RegistrationForm />
            <p className="my-3">
                Already have an account?
                <Link href="/" className="mx-2 underline">Login</Link>
            </p>
        </div>

    )
};