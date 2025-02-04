'use client'

import { logout } from '@/actions/auth'
import { useActionState } from 'react'

export default function SignoutForm() {
    const [state, action, pending] = useActionState(logout, undefined)

    return (
        <form action={action}>
            <button disabled={pending} type="submit">
                Logout
            </button>
        </form>
    )
}