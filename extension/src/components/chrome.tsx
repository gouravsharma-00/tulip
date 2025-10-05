
export default function Chrome({setMessage, reset, api, callAPI} : 
    {setMessage : (message: string) => void, reset: () => void, api: string, callAPI: (ques: string[], key: string) => Promise<{}>}) {

        chrome.runtime.onMessage.addListener((req, _, sendResponse) => {
            if(req.type === 'status') {
                setMessage(req.message)
            }
            else {
                callAPI(req.ques, req.api).then((result : any) => {
                    sendResponse(result)
                }).catch((err: any) => {
                    sendResponse({error: err})
                })

                return true;
            }
        })

    async function main() {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

        chrome.scripting.executeScript({
            target: {tabId: tab.id!}, 
            args: [api],
            func: async (api) => {

                console.log('[Extension]')
                
                const sendStatus = (message: string) => {
                    chrome.runtime.sendMessage({type: "status", message})
                }
                const sendAPI = (ques: string[], api: string) => {

                    chrome.runtime.sendMessage({type: "api", ques, api}, (response) => {
                        console.log(response)

                        if(response.success) {

                            document.querySelectorAll('div.qt-choices').forEach((ele, index) => {
                            const target = response.result[index];

                            const choices = ele.querySelectorAll('div.gcb-mcq-choice')

                            for(let i of target) {
                                if(choices[i - 1]) {
                                    choices[i - 1].querySelector('input')?.click()
                                    }
                                }
                            })
                        }else {
                            sendStatus("Error in response")
                        }
                    })
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
                     * 3. Use Tesseract.js to extract text then send to gemini api to get answers
                     */

                    sendAPI(ques, api);

                    // onComplete [✅]
                    sendStatus("Quiz is Completed 😘")

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
