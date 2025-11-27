import { useState } from 'react';
import { useUser } from '../Context/UserContext';
import './css/AdminPanel.css';

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
    agregarProducto
  } = useUser();

  const [vistaActiva, setVistaActiva] = useState('usuarios');
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mostrarFormProducto, setMostrarFormProducto] = useState(false);

  // Si no es administrador, no mostrar el panel
  if (!esAdministrador) {
    return (
      <div className="admin-panel">
        <div className="acceso-denegado">
          <h2>Acceso Denegado</h2>
          <p>No tienes permisos para acceder al panel de administración.</p>
        </div>
      </div>
    );
  }

  // Formulario de producto
  const FormProducto = () => {
    const [formData, setFormData] = useState({
      nombre: '',
      precio: '',
      descripcion: '',
      categoria: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      agregarProducto(formData);
      setFormData({ nombre: '', precio: '', descripcion: '', categoria: '' });
      setMostrarFormProducto(false);
    };

    return (
      <div className="form-overlay">
        <div className="form-container">
          <h3>Agregar Producto</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre del producto"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Precio"
              value={formData.precio}
              onChange={(e) => setFormData({...formData, precio: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Categoría"
              value={formData.categoria}
              onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              required
            />
            <textarea
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              required
            />
            <div className="form-buttons">
              <button type="submit">Agregar</button>
              <button type="button" onClick={() => setMostrarFormProducto(false)}>
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
    const [formData, setFormData] = useState({
      nombreDeUsuario: usuarioEditando.nombreDeUsuario,
      email: usuarioEditando.email,
      pais: usuarioEditando.pais,
      fechaNacimiento: usuarioEditando.fechaNacimiento
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      editarUsuario(usuarioEditando.id, formData);
      setUsuarioEditando(null);
    };

    return (
      <div className="form-overlay">
        <div className="form-container">
          <h3>Editar Usuario</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={formData.nombreDeUsuario}
              onChange={(e) => setFormData({...formData, nombreDeUsuario: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="País"
              value={formData.pais}
              onChange={(e) => setFormData({...formData, pais: e.target.value})}
              required
            />
            <input
              type="date"
              value={formData.fechaNacimiento}
              onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})}
              required
            />
            <div className="form-buttons">
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
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        <nav className="admin-nav">
          <button 
            className={vistaActiva === 'usuarios' ? 'active' : ''}
            onClick={() => setVistaActiva('usuarios')}
          >
            Usuarios Activos ({usuarios.length})
          </button>
          <button 
            className={vistaActiva === 'suspendidos' ? 'active' : ''}
            onClick={() => setVistaActiva('suspendidos')}
          >
            Usuarios Suspendidos ({usuariosSuspendidos.length})
          </button>
          <button 
            className={vistaActiva === 'productos' ? 'active' : ''}
            onClick={() => setVistaActiva('productos')}
          >
            Productos ({productos.length})
          </button>
        </nav>
      </header>

      <main className="admin-content">
        {vistaActiva === 'usuarios' && (
          <div className="tabla-container">
            <h2>Usuarios Activos</h2>
            <table className="tabla-admin">
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
                {usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombreDeUsuario}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.pais}</td>
                    <td>{new Date(usuario.fechaNacimiento).toLocaleDateString()}</td>
                    <td className="acciones">
                      <button 
                        className="btn-editar"
                        onClick={() => setUsuarioEditando(usuario)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-suspender"
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

        {vistaActiva === 'suspendidos' && (
          <div className="tabla-container">
            <h2>Usuarios Suspendidos</h2>
            <table className="tabla-admin">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Fecha Suspensión</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosSuspendidos.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombreDeUsuario}</td>
                    <td>{usuario.email}</td>
                    <td>{new Date(usuario.fechaSuspension).toLocaleDateString()}</td>
                    <td className="acciones">
                      <button 
                        className="btn-reactivar"
                        onClick={() => reactivarUsuario(usuario.id)}
                      >
                        Reactivar
                      </button>
                      <button 
                        className="btn-eliminar"
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

        {vistaActiva === 'productos' && (
          <div className="tabla-container">
            <div className="productos-header">
              <h2>Productos ({productos.length})</h2>
              <button 
                className="btn-agregar"
                onClick={() => setMostrarFormProducto(true)}
              >
                + Agregar Producto
              </button>
            </div>
            <table className="tabla-admin">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Fecha Creación</th>
                </tr>
              </thead>
              <tbody>
                {productos.map(producto => (
                  <tr key={producto.id}>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>{producto.categoria}</td>
                    <td>{new Date(producto.fechaCreacion).toLocaleDateString()}</td>
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
      {mostrarFormProducto && <FormProducto />}
    </div>
  );
};

export default AdminPanel;