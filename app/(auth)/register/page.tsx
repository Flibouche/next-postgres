import { getSession } from '@/lib/session';
import SignupForm from '@/ui/signup-form';
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Register() {
    const session = await getSession();

    if (session) {
        redirect('/')
    }

    return (
        <div>
            <SignupForm />
        </div>
    )
}
