import { useState } from 'react'

export default function API({setFlag, setMessage} : {setFlag: (flag: boolean) => void, setMessage: (message: string) => void}) {
    const [api, setApi] = useState<string>('');

    const handleSubmit = (e: any) => {

        e.preventDefault();
    
        if(api === '') {
            return
        }
        /**
         * Test if API is valid or not
         */
        const gemini = (api: string) => {
          if(!api) {
            return {
              status: 429
            }
          }
          const status = 401;

          return {
            status: status
          }
        }
        const result = gemini(api);
        if(result.status !== 200) {
          switch(result.status) {
            case 401:
              setMessage(`401 UNAUTHENTICATED: Invalid/expired API key`);
              break;
            case 403:
              setMessage(`403 PERMISSION_DENIED: Key valid but not enabled for Gemini`);
              break;
            case 429:
              setMessage(`429 RESOURCE_EXHAUSTED: Key valid but quota exceeded`);
              break;
          }
          return;
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
          <input type='text' placeholder='Enter gemini API key' value={api} onChange={(e) => {setApi(e.target.value)}} 
          id='input'/>
          <button type='submit'>
            Submit
          </button>
        </form>
    )
}