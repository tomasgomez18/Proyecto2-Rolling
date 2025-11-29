
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Componentes/Shared/Menu/Menu";
import { Home } from "./Componentes/Views/Home/Home";
import "./App.css";
import Productos from "./Componentes/Views/Productos/Productos";
import BuscadorProducto from "./Componentes/Views/Productos/ComponenteProducto/PaginaProductos/componenteBuscarProducto/BuscadorProducto";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
