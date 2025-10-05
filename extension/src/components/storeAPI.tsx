import { useState } from 'react'
import { GoogleGenAI } from '@google/genai';

export default function API({setFlag, setMessage, setApi, api} : 
  {setFlag: (flag: boolean) => void, setMessage: (message: string) => void, setApi: (api: string) => void, api: string}) {
    // const [api, setApi] = useState<string>('');
    const [loading , setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
      setLoading(true);
        e.preventDefault();
    
        if(api === '') {
            return
        }
        /**
         * Test if API is valid or not
         */
        try {
          const gemini = async (api: string) => {
            if(!api) {
                return {
                  status: 429
                }
            }
            const ai = new GoogleGenAI({apiKey: api});
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: "Hello gemini, just say hi",
                config: {
                  thinkingConfig: {
                    thinkingBudget: 0, // Disables thinking
                  },
                } 
            });
            console.log(response);
              

            return {
                status: 200
              }
          } 
          const result = await gemini(api);
          if(result.status !== 200) {
            setMessage(`Please Enter a valid API`);
            return
          }
        }catch(err) {
          if(err instanceof Error) {

            const status = JSON.parse(err.message).error.code
            switch(status) {
              case 401:
              case 400:
                // 401 UNAUTHENTICATED
                setMessage(`Invalid/expired API key`);
                break;
              case 403:
                // 403 PERMISSION_DENIED
                setMessage(`Key valid but not enabled for Gemini`);
                break;
              case 429:
                // 429 RESOURCE_EXHAUSTED 
                setMessage(`Key valid but quota exceeded`);
                break;
            }
            return
          }
        }finally {
          setLoading(false);
        }

        try {
            chrome.storage.local.set({api}, () => {
                setFlag(true);
                setMessage(`API Key stored ✅: ${api}`)
            })   
        }catch(err) {
          setMessage('[API] Error Occured!!')
        }
    }

    return(
        <form onSubmit={handleSubmit} id='form'>
          <input type='text' disabled={loading} placeholder='Enter gemini API key' value={api} onChange={(e) => {setApi(e.target.value)}} 
          id='input'/>
          <button type='submit'>
            Submit
          </button>
        </form>
    )
}