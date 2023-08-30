export async function sendDiscordMessage(body: object){
    console.log(`Calling Discord wtih, JSON.stringify(body)`);
    const url = ''
    const result = await fetch(url, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: { "Content-Type": "application/json" }
    });
    console.log(result.json());
}