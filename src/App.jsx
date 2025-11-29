import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Componentes/Shared/Menu/Menu";
import { Home } from "./Componentes/Views/Home/Home";
import "./App.css";
import Productos from "./Componentes/Views/Productos/Productos";
import DetalleProducto from "./Componentes/Views/Productos/ComponenteProducto/PaginaProductos/Detalle-Producto/DetalleProducto"; 

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/detalle-producto" element={<DetalleProducto />} /> {/* Nueva ruta */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;