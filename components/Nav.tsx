import { auth } from '@/lib/auth';
import Link from 'next/link';
import Logout from './auth/Logout';

export default async function Nav() {
    const session = await auth();

    return (
        <nav className="flex items-center gap-8" aria-label='Desktop navigation'>
            <div className='flex items-center gap-8'>
                {/* Home */}
                <Link href='/'>
                    Home
                </Link>
                <Link href='/user'>
                    List of users
                </Link>

                {/* Session */}
                {session ? (
                    <div className='flex items-center gap-8'>
                        <Link href='/dashboard'>
                            {session?.user?.name}
                        </Link>
                        <Logout />
                    </div>
                ) : (
                    <div className='flex items-center gap-8'>
                        <Link href='/login'>
                            Login
                        </Link>
                        <Link href='/register'>
                            Register
                        </Link>
                    </div>
                )}

            </div>
        </nav >
    );
};