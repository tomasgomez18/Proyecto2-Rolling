// src/Componentes/Admin/BarraBusqueda.jsx
import React from "react";

const BarraBusqueda = ({ value, onChange, placeholder = "Buscar usuarios..." }) => {
  return (
    <div className="busqueda-contenedor">
      <input
        type="search"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="busqueda-input"
      />
    </div>
  );
};

export default BarraBusqueda;
