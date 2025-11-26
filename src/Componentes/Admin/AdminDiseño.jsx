// src/Componentes/Admin/AdminDiseño.jsx
import React from "react";
import "./Css/AdminEstilo.css";

const AdminDiseño = ({ children }) => {
  return (
    <div className="admin-contenedor">
      <aside className="admin-lateral">
        <h3 className="admin-titulo">Administración</h3>
      </aside>

      <div className="admin-principal">
        <header className="admin-encabezado">
          <h2 className="admin-encabezado-texto">Panel de administración</h2>
        </header>

        <section className="admin-contenido">
          {children}
        </section>
      </div>
    </div>
  );
};

export default AdminDiseño;
