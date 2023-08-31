export async function sendDiscordMessage(body: object){
    const url = `${process.env.DISCORD_WEBHOOK_URL}`
    await fetch(url, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: { "Content-Type": "application/json" }
    });
}