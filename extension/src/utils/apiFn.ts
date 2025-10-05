export default async function apiFn(
    {ques, key} : {ques: string[], key: string}
) {
    const response = await fetch("http://localhost:3000/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ques, key})
    })

    const result = await response.json()

    return result

}