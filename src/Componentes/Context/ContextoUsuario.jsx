import { createContext, useContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosSuspendidos, setUsuariosSuspendidos] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = useCallback(async () => {
    try {
      setCargando(true);
      console.log('🔍 Cargando datos de usuarios...');
      
      const [resUsuarios, resSuspendidos] = await Promise.all([
        fetch('http://localhost:3001/usuarios'),
        fetch('http://localhost:3001/usuariosSuspendidos')
      ]);
      
      const dataUsuarios = await resUsuarios.json();
      const dataSuspendidos = await resSuspendidos.json();
      
      setUsuarios(dataUsuarios);
      setUsuariosSuspendidos(dataSuspendidos);

      console.log(`✅ ${dataUsuarios.length} usuarios activos, ${dataSuspendidos.length} suspendidos`);
      
      const ultimo = JSON.parse(localStorage.getItem("ultimoUsuario") || "null");
      if (ultimo) {
        const usuarioValido = dataUsuarios.find(u => u.id === ultimo.id);
        if (usuarioValido) {
          setUsuarioActual(usuarioValido);
          console.log('👤 Usuario restaurado de sesión:', usuarioValido.nombreDeUsuario);
        } else {
          localStorage.removeItem("ultimoUsuario");
          console.log('⚠️ Sesión anterior inválida, limpiando...');
        }
      }
    } catch (error) {
      console.error('❌ Error cargando datos:', error);
      toast.error('Error al cargar usuarios');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const login = useCallback(async (credenciales) => {
    try {
      console.log('🔐 Intentando login con:', {
        credencial: credenciales.credencial,
        contrasena: credenciales.contrasena ? '***' : 'no enviada'
      });
      
      const response = await fetch('http://localhost:3001/usuarios');
      const usuarios = await response.json();
      
      // Buscar usuario por email O nombre de usuario
      const usuarioEncontrado = usuarios.find(usuario => {
        const coincideCredencial = 
          usuario.email === credenciales.credencial || 
          usuario.nombreDeUsuario === credenciales.credencial;
        
        const coincideContrasena = usuario.contrasena === credenciales.contrasena;
        
        return coincideCredencial && coincideContrasena;
      });

      if (usuarioEncontrado) {
        setUsuarioActual(usuarioEncontrado);
        localStorage.setItem("ultimoUsuario", JSON.stringify(usuarioEncontrado));
        
        console.log('✅ Login exitoso:', usuarioEncontrado.nombreDeUsuario);
        toast.success(`Bienvenido ${usuarioEncontrado.nombreDeUsuario}`);
        
        return { 
          login: true, 
          usuario: usuarioEncontrado,
          esAdmin: usuarioEncontrado.role === "admin"
        };
      } else {
        console.log('❌ Login fallido: credenciales incorrectas');
        toast.error('Credenciales incorrectas');
        return { login: false, mensaje: 'Credenciales incorrectas' };
      }
    } catch (error) {
      console.error('❌ Error en login:', error);
      toast.error('Error en el servidor');
      return { login: false, mensaje: 'Error del servidor' };
    }
  }, []);

  const logout = useCallback(() => {
    console.log('👋 Logout usuario:', usuarioActual?.nombreDeUsuario);
    setUsuarioActual(null);
    localStorage.removeItem("ultimoUsuario");
    toast.success('Sesión cerrada');
  }, [usuarioActual]);

  const suspenderUsuario = useCallback(async (id) => {
    try {
      const usuario = usuarios.find((u) => u.id === id);
      if (!usuario) {
        toast.error('Usuario no encontrado');
        return;
      }

      if (usuario.role === "admin") {
        toast.error("El administrador no puede ser suspendido");
        return;
      }

      console.log('⚠️ Suspendiendo usuario:', usuario.nombreDeUsuario);

      await fetch(`http://localhost:3001/usuarios/${id}`, { method: 'DELETE' });
      
      const usuarioSuspendido = { 
        ...usuario, 
        fechaSuspension: new Date().toISOString() 
      };
      
      await fetch('http://localhost:3001/usuariosSuspendidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioSuspendido)
      });

      // Actualizar estados locales
      setUsuarios(prev => prev.filter(u => u.id !== id));
      setUsuariosSuspendidos(prev => [...prev, usuarioSuspendido]);

      toast.success(`Usuario ${usuario.nombreDeUsuario} suspendido`);
      console.log('✅ Usuario suspendido exitosamente');
    } catch (error) {
      console.error('❌ Error al suspender usuario:', error);
      toast.error("Error al suspender usuario");
    }
  }, [usuarios]);

  const reactivarUsuario = useCallback(async (id) => {
    try {
      const usuario = usuariosSuspendidos.find((u) => u.id === id);
      if (!usuario) {
        toast.error('Usuario no encontrado');
        return;
      }

      console.log('✅ Reactivando usuario:', usuario.nombreDeUsuario);

      // Mover de usuariosSuspendidos a usuarios
      await fetch(`http://localhost:3001/usuariosSuspendidos/${id}`, { 
        method: 'DELETE' 
      });
      
      await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });

      setUsuariosSuspendidos(prev => prev.filter(u => u.id !== id));
      setUsuarios(prev => [...prev, usuario]);

      toast.success(`Usuario ${usuario.nombreDeUsuario} reactivado`);
      console.log('✅ Usuario reactivado exitosamente');
    } catch (error) {
      console.error('❌ Error al reactivar usuario:', error);
      toast.error("Error al reactivar usuario");
    }
  }, [usuariosSuspendidos]);

  const eliminarUsuarioSuspendido = useCallback(async (id) => {
    const usuario = usuariosSuspendidos.find((u) => u.id === id);
    if (!usuario) return;

    if (usuario.role === "admin") {
      toast.error("El administrador no puede ser eliminado");
      return;
    }
    
    const confirmarEliminacion = window.confirm(
      `¿Estás seguro de que deseas eliminar permanentemente a "${usuario.nombreDeUsuario}"?\n\nEsta acción no se puede deshacer.`
    );

    if (!confirmarEliminacion) {
      toast.info("Eliminación cancelada");
      return;
    }

    try {
      console.log('🗑️ Eliminando usuario suspendido:', usuario.nombreDeUsuario);
      const respuesta = await fetch(`http://localhost:3001/usuariosSuspendidos/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) throw new Error('Error al eliminar de la base de datos');

      const nuevos = usuariosSuspendidos.filter((u) => u.id !== id);
      setUsuariosSuspendidos(nuevos);

      toast.success(
        `Usuario ${usuario.nombreDeUsuario} eliminado permanentemente`,
        {
          duration: 3000,
          position: "top-right",
        }
      );
      console.log('✅ Usuario eliminado exitosamente');

    } catch (error) {
      console.error('❌ Error al eliminar usuario:', error);
      toast.error("Error al eliminar usuario: " + error.message);
    }
  }, [usuariosSuspendidos]);

  const editarUsuario = useCallback(async (id, nuevosDatos) => {
    try {
      console.log('📝 Editando usuario ID:', id, nuevosDatos);
      const respuesta = await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevosDatos)
      });

      if (!respuesta.ok) throw new Error("Error al actualizar");

      const usuarioActualizado = await respuesta.json();
      
      // Actualizar lista de usuarios
      setUsuarios(prev => 
        prev.map(u => u.id === id ? usuarioActualizado : u)
      );

      // Si es el usuario actual, actualizar estado
      if (usuarioActual && usuarioActual.id === id) {
        setUsuarioActual(usuarioActualizado);
        localStorage.setItem("ultimoUsuario", JSON.stringify(usuarioActualizado));
      }

      toast.success("Usuario actualizado");
      console.log('✅ Usuario actualizado exitosamente');
    } catch (error) {
      console.error('❌ Error al actualizar usuario:', error);
      toast.error("Error al actualizar usuario");
    }
  }, [usuarioActual]);

  const sincronizarConAPI = useCallback(async () => {
    try {
      console.log('🔄 Sincronizando con API...');
      await cargarDatos();
      return { exito: true, mensaje: 'Datos sincronizados correctamente' };
    } catch (e) {
      console.error('❌ Error en sincronización:', e);
      return { exito: false, mensaje: 'Error en sincronización: ' + e.message };
    }
  }, [cargarDatos]);

  const registrarUsuario = useCallback(async (datos) => {
    try {
      console.log('📝 Registrando usuario desde contexto:', datos);
      
      const nuevoUsuario = {
        id: crypto.randomUUID(),
        nombreDeUsuario: datos.nombreDeUsuario,
        email: datos.email,
        pais: datos.pais,
        fechaNacimiento: datos.fechaNacimiento,
        contrasena: datos.contrasena,
        role: "usuario"
      };

      console.log('👤 Nuevo usuario a crear:', {
        ...nuevoUsuario,
        contrasena: '***'
      });

      const respuesta = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      });

      if (!respuesta.ok) throw new Error('Error al guardar usuario');

      const usuarioGuardado = await respuesta.json();
      
      setUsuarios(prev => [...prev, usuarioGuardado]);
      
      setUsuarioActual(usuarioGuardado);
      localStorage.setItem("ultimoUsuario", JSON.stringify(usuarioGuardado));

      toast.success("Usuario registrado exitosamente");
      return { 
        registrado: true, 
        usuario: usuarioGuardado,
        mensaje: "Registro exitoso" 
      };
    } catch (error) {
      console.error('❌ Error registrando usuario:', error);
      toast.error("Error al registrar usuario");
      return { 
        registrado: false, 
        mensaje: "Error al registrar usuario" 
      };
    }
  }, []);

  const obtenerUsuarioPorId = useCallback((id) => {
    return usuarios.find(u => u.id === id) || null;
  }, [usuarios]);

  const buscarUsuarios = useCallback((termino) => {
    if (!termino.trim()) return usuarios;
    
    const terminoLower = termino.toLowerCase();
    return usuarios.filter(u => 
      u.nombreDeUsuario.toLowerCase().includes(terminoLower) ||
      u.email.toLowerCase().includes(terminoLower) ||
      u.pais.toLowerCase().includes(terminoLower)
    );
  }, [usuarios]);

  const actualizarUsuarioActual = useCallback((nuevosDatos) => {
    if (!usuarioActual) return;
    
    const usuarioActualizado = { ...usuarioActual, ...nuevosDatos };
    setUsuarioActual(usuarioActualizado);
    localStorage.setItem("ultimoUsuario", JSON.stringify(usuarioActualizado));
    
    // Actualizar también en la lista de usuarios
    setUsuarios(prev => 
      prev.map(u => u.id === usuarioActual.id ? usuarioActualizado : u)
    );
    
    toast.success("Perfil actualizado");
  }, [usuarioActual]);

  return (
    <UserContext.Provider
      value={{
        // Estado
        usuarios,
        usuariosSuspendidos,
        usuarioActual,
        cargando,
        
        // Propiedades calculadas
        esAdministrador: usuarioActual?.role === "admin",
        estaAutenticado: !!usuarioActual,
        
        // Funciones de autenticación
        login,
        logout,
        registrarUsuario,
        
        // Funciones de administración
        suspenderUsuario,
        reactivarUsuario,
        eliminarUsuarioSuspendido,
        editarUsuario,
        
        // Funciones de búsqueda y consulta
        obtenerUsuarioPorId,
        buscarUsuarios,
        
        // Funciones de sincronización
        sincronizarConAPI,
        cargarDatos,
        
        // Setters y actualizadores
        setUsuarioActual,
        actualizarUsuarioActual
      }}
    >
      {children}
    </UserContext.Provider>
  );
};