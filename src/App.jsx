import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router"
import Menu from "./Componentes/Shared/Menu/Menu"
import { Home } from './Componentes/Views/Home/Home'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
       <Menu />
       <Routes>
         <Route path="/" element={<Home/>} />
       </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
