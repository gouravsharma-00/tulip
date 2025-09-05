import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
import Icon from '/icon.png'
import './App.css'

function App() {
  const [api, setApi] = useState<string>('');
  const [message, setMessage] = useState<string>('Enter Your gemini API key');
  const [flag, setFlag] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if(api === '') {
      return
    }
    try {
      chrome.storage.local.set({api})
      setMessage(`API key stored 👍: ${api}`)
      setFlag(true)

    }catch(err) {
      setMessage('Error Occured!!')
    }
  }
  const handleReset = () => {
    chrome.storage.local.remove("api", () => {
      setMessage("API removed")
    })
    setFlag(false)
  }
  useEffect(() => {
    chrome.storage.local.get(["api"], (result) => {
      if (result.api) {
        setApi(result.api);
        setMessage(`API Key found: ${result.api}`);
        setFlag(true)
      } else {
        setMessage("No API Key stored yet");
        setFlag(false)
      }
    });
  }, []);
  return (
    <>
    {
      flag ? 
      <p>Hello <button onClick={handleReset}>Reset</button></p> : 
      <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={Icon} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Tulip</h1>
      <div className="card">
        <form onSubmit={handleSubmit} id='form'>
          <input type='text' placeholder='Enter gemini API key' value={api} onChange={(e) => {setApi(e.target.value)}} 
          id='input'/>
          <button type='submit'>
            Submit
          </button>
        </form>
        
        <p>
          {message}
        </p>
      </div>
      <p className="read-the-docs">
          Made with ❤️ by Gourav
      </p>
      </>
    }
      
    </>
  )
}

export default App
