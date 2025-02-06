"use client";

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
// Next
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
import { IoHome } from 'react-icons/io5';
// import { PiArticleNyTimesFill } from "react-icons/pi";
// import SignoutForm from '@/ui/signout-form';


const links = [
    { name: 'Home', path: '/', icon: <IoHome className='size-4' /> },
];

// const authLinks = [
//     { name: 'Login', path: '/login', icon: <PiArticleNyTimesFill className='size-4' /> },
//     { name: 'Register', path: '/register', icon: <PiArticleNyTimesFill className='size-4' /> },
// ]

const Nav = () => {
    const pathname: string = usePathname();
    const { data: session } = useSession();

    return (
        <nav className="flex items-center gap-8" aria-label='Desktop navigation'>
            {/* Links */}
            {links.map((link, index) => (
                <Link
                    href={link.path}
                    key={index}
                    className={`${link.path === pathname && "border-b border-primary-800 text-primary hover:text-primary"
                        } text-sm font-bold uppercase duration-300 ease-in-out hover:text-primary-800 `}
                >
                    <div className='inline-flex items-center gap-2'>
                        {link.icon}
                        {link.name}
                    </div>
                </Link>
            ))}
            {session?.user ? (
                <>
                    {session?.user?.image && (
                        <Image
                            src={session.user.image}
                            alt="user avatar"
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                    )}
                    {session.user.name && (
                        <span>{session.user.name}</span>
                    )}
                    <button onClick={() => signOut()}>
                        Déconnexion
                    </button>
                </>
            ) : (
                <Link href="/login">
                    <button>Connexion</button >
                </Link >
            )
            }
        </nav >
    );
};

export default Nav;