import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import prisma from './prisma'

// Fonction qui permet de vérifier si la session de l'utilisateur est valide
export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (!session?.userId) {
        redirect('/login')
    }

    return { isAuth: true, userId: session.userId }
})

// Fonction qui permet de récupérer les informations de l'utilisateur connecté
export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        })

        if (!user) {
            throw new Error('User not found');
        }

        return user
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})