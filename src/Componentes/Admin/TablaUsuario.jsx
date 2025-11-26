// src/Componentes/Admin/TablaUsuarios.jsx
import React, { useState, useEffect } from "react";
import { UserStorage } from "../../Utils/UserStorage";

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const lista = await UserStorage.TodosLosUsuarios();

        if (busqueda.trim() !== "") {
          const filtrados = lista.filter((u) =>
            u.nombreDeUsuario.toLowerCase().includes(busqueda.toLowerCase()) ||
            u.email.toLowerCase().includes(busqueda.toLowerCase())
          );

          setUsuarios(filtrados);
        } else {
          setUsuarios(lista);
        }
      } catch (error) {
        console.error("Error cargando usuarios", error);
      } finally {
        setCargando(false);
      }
    };

    cargarUsuarios();
  }, [busqueda]);

  if (cargando) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="tabla-contenedor">
      <input
        type="search"
        placeholder="Buscar usuarios..."
        className="tabla-busqueda"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <table className="tabla-usuarios">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>País</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.length === 0 ? (
            <tr>
              <td colSpan="6" className="tabla-vacio">
                No se encontraron usuarios
              </td>
            </tr>
          ) : (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombreDeUsuario}</td>
                <td>{usuario.email}</td>
                <td>{usuario.pais || "Sin especificar"}</td>
                <td>{usuario.role || "usuario"}</td>
                <td className="acciones">
                  <button className="btn-editar">Editar</button>
                  <button className="btn-suspender">Suspender</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaUsuarios;
