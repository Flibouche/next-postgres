import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'

// Liste des routes protégées et publiques
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/']

// Middleware qui permet de protéger les routes de l'application en vérifiant si l'utilisateur est connecté ou non
export default async function middleware(req: NextRequest) {
    // Vérification de la route actuelle si elle est protégée ou publique
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    // Déchiffrement de la session à partir du cookie
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    // Redirection vers la page de connexion si l'utilisateur n'est pas connecté
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // Redirection vers le dashboard si l'utilisateur est connecté
    if (
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith('/dashboard')
    ) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes qui ne doivent pas être protégées par le middleware
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}