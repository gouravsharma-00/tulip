
export default function Chrome({setMessage, reset} : {setMessage : (message: string) => void, reset: () => void}) {

    async function main() {
        const [tab] = await chrome.tabs.query({active: true});

        chrome.runtime.onMessage.addListener(async (req) => {
            if(req.type === 'status') {
                setMessage(req.message)
            }
        })

        chrome.scripting.executeScript({
            target: {tabId: tab.id!}, 
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
                    
                }catch(err) {
                    sendStatus(err instanceof Error ? `Error in Extracting URL's: ${err.message}` : `Unknown Error in Extracting URL's`)
                }
            }
        })
    }
    return(
        <div className="card">
            <button onClick={main}>Start</button>
            <button onClick={reset}>Reset</button>
        </div>
    )

}
