 import { useState } from 'react'
import reactLogo from './assets/react.svg'
import burgerLogo from './assets/burger_orange.jpg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  function Click() {
    setCount((count) => count + 1)
    alert(`Clicked ${count + 1} times`)
  }

  return (
   <>
    <div className="main">
      <div className="logo-box">

        <div className="title-box">
          <img src={burgerLogo} className="logo" alt="Vite logo" />
        </div>

        <h1 className="titleText">EatThis</h1>

      </div>

      <div className="stepFormBackground"> 
        <button className="button" onClick={Click}>Get Started</button>
      </div>
    </div>

   </>
  )
}

export default App
