import { createContext, useContext, useState, useEffect } from 'react';
import { UserStorage } from '../Utils/UserStorage';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosSuspendidos, setUsuariosSuspendidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar datos iniciales
  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      setCargando(true);
      
      // Cargar usuarios
      const usuariosData = await UserStorage.TodosLosUsuarios();
      setUsuarios(usuariosData);

      // Cargar usuarios suspendidos desde localStorage
      const suspendidos = JSON.parse(localStorage.getItem('usuariosSuspendidos') || '[]');
      setUsuariosSuspendidos(suspendidos);

      // Cargar productos desde localStorage
      const productosData = JSON.parse(localStorage.getItem('productos') || '[]');
      setProductos(productosData);

      // Verificar si hay un usuario logueado
      const ultimoUsuario = JSON.parse(localStorage.getItem('ultimoUsuario') || 'null');
      if (ultimoUsuario) {
        setUsuarioActual(ultimoUsuario);
      }

    } catch (error) {
      console.error('Error cargando datos iniciales:', error);
    } finally {
      setCargando(false);
    }
  };

  // Login
  const login = async (credenciales) => {
    const resultado = await UserStorage.VerificarLoginUsuario(credenciales);
    if (resultado.login) {
      setUsuarioActual(resultado.usuario);
    }
    return resultado;
  };

  // Logout
  const logout = () => {
    setUsuarioActual(null);
    localStorage.removeItem('ultimoUsuario');
  };

  // Verificar si es el usuario admin actual
  const esUsuarioAdminActual = (usuarioId) => {
    return usuarioActual && usuarioActual.id === usuarioId && usuarioActual.role === 'admin';
  };

  // Verificar si es cualquier usuario admin
  const esUsuarioAdmin = (usuarioId) => {
    const usuario = usuarios.find(u => u.id === usuarioId);
    return usuario && usuario.role === 'admin';
  };

  // Suspender usuario
  const suspenderUsuario = (usuarioId) => {
    // No permitir suspender al admin actual ni a otros admins
    if (esUsuarioAdminActual(usuarioId) || esUsuarioAdmin(usuarioId)) {
      return { exito: false, mensaje: 'No se puede suspender a un administrador' };
    }

    const usuario = usuarios.find(u => u.id === usuarioId);
    if (usuario && !usuariosSuspendidos.find(u => u.id === usuarioId)) {
      const nuevosSuspendidos = [...usuariosSuspendidos, { 
        ...usuario, 
        fechaSuspension: new Date().toISOString() 
      }];
      setUsuariosSuspendidos(nuevosSuspendidos);
      localStorage.setItem('usuariosSuspendidos', JSON.stringify(nuevosSuspendidos));
      
      // Actualizar lista de usuarios
      const usuariosActualizados = usuarios.filter(u => u.id !== usuarioId);
      setUsuarios(usuariosActualizados);
      localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
      
      return { exito: true, mensaje: 'Usuario suspendido correctamente' };
    }
    return { exito: false, mensaje: 'Usuario no encontrado o ya suspendido' };
  };

  // Reactivar usuario
  const reactivarUsuario = (usuarioId) => {
    const usuarioSuspendido = usuariosSuspendidos.find(u => u.id === usuarioId);
    if (usuarioSuspendido) {
      // Remover de suspendidos
      const nuevosSuspendidos = usuariosSuspendidos.filter(u => u.id !== usuarioId);
      setUsuariosSuspendidos(nuevosSuspendidos);
      localStorage.setItem('usuariosSuspendidos', JSON.stringify(nuevosSuspendidos));

      // Agregar a usuarios activos
      const { fechaSuspension, ...usuario } = usuarioSuspendido;
      const nuevosUsuarios = [...usuarios, usuario];
      setUsuarios(nuevosUsuarios);
      localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));

      return { exito: true, mensaje: 'Usuario reactivado correctamente' };
    }
    return { exito: false, mensaje: 'Usuario suspendido no encontrado' };
  };

  // Eliminar usuario suspendido (solo si está suspendido)
  const eliminarUsuarioSuspendido = async (usuarioId) => {
    // No permitir eliminar admins
    if (esUsuarioAdmin(usuarioId)) {
      return { exito: false, mensaje: 'No se puede eliminar a un administrador' };
    }

    const usuarioSuspendido = usuariosSuspendidos.find(u => u.id === usuarioId);
    if (usuarioSuspendido) {
      try {
        // Eliminar de la API
        const URL_API = import.meta.env.VITE_URL_API;
        const respuesta = await fetch(`${URL_API}/${usuarioId}`, {
          method: 'DELETE'
        });

        if (respuesta.ok) {
          // Eliminar de localStorage (suspendidos)
          const nuevosSuspendidos = usuariosSuspendidos.filter(u => u.id !== usuarioId);
          setUsuariosSuspendidos(nuevosSuspendidos);
          localStorage.setItem('usuariosSuspendidos', JSON.stringify(nuevosSuspendidos));
          return { exito: true, mensaje: 'Usuario eliminado correctamente' };
        }
      } catch (error) {
        console.error('Error eliminando usuario de API:', error);
        return { exito: false, mensaje: 'Error al eliminar usuario de la API' };
      }
    }
    return { exito: false, mensaje: 'Usuario suspendido no encontrado' };
  };

  // Editar usuario
  const editarUsuario = (usuarioId, datosActualizados) => {
    // No permitir editar el rol del admin actual
    if (esUsuarioAdminActual(usuarioId) && datosActualizados.role && datosActualizados.role !== 'admin') {
      return { exito: false, mensaje: 'No puedes cambiar tu propio rol de administrador' };
    }

    // No permitir editar otros admins
    if (esUsuarioAdmin(usuarioId) && !esUsuarioAdminActual(usuarioId)) {
      return { exito: false, mensaje: 'No puedes editar a otros administradores' };
    }

    const usuarioIndex = usuarios.findIndex(u => u.id === usuarioId);
    if (usuarioIndex !== -1) {
      const usuariosActualizados = [...usuarios];
      usuariosActualizados[usuarioIndex] = { 
        ...usuariosActualizados[usuarioIndex], 
        ...datosActualizados 
      };
      setUsuarios(usuariosActualizados);
      localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
      return { exito: true, mensaje: 'Usuario editado correctamente' };
    }
    return { exito: false, mensaje: 'Usuario no encontrado' };
  };

  // Agregar producto
  const agregarProducto = (producto) => {
    const nuevoProducto = {
      id: crypto.randomUUID(),
      ...producto,
      fechaCreacion: new Date().toISOString()
    };
    const nuevosProductos = [...productos, nuevoProducto];
    setProductos(nuevosProductos);
    localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    return { exito: true, mensaje: 'Producto agregado correctamente', producto: nuevoProducto };
  };

  // Verificar si es administrador
  const esAdministrador = usuarioActual?.role === 'admin';

  const value = {
    usuarioActual,
    usuarios,
    usuariosSuspendidos,
    productos,
    cargando,
    login,
    logout,
    suspenderUsuario,
    reactivarUsuario,
    eliminarUsuarioSuspendido,
    editarUsuario,
    agregarProducto,
    esAdministrador,
    recargarDatos: cargarDatosIniciales,
    esUsuarioAdminActual
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};