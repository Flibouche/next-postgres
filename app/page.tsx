import { auth } from "@/lib/auth";

export default async function Home() {
    const session = await auth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center -mt-16 text-white">
            <div className="flex flex-col justify-center items-center m-4">
                <h1>Hey, this is the home page</h1>
            </div>
            {session ? (
                <h2 className="text-3xl my-2">
                    Welcome, {session?.user?.name}
                </h2>
            ) : (
                <div>
                    <h2 className="text-3xl my-2">
                        Welcome !
                    </h2>
                </div>
            )}
        </div>
    );
}
