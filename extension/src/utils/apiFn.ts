export default async function apiFn(
    {ques, key} : {ques: string[], key: string}
) {
    const response = await fetch("https://tulip.theicedev.tech/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ques, key})
    })

    const result = await response.json()

    return result

}