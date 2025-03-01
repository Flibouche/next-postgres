"use client";

import { useState } from "react";

export default function UserComponent() {
    const [user, setUser] = useState<{ id: string; email: string; name?: string } | null>(null);

    const fetchUser = async () => {
        const res = await fetch("/api/user?id=cm7c1phrd0001vnjc8rxzxvm1", { method: "GET"});
        const data = await res.json();
        if (res.ok) setUser(data.user);
    };

    return (
        <div>
            <button onClick={fetchUser}>Charger Utilisateur</button>
            {user && (
                <div>
                    <p>ID: {user.id}</p>
                    <p>Email: {user.email}</p>
                    <p>Nom: {user.name || "Non défini"}</p>
                </div>
            )}
        </div>
    );
}