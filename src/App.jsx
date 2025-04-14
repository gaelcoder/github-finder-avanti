import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EncontrarPerfil from './components/EncontrarPerfil'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <EncontrarPerfil/>
    </>
  )
}

export default App
