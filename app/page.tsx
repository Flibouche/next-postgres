import prisma from '@/lib/prisma'
import SignupForm from '@/ui/signup-form';
import SignoutForm from '@/ui/signout-form';
import { getSession } from '@/lib/session';

export default async function Home() {
    const users = await prisma.user.findMany();
    const session = await getSession();
    return (
        <div className="min-h-screen bg-gray-500 flex flex-col items-center justify-center -mt-16 text-black">
            <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
                Superblog
            </h1>
            <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
                {users.map((user) => (
                    <li key={user.id} className="mb-2">
                        {user.name}
                    </li>
                ))}
            </ol>
            <div className='mt-8'>
                {session ? (
                    <SignoutForm />
                ) : (
                    <SignupForm />
                )}
            </div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    );
}
