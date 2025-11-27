import { createContext, useContext, useState, useEffect } from "react";
import { UserStorage } from "../Utils/UsuarioStorage";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosSuspendidos, setUsuariosSuspendidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      setCargando(true);

    
      const usuariosData = await UserStorage.TodosLosUsuarios();
      setUsuarios(usuariosData);

   
      const suspendidos = JSON.parse(
        localStorage.getItem("usuariosSuspendidos") || "[]"
      );
      setUsuariosSuspendidos(suspendidos);

      const productosData = JSON.parse(
        localStorage.getItem("productos") || "[]"
      );
      setProductos(productosData);

      
      const ultimoUsuario = JSON.parse(
        localStorage.getItem("ultimoUsuario") || "null"
      );
      if (ultimoUsuario) {
        setUsuarioActual(ultimoUsuario);
      }
    } catch (error) {
      console.error("Error cargando datos iniciales:", error);
    } finally {
      setCargando(false);
    }
  };

 
  const login = async (credenciales) => {
    const resultado = await UserStorage.VerificarLoginUsuario(credenciales);
    if (resultado.login) {
      setUsuarioActual(resultado.usuario);
    }
    return resultado;
  };


  const logout = () => {
    setUsuarioActual(null);
    localStorage.removeItem("ultimoUsuario");
  };

  
  const esUsuarioAdminActual = (usuarioId) => {
    return (
      usuarioActual &&
      usuarioActual.id === usuarioId &&
      usuarioActual.role === "admin"
    );
  };

 
  const esUsuarioAdmin = (usuarioId) => {
    const usuario = usuarios.find((u) => u.id === usuarioId);
    return usuario && usuario.role === "admin";
  };

  const suspenderUsuario = async (usuarioId) => {
    
    if (esUsuarioAdminActual(usuarioId) || esUsuarioAdmin(usuarioId)) {
      return {
        exito: false,
        mensaje: "No se puede suspender a un administrador",
      };
    }

    const usuario = usuarios.find((u) => u.id === usuarioId);
    if (usuario && !usuariosSuspendidos.find((u) => u.id === usuarioId)) {
      const nuevosSuspendidos = [
        ...usuariosSuspendidos,
        {
          ...usuario,
          fechaSuspension: new Date().toISOString(),
        },
      ];
      setUsuariosSuspendidos(nuevosSuspendidos);
      localStorage.setItem(
        "usuariosSuspendidos",
        JSON.stringify(nuevosSuspendidos)
      );

    
      const usuariosActualizados = usuarios.filter((u) => u.id !== usuarioId);
      setUsuarios(usuariosActualizados);
      localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));

    
      try {
        const URL_API = import.meta.env.VITE_URL_API;
        await fetch(`${URL_API}/${usuarioId}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.warn(
          "No se pudo actualizar API, pero cambios se guardaron en localStorage"
        );
      }

      return { exito: true, mensaje: "Usuario suspendido correctamente" };
    }
    return { exito: false, mensaje: "Usuario no encontrado o ya suspendido" };
  };

 
  const reactivarUsuario = (usuarioId) => {
    const usuarioSuspendido = usuariosSuspendidos.find(
      (u) => u.id === usuarioId
    );
    if (usuarioSuspendido) {
      
      const nuevosSuspendidos = usuariosSuspendidos.filter(
        (u) => u.id !== usuarioId
      );
      setUsuariosSuspendidos(nuevosSuspendidos);
      localStorage.setItem(
        "usuariosSuspendidos",
        JSON.stringify(nuevosSuspendidos)
      );

     
      const { fechaSuspension, ...usuario } = usuarioSuspendido;
      const nuevosUsuarios = [...usuarios, usuario];
      setUsuarios(nuevosUsuarios);
      localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));

      return { exito: true, mensaje: "Usuario reactivado correctamente" };
    }
    return { exito: false, mensaje: "Usuario suspendido no encontrado" };
  };


  const eliminarUsuarioSuspendido = async (usuarioId) => {
    
    if (esUsuarioAdmin(usuarioId)) {
      return {
        exito: false,
        mensaje: "No se puede eliminar a un administrador",
      };
    }

    const usuarioSuspendido = usuariosSuspendidos.find(
      (u) => u.id === usuarioId
    );
    if (usuarioSuspendido) {
      try {
       
        const URL_API = import.meta.env.VITE_URL_API;
        const respuesta = await fetch(`${URL_API}/${usuarioId}`, {
          method: "DELETE",
        });

        if (respuesta.ok) {
          
          const nuevosSuspendidos = usuariosSuspendidos.filter(
            (u) => u.id !== usuarioId
          );
          setUsuariosSuspendidos(nuevosSuspendidos);
          localStorage.setItem(
            "usuariosSuspendidos",
            JSON.stringify(nuevosSuspendidos)
          );
          return { exito: true, mensaje: "Usuario eliminado correctamente" };
        }
      } catch (error) {
        console.error("Error eliminando usuario de API:", error);
        return { exito: false, mensaje: "Error al eliminar usuario de la API" };
      }
    }
    return { exito: false, mensaje: "Usuario suspendido no encontrado" };
  };


  const editarUsuario = async (usuarioId, datosActualizados) => {
    
    if (
      esUsuarioAdminActual(usuarioId) &&
      datosActualizados.role &&
      datosActualizados.role !== "admin"
    ) {
      return {
        exito: false,
        mensaje: "No puedes cambiar tu propio rol de administrador",
      };
    }

    
    if (esUsuarioAdmin(usuarioId) && !esUsuarioAdminActual(usuarioId)) {
      return {
        exito: false,
        mensaje: "No puedes editar a otros administradores",
      };
    }

    const usuarioIndex = usuarios.findIndex((u) => u.id === usuarioId);
    if (usuarioIndex !== -1) {
      const usuariosActualizados = [...usuarios];
      usuariosActualizados[usuarioIndex] = {
        ...usuariosActualizados[usuarioIndex],
        ...datosActualizados,
      };
      setUsuarios(usuariosActualizados);
      localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));

     
      try {
        const URL_API = import.meta.env.VITE_URL_API;
        await fetch(`${URL_API}/${usuarioId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(usuariosActualizados[usuarioIndex]),
        });
      } catch (error) {
        console.warn(
          "No se pudo actualizar API, pero cambios se guardaron en localStorage"
        );
      }

      return { exito: true, mensaje: "Usuario editado correctamente" };
    }
    return { exito: false, mensaje: "Usuario no encontrado" };
  };

 
  const sincronizarConAPI = async () => {
    try {
      const usuariosLocal = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
      );
      const URL_API = import.meta.env.VITE_URL_API;

    
      const respuesta = await fetch(URL_API);
      const usuariosAPI = await respuesta.json();

      
      for (const usuario of usuariosLocal) {
        const usuarioEnAPI = usuariosAPI.find((u) => u.id === usuario.id);

        if (usuarioEnAPI) {
          
          await fetch(`${URL_API}/${usuario.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
          });
        } else {
          
          await fetch(URL_API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
          });
        }
      }

      return { exito: true, mensaje: "Sincronización completada" };
    } catch (error) {
      return { exito: false, mensaje: "Error en sincronización: " + error.message };
    }
  };


  const agregarProducto = (producto) => {
    const nuevoProducto = {
      id: crypto.randomUUID(),
      ...producto,
      fechaCreacion: new Date().toISOString(),
    };
    const nuevosProductos = [...productos, nuevoProducto];
    setProductos(nuevosProductos);
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));
    return {
      exito: true,
      mensaje: "Producto agregado correctamente",
      producto: nuevoProducto,
    };
  };

 
  const esAdministrador = usuarioActual?.role === "admin";

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
    esUsuarioAdminActual,
    sincronizarConAPI,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};