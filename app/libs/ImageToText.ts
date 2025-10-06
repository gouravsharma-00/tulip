import {GoogleGenAI} from '@google/genai';
import {PROMPT} from './prompt'

export async function ImageToText(ques, key) {

    const res = await fetch("http://localhost:8080/app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({urls: ques}),
    })

    const result = await res.json();

    const answer = await fetchGeminiAnswer(result.results, key)

    return answer
}

async function fetchGeminiAnswer(ques, key) {

    const result = []
    for(let i = 0; i < ques.length; i++) {
    
        const GEMINI_API_KEY = key;
        const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: PROMPT + "\n" + ques[i]
            });

            console.log(`[main] response ${i + 1}`, response.text)
            result.push(response.text)

        }catch {
            result.push("[1]")
        }


    }

    const parsedNested = result.map(s => [parseInt(s.replace(/\[|\]/g, ""), 10)]);
    // console.log(parsedNested);
    // [[2], [3], [3], [4], [3], [4], [2], [3], [4], [2]]

    return  parsedNested
}
