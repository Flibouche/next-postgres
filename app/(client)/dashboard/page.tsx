import IsUser from "@/components/isUser";
import { auth } from "@/lib/auth";
import Image from "next/image"
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();
    console.log(session);

    if (!session?.user) redirect("/");

    return (
        <div className="flex flex-col items-center m-4">
            {session?.user?.name ? (
                <>
                    <h1 className="text-3xl my-2">
                        Welcome, {session?.user?.name}, your role is : {session?.user?.role}
                    </h1>
                    {session?.user?.image && (
                        <Image
                            src={session?.user?.image}
                            alt={session?.user?.name}
                            width={72}
                            height={72}
                            className="rounded-full"
                        />
                    )}
                    <div>
                        {/* {session?.user?.role === "ADMIN" && (
                            <p>Hello my beautiful admin !</p>
                        )}
                        {session?.user?.role === "USER" && (
                            <p>Hello my beautiful user !</p>
                        )} */}
                        <IsUser user={session?.user}>
                            <p>Hello my beautiful user !</p>
                        </IsUser>
                    </div>
                </>
            ) : (
                <h1 className="text-3xl my-2">
                    Welcome, {session?.user?.email}
                </h1>
            )}
        </div>
    );
};