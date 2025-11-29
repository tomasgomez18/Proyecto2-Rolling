import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Menu from "./Componentes/Shared/Menu/Menu"
import { Home } from './Componentes/Views/Home/Home'
import './App.css'
import Productos from './Componentes/Views/Productos/Productos'
import Compras from './Componentes/Views/Productos/ComponenteCompra/Compras'

function App() {

  return (
    <>
    <BrowserRouter>
       <Menu />
       <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/compras" element={<Compras/> }/>
        <Route path="/protecciones" element={<Protecciones/>} />
       <Route path="/indumentaria" element={<Indumentaria/>} />
      <Route path="/taller" element={<TallerPage />} />
       </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
