import { auth } from "@/lib/auth";

export default async function Home() {
    const session = await auth();
    return (
        <div className="min-h-screen bg-gray-500 flex flex-col items-center justify-center -mt-16 text-black">
            <div className="flex flex-col justify-center items-center m-4">
                <h1 className="text-3xl my-3">Hey, this is the home page</h1>
            </div>
            {session ? (
                <h1 className="text-3xl my-2">
                    Welcome, {session?.user?.name}
                </h1>
            ) : (
                <h1 className="text-3xl my-2">
                    Welcome, {session?.user?.email}
                </h1>
            )}
        </div>
    );
}
