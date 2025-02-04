import { getSession } from '@/lib/session';
import LoginForm from '@/ui/login-form'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Login() {
    const session = await getSession();

    if (session) {
        redirect('/')
    }

    return (
        <div>
            <LoginForm />
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}
