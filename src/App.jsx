import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
      <div className="title-box">

        <div className="logo">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </div>

        <h1 className="titleText">EatThis</h1>

      </div>

      <div className="stepFormBackground"> 
        <text className="heading">StepForm</text>

        <div className="stepForm">

        </div>

        <button className="button" onClick={Click}>Buttonnnn</button>
      </div>
    </div>

   </>
  )
}

export default App
