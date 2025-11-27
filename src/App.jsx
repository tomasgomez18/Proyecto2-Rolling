import { useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router";
import Menu from "./Componentes/Shared/Menu/Menu";
import { Home } from './Componentes/Views/Home/Home';
import './App.css'
import Categorias from "./Componentes/Views/Categorias/Categorias";
import CategoriaItem from './Componentes/Views/Categorias/CategoriaItem';




function App() {
  return (
    <BrowserRouter>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categoriasItem" element={<CategoriaItem />} />
      </Routes>

    </BrowserRouter>
  );
}
