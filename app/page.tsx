// import prisma from '@/lib/prisma'

import Logout from "@/components/Logout";
import { auth } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
    // const users = await prisma.user.findMany();
    const session = await auth();
    return (
        <div className="min-h-screen bg-gray-500 flex flex-col items-center justify-center -mt-16 text-black">
            <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)]">
                Superblog
            </h1>
            {session?.user?.name && session?.user?.image ? (
                <>
                    <h1 className="text-3xl my-2">
                        Welcome, {session?.user?.name}
                    </h1>
                    <Image
                        src={session?.user?.image}
                        alt={session?.user?.name}
                        width={72}
                        height={72}
                        className="rounded-full"
                    />
                    <Logout />
                </>
            ) : (
                <h1 className="text-3xl my-2">
                    Welcome, {session?.user?.email}
                </h1>
            )}
            {/* <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
                {users.map((user) => (
                    <li key={user.id} className="mb-2">
                        {user.name}
                    </li>
                ))}
            </ol> */}
        </div>
    );
}
