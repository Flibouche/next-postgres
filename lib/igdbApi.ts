import { getAccessToken } from "./authTwitch";

/**
 * Fetches a list of games from the IGDB API based on the provided name.
 *
 * @param name - The name of the game to search for. If not provided, all games will be fetched.
 * @returns A promise that resolves to the list of games matching the search criteria.
 * @throws {@link Error} Throws an error if the API request fails or if there is an issue fetching the access token.
 */
export async function getGames(name: string) {
    try {
        const accessToken = await getAccessToken();

        const queryString = `
        fields id, name, first_release_date, cover.image_id;
        where category = 0 & version_parent = null
        ${name ? `& (name ~ *"${name}"* | alternative_names.name ~ *"${name}"*)` : ""};
        limit 5;
        `;

        const response = await fetch("https://api.igdb.com/v4/games", {
            method: "POST",
            headers: {
                "Client-ID": process.env.TWITCH_CLIENT_ID ?? '',
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: queryString,
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Error fetching games: ${error instanceof Error ? error.message : error}`);
    }
}