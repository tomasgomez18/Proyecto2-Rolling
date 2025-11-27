import { useState } from "react";
import { useUser } from "../Context/ContextoUsuario";
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
    if (sincronizarConAPI) {
      const resultado = await sincronizarConAPI();
      if (resultado.exito) {
        alert('Sincronización completada con éxito');
      } else {
        alert('Error en sincronización: ' + resultado.mensaje);
      }
    } else {
      alert('Función de sincronización no disponible');
    }
  };

  // Si no es administrador, no mostrar el panel
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

  // Formulario de producto
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
      setDatosFormulario({ nombre: "", precio: "", descripcion: "", categoria: "" });
      setMostrarFormProducto(false);
    };

    return (
      <div className="superposicion-formulario">
        <div className="contenedor-formulario">
          <h3>Agregar Producto</h3>
          <form onSubmit={manejarEnvio}>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={datosFormulario.nombre}
              onChange={(e) =>
                setDatosFormulario({ ...datosFormulario, nombre: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={datosFormulario.precio}
              onChange={(e) =>
                setDatosFormulario({ ...datosFormulario, precio: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Categoría"
              value={datosFormulario.categoria}
              onChange={(e) =>
                setDatosFormulario({ ...datosFormulario, categoria: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Descripción"
              value={datosFormulario.descripcion}
              onChange={(e) =>
                setDatosFormulario({ ...datosFormulario, descripcion: e.target.value })
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

  // Modal de edición de usuario
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
              placeholder="Nombre de usuario"
              value={datosFormulario.nombreDeUsuario}
              onChange={(e) =>
                setDatosFormulario({ ...datosFormulario, nombreDeUsuario: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={datosFormulario.email}
              onChange={(e) =>
                setDatosFormulario({ ...datosFormulario, email: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="País"
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
                setDatosFormulario({ ...datosFormulario, fechaNacimiento: e.target.value })
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
        <div className="controles-encabezado">
          <nav className="navegacion-administracion">
            <button
              className={vistaActiva === "usuarios" ? "activo" : ""}
              onClick={() => setVistaActiva("usuarios")}
            >
              Usuarios Activos ({usuarios.length})
            </button>
            <button
              className={vistaActiva === "suspendidos" ? "activo" : ""}
              onClick={() => setVistaActiva("suspendidos")}
            >
              Usuarios Suspendidos ({usuariosSuspendidos.length})
            </button>
            <button
              className={vistaActiva === "productos" ? "activo" : ""}
              onClick={() => setVistaActiva("productos")}
            >
              Productos ({productos.length})
            </button>
          </nav>
          {/* Botón de sincronización */}
          <button
            className="boton-sincronizar"
            onClick={manejarSincronizacion}
            title="Sincronizar cambios con la API"
          >
            🔄 Sincronizar
          </button>
        </div>
      </header>

      <main className="contenido-administracion">
        {vistaActiva === "usuarios" && (
          <div className="contenedor-tabla">
            <h2>Usuarios Activos</h2>
            <table className="tabla-administracion">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>País</th>
                  <th>Fecha Nac.</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombreDeUsuario}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.pais}</td>
                    <td>
                      {new Date(usuario.fechaNacimiento).toLocaleDateString()}
                    </td>
                    <td className="acciones">
                      <button
                        className="boton-editar"
                        onClick={() => setUsuarioEditando(usuario)}
                      >
                        Editar
                      </button>
                      <button
                        className="boton-suspender"
                        onClick={() => suspenderUsuario(usuario.id)}
                      >
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
            <h2>Usuarios Suspendidos</h2>
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
                {usuariosSuspendidos.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombreDeUsuario}</td>
                    <td>{usuario.email}</td>
                    <td>
                      {new Date(usuario.fechaSuspension).toLocaleDateString()}
                    </td>
                    <td className="acciones">
                      <button
                        className="boton-reactivar"
                        onClick={() => reactivarUsuario(usuario.id)}
                      >
                        Reactivar
                      </button>
                      <button
                        className="boton-eliminar"
                        onClick={() => eliminarUsuarioSuspendido(usuario.id)}
                      >
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
          <div className="contenedor-tabla">
            <div className="encabezado-productos">
              <h2>Productos ({productos.length})</h2>
              <button
                className="boton-agregar"
                onClick={() => setMostrarFormProducto(true)}
              >
                + Agregar Producto
              </button>
            </div>
            <table className="tabla-administracion">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Fecha Creación</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.categoria}</td>
                    <td>
                      {new Date(producto.fechaCreacion).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
                {productos.length === 0 && (
                  <tr>
                    <td colSpan="4" className="sin-datos">
                      No hay productos registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {usuarioEditando && <ModalEditarUsuario />}
      {mostrarFormProducto && <FormularioProducto />}
    </div>
  );
};

export default AdminPanel;