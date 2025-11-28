import { useState } from "react";
import { useUser } from "../Context/ContextoUsuario";
import MapaUsuarios from "./MapaUsuarios";
import "./css/AdminPanel.css";

const AdminPanel = () => {
  const {
    usuarios,
    usuariosSuspendidos,
    productos,
    esAdministrador,
    suspenderUsuario,
    reactivarUsuario,
    eliminarUsuarioSuspendido,
    editarUsuario,
    agregarProducto,
    sincronizarConAPI,
  } = useUser();

  const [vistaActiva, setVistaActiva] = useState("usuarios");
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mostrarFormProducto, setMostrarFormProducto] = useState(false);

  const manejarSincronizacion = async () => {
    const resultado = await sincronizarConAPI();
    alert(resultado.mensaje);
  };

  if (!esAdministrador) {
    return (
      <div className="panel-administracion">
        <div className="acceso-denegado">
          <h2>Acceso Denegado</h2>
          <p>No tienes permisos para acceder al panel de administración.</p>
        </div>
      </div>
    );
  }

  // === FORMULARIOS ===

  const FormularioProducto = () => {
    const [datosFormulario, setDatosFormulario] = useState({
      nombre: "",
      precio: "",
      descripcion: "",
      categoria: "",
    });

    const manejarEnvio = (e) => {
      e.preventDefault();
      agregarProducto(datosFormulario);
      setMostrarFormProducto(false);
    };

    return (
      <div className="superposicion-formulario">
        <div className="contenedor-formulario">
          <h3>Agregar Producto</h3>
          <form onSubmit={manejarEnvio}>
            <input
              type="text"
              placeholder="Nombre"
              value={datosFormulario.nombre}
              onChange={(e) =>
                setDatosFormulario({
                  ...datosFormulario,
                  nombre: e.target.value,
                })
              }
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={datosFormulario.precio}
              onChange={(e) =>
                setDatosFormulario({
                  ...datosFormulario,
                  precio: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              placeholder="Categoría"
              value={datosFormulario.categoria}
              onChange={(e) =>
                setDatosFormulario({
                  ...datosFormulario,
                  categoria: e.target.value,
                })
              }
              required
            />
            <textarea
              placeholder="Descripción"
              value={datosFormulario.descripcion}
              onChange={(e) =>
                setDatosFormulario({
                  ...datosFormulario,
                  descripcion: e.target.value,
                })
              }
              required
            />
            <div className="botones-formulario">
              <button type="submit">Agregar</button>
              <button
                type="button"
                onClick={() => setMostrarFormProducto(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ModalEditarUsuario = () => {
    const [datosFormulario, setDatosFormulario] = useState({
      nombreDeUsuario: usuarioEditando.nombreDeUsuario,
      email: usuarioEditando.email,
      pais: usuarioEditando.pais,
      fechaNacimiento: usuarioEditando.fechaNacimiento,
    });

    const manejarEnvio = (e) => {
      e.preventDefault();
      editarUsuario(usuarioEditando.id, datosFormulario);
      setUsuarioEditando(null);
    };

    return (
      <div className="superposicion-formulario">
        <div className="contenedor-formulario">
          <h3>Editar Usuario</h3>
          <form onSubmit={manejarEnvio}>
            <input
              type="text"
              value={datosFormulario.nombreDeUsuario}
              onChange={(e) =>
                setDatosFormulario({
                  ...datosFormulario,
                  nombreDeUsuario: e.target.value,
                })
              }
              required
            />
            <input
              type="email"
              value={datosFormulario.email}
              onChange={(e) =>
                setDatosFormulario({
                  ...datosFormulario,
                  email: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              value={datosFormulario.pais}
              onChange={(e) =>
                setDatosFormulario({ ...datosFormulario, pais: e.target.value })
              }
              required
            />
            <input
              type="date"
              value={datosFormulario.fechaNacimiento}
              onChange={(e) =>
                setDatosFormulario({
                  ...datosFormulario,
                  fechaNacimiento: e.target.value,
                })
              }
              required
            />
            <div className="botones-formulario">
              <button type="submit">Guardar</button>
              <button type="button" onClick={() => setUsuarioEditando(null)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="panel-administracion">
      <header className="encabezado-administracion">
        <h1>Panel de Administración</h1>
        <nav>
          <button
            className={vistaActiva === "usuarios" ? "btn-activo" : ""}
            onClick={() => setVistaActiva("usuarios")}
          >
            Usuarios ({usuarios.length})
          </button>

          <button
            className={vistaActiva === "suspendidos" ? "btn-activo" : ""}
            onClick={() => setVistaActiva("suspendidos")}
          >
            Suspendidos ({usuariosSuspendidos.length})
          </button>

          <button
            className={vistaActiva === "productos" ? "btn-activo" : ""}
            onClick={() => setVistaActiva("productos")}
          >
            Productos ({productos.length})
          </button>

          <button
            className={vistaActiva === "mapa" ? "btn-activo" : ""}
            onClick={() => setVistaActiva("mapa")}
          >
            🌍 Mapa de usuarios
          </button>
        </nav>

        <button className="boton-sincronizar" onClick={manejarSincronizacion}>
          🔄 Sincronizar
        </button>
      </header>

      {vistaActiva === "usuarios" && (
        <div className="contenedor-tabla">
          <table className="tabla-administracion">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>País</th>
                <th>Fecha Nac</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  <td>{u.nombreDeUsuario}</td>
                  <td>{u.email}</td>
                  <td>{u.pais}</td>
                  <td>{new Date(u.fechaNacimiento).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => setUsuarioEditando(u)}>
                      Editar
                    </button>
                    <button onClick={() => suspenderUsuario(u.id)}>
                      Suspender
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {vistaActiva === "suspendidos" && (
        <div className="contenedor-tabla">
          <table className="tabla-administracion">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Email</th>
                <th>Fecha Suspensión</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosSuspendidos.map((u) => (
                <tr key={u.id}>
                  <td>{u.nombreDeUsuario}</td>
                  <td>{u.email}</td>
                  <td>{new Date(u.fechaSuspension).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => reactivarUsuario(u.id)}>
                      Reactivar
                    </button>
                    <button onClick={() => eliminarUsuarioSuspendido(u.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {vistaActiva === "productos" && (
        <div>
          <button onClick={() => setMostrarFormProducto(true)}>
            + Agregar Producto
          </button>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>${p.precio}</td>
                  <td>{p.categoria}</td>
                  <td>{new Date(p.fechaCreacion).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {usuarioEditando && <ModalEditarUsuario />}
      {mostrarFormProducto && <FormularioProducto />}
      {vistaActiva === "mapa" && <MapaUsuarios />}
    </div>
  );
};

export default AdminPanel;
