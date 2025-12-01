import React from "react";
import CardProducto from "./ComponenteProducto/PaginaProductos/card-Producto/CardProducto.jsx";
import BuscadorProducto from "./ComponenteProducto/PaginaProductos/componenteBuscarProducto/BuscadorProducto.jsx";
const Productos = () => {
  return (
    <div>
      <BuscadorProducto/>
      <CardProducto/>
    </div>
  );
};

export default Productos;
