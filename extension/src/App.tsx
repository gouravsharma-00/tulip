import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
import Icon from '/icon.png'
import './App.css'

function App() {
  const [api, setApi] = useState<string>('');
  const [message, setMessage] = useState<string>('Enter Your gemini API key');
  const [flag, setFlag] = useState(false);
  const handleSubmit = () => {
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={Icon} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Tulip</h1>
      <div className="card">
        <input type='text' placeholder='Enter gemini API key' value={api} onChange={(e) => {setApi(e.target.value)}} />
        <button onClick={handleSubmit}>
          Submit
        </button>
        <p>
          {message}
        </p>
      </div>
      <p className="read-the-docs">
          Made with ❤️ by Gourav
      </p>
    </>
  )
}

export default App
