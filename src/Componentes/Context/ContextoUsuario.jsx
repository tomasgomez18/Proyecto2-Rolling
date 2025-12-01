import { createContext, useContext, useEffect, useState } from "react";
import { UserStorage } from "../Utils/UsuarioStorage";
import toast from "react-hot-toast";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosSuspendidos, setUsuariosSuspendidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [usuarioActual, setUsuarioActual] = useState(null);
  const [cargando, setCargando] = useState(true);

  const cargarDatosIniciales = async () => {
    try {
      setCargando(true);

      const listaUsuarios = await UserStorage.TodosLosUsuarios();
      setUsuarios(listaUsuarios);

      const susp = JSON.parse(
        localStorage.getItem("usuariosSuspendidos") || "[]"
      );
      setUsuariosSuspendidos(susp);

      const prod = JSON.parse(localStorage.getItem("productos") || "[]");
      setProductos(prod);

      const ultimo = JSON.parse(
        localStorage.getItem("ultimoUsuario") || "null"
      );
      if (ultimo) setUsuarioActual(ultimo);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const login = async (credenciales) => {
    const result = await UserStorage.VerificarLoginUsuario(credenciales);

    if (result.login) {
      setUsuarioActual(result.usuario);
      localStorage.setItem("ultimoUsuario", JSON.stringify(result.usuario));
    }

    return result;
  };

  const logout = () => {
    setUsuarioActual(null);
    localStorage.removeItem("ultimoUsuario");
  };

  const esAdministrador = usuarioActual?.role === "admin";

  const suspenderUsuario = async (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    if (!usuario) return;

    if (usuario.role === "admin") {
      toast.error(" El administrador no puede ser suspendido", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
        },
      });
      return;
    }

    try {
      const usuarioSuspendido = { 
        ...usuario, 
        fechaSuspension: new Date().toISOString() 
      };

      await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: 'DELETE',
      });

      await fetch('http://localhost:3001/usuariosSuspendidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuarioSuspendido),
      });

      const nuevosActivos = usuarios.filter((u) => u.id !== id);
      const nuevosSuspendidos = [...usuariosSuspendidos, usuarioSuspendido];

      setUsuarios(nuevosActivos);
      setUsuariosSuspendidos(nuevosSuspendidos);

      localStorage.setItem("usuarios", JSON.stringify(nuevosActivos));
      localStorage.setItem(
        "usuariosSuspendidos",
        JSON.stringify(nuevosSuspendidos)
      );

      toast.success(`Usuario ${usuario.nombreDeUsuario} suspendido`, {
        duration: 3000,
        position: "top-right",
      });

    } catch (error) {
      toast.error("Error al suspender usuario: " + error.message, {
        duration: 5000,
        position: "top-right",
      });
    }
  };

  const reactivarUsuario = async (id) => {
    const usuario = usuariosSuspendidos.find((u) => u.id === id);
    if (!usuario) return;

    try {

      await fetch(`http://localhost:3001/usuariosSuspendidos/${id}`, {
        method: 'DELETE',
      });

      await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      const nuevosSuspendidos = usuariosSuspendidos.filter((u) => u.id !== id);
      const nuevosActivos = [...usuarios, usuario];

      setUsuarios(nuevosActivos);
      setUsuariosSuspendidos(nuevosSuspendidos);

      localStorage.setItem("usuarios", JSON.stringify(nuevosActivos));
      localStorage.setItem(
        "usuariosSuspendidos",
        JSON.stringify(nuevosSuspendidos)
      );
      
      toast.success(`Usuario ${usuario.nombreDeUsuario} reactivado`, {
        duration: 3000,
        position: "top-right",
      });

    } catch (error) {
      toast.error("Error al reactivar usuario: " + error.message, {
        duration: 5000,
        position: "top-right",
      });
    }
  };

  const eliminarUsuarioSuspendido = async (id) => {
    const usuario = usuariosSuspendidos.find((u) => u.id === id);
    if (!usuario) return;

    if (usuario.role === "admin") {
      toast.error("El administrador no puede ser eliminado", {
        duration: 4000,
        position: "top-right",
        style: {
          background: "#f8d7da",
          color: "#721c24",
          border: "1px solid #f5c6cb",
        },
      });
      return;
    }
    const confirmarEliminacion = window.confirm(
      `¿Estás seguro de que deseas eliminar permanentemente a "${usuario.nombreDeUsuario}"?\n\nEsta acción no se puede deshacer y se eliminará del backup.`
    );

    if (!confirmarEliminacion) {
      toast.info("Eliminación cancelada", {
        duration: 2000,
        position: "top-right",
      });
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3001/usuariosSuspendidos/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) throw new Error('Error al eliminar de la base de datos');

      const nuevos = usuariosSuspendidos.filter((u) => u.id !== id);
      setUsuariosSuspendidos(nuevos);
      localStorage.setItem("usuariosSuspendidos", JSON.stringify(nuevos));

      toast.success(
        `Usuario ${usuario.nombreDeUsuario} eliminado permanentemente de la base de datos`,
        {
          duration: 3000,
          position: "top-right",
        }
      );

    } catch (error) {
      toast.error("Error al eliminar usuario: " + error.message, {
        duration: 5000,
        position: "top-right",
      });
    }
  };

  const editarUsuario = async (id, nuevosDatos) => {
    try {
      const respuesta = await fetch(`http://localhost:3001/usuarios/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...nuevosDatos, id: id }),
      });

      if (!respuesta.ok) throw new Error("Error al actualizar en DB");

      const actualizados = usuarios.map((u) =>
        u.id === id ? { ...u, ...nuevosDatos } : u
      );
      setUsuarios(actualizados);
      localStorage.setItem("usuarios", JSON.stringify(actualizados));

      // Actualizar usuario actual si es el mismo
      if (usuarioActual && usuarioActual.id === id) {
        const usuarioActualizado = { ...usuarioActual, ...nuevosDatos };
        setUsuarioActual(usuarioActualizado);
        localStorage.setItem("ultimoUsuario", JSON.stringify(usuarioActualizado));
      }

      toast.success("Usuario actualizado en la base de datos", {
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error al actualizar: " + error.message, {
        duration: 5000,
      });
    }
  };

  const agregarProducto = async (producto) => {
    try {
      const nuevo = {
        ...producto,
        id: crypto.randomUUID(),
        fechaCreacion: new Date().toISOString(),
      };

      const respuesta = await fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevo),
      });

      if (!respuesta.ok) throw new Error('Error al agregar producto a la base de datos');

      const nuevos = [...productos, nuevo];
      setProductos(nuevos);
      localStorage.setItem("productos", JSON.stringify(nuevos));

      toast.success(`Producto "${producto.nombre}" agregado a la base de datos`, {
        duration: 3000,
        position: "top-right",
      });

      return { exito: true, producto: nuevo };

    } catch (error) {
      toast.error("Error al agregar producto: " + error.message, {
        duration: 5000,
        position: "top-right",
      });
      return { exito: false, mensaje: error.message };
    }
  };

  const editarProducto = async (id, nuevosDatos) => {
    try {
      const respuesta = await fetch(`http://localhost:3001/productos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...nuevosDatos, id: id }),
      });

      if (!respuesta.ok) throw new Error("Error al actualizar producto en DB");

      const actualizados = productos.map((p) =>
        p.id === id ? { ...p, ...nuevosDatos, fechaModificacion: new Date().toISOString() } : p
      );
      
      setProductos(actualizados);
      localStorage.setItem("productos", JSON.stringify(actualizados));

      toast.success("Producto actualizado correctamente", {
        duration: 3000,
        position: "top-right",
      });

      return { exito: true };
    } catch (error) {
      toast.error("Error al actualizar producto: " + error.message, {
        duration: 5000,
        position: "top-right",
      });
      return { exito: false, mensaje: error.message };
    }
  };

  const eliminarProducto = async (id) => {
    // Encontrar el producto a eliminar
    const producto = productos.find((p) => p.id === id);
    if (!producto) {
      toast.error("Producto no encontrado", {
        duration: 3000,
        position: "top-right",
      });
      return { exito: false };
    }

    // Confirmar eliminación
    const confirmarEliminacion = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto "${producto.nombre}"?\n\nEsta acción no se puede deshacer.`
    );

    if (!confirmarEliminacion) {
      toast.info("Eliminación cancelada", {
        duration: 2000,
        position: "top-right",
      });
      return { exito: false };
    }

    try {
      // Eliminar de la base de datos (json-server)
      const respuesta = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) throw new Error('Error al eliminar producto de la base de datos');

      // Actualizar estado local
      const nuevos = productos.filter((p) => p.id !== id);
      setProductos(nuevos);
      localStorage.setItem("productos", JSON.stringify(nuevos));

      toast.success(
        `Producto "${producto.nombre}" eliminado correctamente`,
        {
          duration: 3000,
          position: "top-right",
        }
      );

      return { exito: true };
    } catch (error) {
      toast.error("Error al eliminar producto: " + error.message, {
        duration: 5000,
        position: "top-right",
      });
      return { exito: false, mensaje: error.message };
    }
  };

  const sincronizarConAPI = async () => {
    try {
      const result = await UserStorage.Backup();
      return { exito: true, mensaje: result.mensaje };
    } catch (e) {
      return { exito: false, mensaje: e.message };
    }
  };

  return (
    <UserContext.Provider
      value={{
        usuarios,
        usuariosSuspendidos,
        productos,
        usuarioActual,
        setUsuarioActual,
        cargando,
        esAdministrador,
        login,
        logout,
        suspenderUsuario,
        reactivarUsuario,
        eliminarUsuarioSuspendido,
        editarUsuario,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        sincronizarConAPI,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};