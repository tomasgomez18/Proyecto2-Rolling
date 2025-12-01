import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router"
import Menu from "./Componentes/Shared/Menu/Menu"
import { Home } from './Componentes/Views/Home/Home'
import './App.css'
import Ofertas from "./Componentes/Views/Productos/Ofertas/Ofertas";
import Footer from "./Componentes/Shared/Footer/Footer";



function App() {

  return (
    <>
    <BrowserRouter>
       <Menu />
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/ofertas" element={<Ofertas />} />
       </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
