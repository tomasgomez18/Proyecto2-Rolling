import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router"
import Menu from "./Componentes/Shared/Menu/Menu"
import { Home } from './Componentes/Views/Home/Home'
import './App.css'
import Footer from "./Componentes/Views/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";



function App() {

  return (
    <>
    <BrowserRouter>
       <Menu />
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/footer" element={<Footer/>} />
       </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
