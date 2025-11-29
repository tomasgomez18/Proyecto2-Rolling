import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Componentes/Shared/Menu/Menu.jsx";
import { Home } from "./Componentes/Views/Home/Home.jsx";
import "./App.css";
import Productos from "./Componentes/Views/Productos/Productos.jsx";
import Compras from "./Componentes/Views/Productos/ComponenteCompra/Compras.jsx";
import Protecciones from "./Componentes/Views/pages/pages-menu-principal/Protecciones.jsx";
import Indumentaria from "./Componentes/Views/pages/pages-menu-principal/PaginaCategoria.jsx";
import Taller from "./Componentes/Views/pages/pages-menu-principal/Taller.jsx";
import Motocicletas from "./Componentes/Views/pages/pages-menu-principal/Motocicletas.jsx";
import PaginaCategoria from "./Componentes/Views/pages/pages-menu-principal/PaginaCategoria.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/compras" element={<PaginaCategoria />} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
