export async function sendDiscordMessage(body: object){
    const url = 'https://discord.com/api/webhooks/1146768473163317299/jvMUj5bsKLtchtJ5jMPufORl7adUJO1Yncn4tcDJsTeiSqs_Dwdu8ZnbGkQe5QhNDhDj'
    await fetch(url, {
        body: JSON.stringify(body),
        method: 'POST',
        headers: { "Content-Type": "application/json" }
    });
}