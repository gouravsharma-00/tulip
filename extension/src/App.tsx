import { useEffect, useState } from 'react'
import Icon from '/icon.png'
import './App.css'
import API from './components/storeAPI';
import Footer from './components/footer';
import Chrome from './components/chrome';

function App() {
  // const [api, setApi] = useState<string>('');
  const [message, setMessage] = useState<string>('Enter Your gemini API key');
  const [flag, setFlag] = useState(false);

  const handleReset = () => {
    chrome.storage.local.remove("api", () => {
      setMessage("API removed") 
    })
    setFlag(false)
  }

  useEffect(() => {
    chrome.storage.local.get(["api"], (result) => {
      if (result.api) {
        // setApi(result.api);
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
          <a href="https://github.com/gouravsharma-00" target="_blank">
            <img src={Icon} className="logo" alt="Vite logo" />
          </a>
          <h1>Tulip</h1>
        </div>

    {
      flag ? 
        <Chrome setMessage={setMessage} reset={handleReset}/> : 
        <>
          <div className="card">
            <API setFlag={setFlag} setMessage={setMessage} />
          </div>
        </>
    }
    <Footer message={message} />
      
    </>
  )
}

export default App
