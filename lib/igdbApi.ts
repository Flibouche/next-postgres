import { getAccessToken } from "./authTwitch";

const endpoint = "https://api.igdb.com/v4/games";

export async function getGames(name: string) {
    try {
        const accessToken = await getAccessToken();
        const twitchClientId = process.env.TWITCH_CLIENT_ID ?? "";

        if (!twitchClientId) {
            throw new Error("Twitch client ID is missing");
        }

        if (!accessToken) {
            throw new Error("Access token is missing");
        }

        const queryString = `
        fields id, name, first_release_date, cover.image_id;
        where category = 0 & version_parent = null
        ${name ? `& (name ~ *"${name}"* | alternative_names.name ~ *"${name}"*)` : ""};
        limit 5;
        `;

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Client-ID": twitchClientId,
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: queryString,
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw new Error(`Error fetching games: ${error instanceof Error ? error.message : error}`);
    }
}