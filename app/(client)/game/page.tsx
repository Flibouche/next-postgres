"use client";

import { useState, useEffect } from "react";

export default function GamePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchTerm.trim() === "") return;

        const fetchGames = async () => {
            if (searchTerm.trim() === "") return;

            setLoading(true);
            try {
                const response = await fetch(`/api/igdb?q=${encodeURIComponent(searchTerm)}`);
                const results = await response.json();
                setGames(results);
            } catch (error) {
                console.error("Error fetching games:", error);
                setGames([]);
            } finally {
                setLoading(false);
            }
        };

        const debounce = setTimeout(fetchGames, 500);
        return () => clearTimeout(debounce);
    }, [searchTerm]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center -mt-16 text-white">
            <input
                type="text"
                placeholder="Search for a game..."
                className="p-2 text-black border rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {loading && <p className="my-2">Loading...</p>}
            {games.length > 0 ? (
                <>
                    <h2 className="text-3xl my-2">Games found: {games.length}</h2>
                    <ul>
                        {games.map((game) => (
                            <li key={game.id}>{game.name}</li>
                        ))}
                    </ul>
                </>
            ) : (
                !loading && <h2 className="text-3xl my-2">No games found</h2>
            )}
        </div>
    );
}