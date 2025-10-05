import {GoogleGenAI} from '@google/genai';
import {PROMPT} from './prompt'

async function fetchImageAsBase64(URL) {

    const response = await fetch(URL)
    if(!response.ok) {
        throw new Error("Image not found at URL")
    }

    const arrayBuffer = await response.arrayBuffer()

    const buffer = Buffer.from(arrayBuffer)

    const base64String = buffer.toString('base64')

    const contentType = response.headers.get('content-type') || 'application/octet-stream';

    return {
        inlineData: {
            data: base64String,
            mimeType: contentType
        }
    };
}

async function fetchGeminiAnswer(ques, key) {
    const result = []
    for(let i = 0; i < ques.length; i++) {

        const image = await fetchImageAsBase64(ques[i])
    
        const GEMINI_API_KEY = key;
        const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
    
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                        inlineData: {
                            data: `${image.inlineData.data}`,
                            mimeType: `${image.inlineData.mimeType}`,
                        },
                        },
                        {
                        text: PROMPT,
                        },
                    ],
                },
            ],
        });
        console.log('[main] response', response.text)
        result.push(response.text)

    }

    return  result
}

export default fetchGeminiAnswer