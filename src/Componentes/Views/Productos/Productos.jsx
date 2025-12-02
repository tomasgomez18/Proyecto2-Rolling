import React from "react";
import CardProducto from "./ComponenteProducto/PaginaProductos/card-Producto/CardProducto.jsx";
import BuscadorProducto from "./ComponenteProducto/PaginaProductos/componenteBuscarProducto/BuscadorProducto.jsx";
import Categorias from "./ComponenteProducto/Categorias/Categorias.jsx";
const Productos = () => {
  return (
    <div className="mt-5 py-5">
      <Categorias/>
    </div>
  );
};

export default Productos;