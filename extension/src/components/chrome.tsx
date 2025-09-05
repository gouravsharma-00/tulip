import { GoogleGenAI } from '@google/genai';

export default function Chrome({setMessage, reset, api} : 
    {setMessage : (message: string) => void, reset: () => void, api: string}) {

    async function main() {
        const [tab] = await chrome.tabs.query({active: true});

        chrome.runtime.onMessage.addListener(async (req) => {
            if(req.type === 'status') {
                setMessage(req.message)
            }
        })

        chrome.scripting.executeScript({
            target: {tabId: tab.id!}, 
            args: [], // inject argument API
            func: async () => {
                console.log('[Extension]')
                const sendStatus = (message: string) => {
                    chrome.runtime.sendMessage({type: "status", message})
                }
                try {
                    /**
                     * div.qt-question < img or img.yui-img
                     */
                    const ques: string[] = []
                    document.querySelectorAll('div.qt-question').forEach((question) => {
                        ques.push(question.querySelector('img')!.currentSrc)
                    })
                    sendStatus('Image URL Extraction completed ✅');

                    console.log(ques)
                    
                    /**
                     * failure : CORS (Cross-Origin Resource Sharing)
                     * Reason: fetching images from browser [browser have strict cors policy]
                     * solution: 
                     * 1. Node.js [backend/node has no cors policy]
                     * 2. use gemini directly to extract and fetch image
                     */
                    /*
                    const images: any[] = [];
                    for(const que of ques) {
                        let response = await fetch(que);
                        let count = 0;
                        while(!response.ok) {
                            response = await fetch(que);
                            if(count > 5) {
                                setMessage(`Image not found at: ${que}`)
                                break;
                            }
                            count++;
                        }
                        const img = Buffer.from(await response.arrayBuffer())
                        images.push(img)
                    }
                        */
                    
                    // test after injecting api key
                    const ai = new GoogleGenAI({apiKey: api});
                    const response = await ai.models.generateContent({
                        model: "gemini-2.5-flash",
                        contents: [{
                            //@ts-ignore
                            role: "user",
                            parts: [
                                {text: 'Answer the following question in the images and return the correct option(s)'},
                                {image_url: ques[0]}
                            ]
                        }],
                        config: {
                            thinkingConfig: {
                                thinkingBudget: 0, // Disables thinking
                            },
                        } 
                    })
                    console.log(response.text)
                    console.log(response)

                }catch(err) {
                    sendStatus(err instanceof Error ? `Error in Extracting URL's: ${err.message}` : `Unknown Error in Extracting URL's`)
                }
            }
        })
    }
    return(
        <div className="card" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.75rem',
        }}>
            <button onClick={main}>Start</button>
            <button onClick={reset}>Reset</button>
        </div>
    )

}
