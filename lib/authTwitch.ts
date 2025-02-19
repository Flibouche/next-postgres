/**
 * Function to get the access token from Twitch API
 * 
 * @returns A promise that resolves to the access token.
 * 
 * @throws {@link Error} If there is an issue with fetching the access token.
 */
export async function getAccessToken(): Promise<string> {
    try {
        const response = await fetch("https://id.twitch.tv/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                grant_type: "client_credentials"
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const { access_token } = await response.json();
        return access_token;
    } catch (error) {
        throw new Error(`Error fetching access token: ${error}`);
    }
}