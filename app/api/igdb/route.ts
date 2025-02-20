import { NextRequest, NextResponse } from "next/server";
import { getGames } from "@/lib/igdbApi";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("q");

    try {
        const games = await getGames(searchTerm ?? "");
        return NextResponse.json(games);
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
