import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Menu from "./Componentes/Shared/Menu/Menu";
import { Home } from "./Componentes/Views/Home/Home";
import "./App.css";
import Productos from "./Componentes/Views/Productos/Productos";
import BuscadorProducto from "./Componentes/Views/componenteBuscarProducto/BuscadorProducto.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buscador" element={<BuscadorProducto />} />
       
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
