import React, { useState } from 'react'
import './App.css';

function App() {
  const [msg, setMsg] = useState('')
  const handleClick = async () => {
    const data = await window.fetch('/api/edt');
    const json = await data.json();
    console.log(json);
    const msg = json.msg;
    setMsg(msg);
  }
  
  return (
    <div className="App">
      {/* You can keep your header or any other layout */}
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
