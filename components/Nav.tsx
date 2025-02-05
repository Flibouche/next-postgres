"use client";

// Next
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthProvider';

// Icons
import { IoHome } from 'react-icons/io5';
import { PiArticleNyTimesFill } from "react-icons/pi";
import SignoutForm from '@/ui/signout-form';


const links = [
    { name: 'Home', path: '/', icon: <IoHome className='size-4' /> },
];

const authLinks = [
    { name: 'Login', path: '/login', icon: <PiArticleNyTimesFill className='size-4' /> },
    { name: 'Register', path: '/register', icon: <PiArticleNyTimesFill className='size-4' /> },
]

const Nav = () => {
    const pathname: string = usePathname();
    const { isAuth, user } = useAuth();

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

            {isAuth ? (
                <div className='flex items-center gap-2'>
                    <p>Hello {user?.name}</p>
                    <Link href='/dashboard'>
                        Dashboard
                    </Link>
                    <SignoutForm />
                </div>
            ) : (
                authLinks.map((link, index) => (
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
                )))
            }
        </nav >
    );
};

export default Nav;