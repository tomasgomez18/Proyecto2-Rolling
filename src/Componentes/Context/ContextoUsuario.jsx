import { createContext, useContext, useEffect, useState } from "react";
import { UserStorage } from "../Utils/UsuarioStorage";

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

      const susp = JSON.parse(localStorage.getItem("usuariosSuspendidos") || "[]");
      setUsuariosSuspendidos(susp);

      const prod = JSON.parse(localStorage.getItem("productos") || "[]");
      setProductos(prod);

      const ultimo = JSON.parse(localStorage.getItem("ultimoUsuario") || "null");
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

  const suspenderUsuario = (id) => {
    const usuario = usuarios.find((u) => u.id === id);
    if (!usuario) return;

    const nuevosActivos = usuarios.filter((u) => u.id !== id);
    const nuevosSuspendidos = [
      ...usuariosSuspendidos,
      { ...usuario, fechaSuspension: new Date().toISOString() },
    ];

    setUsuarios(nuevosActivos);
    setUsuariosSuspendidos(nuevosSuspendidos);

    localStorage.setItem("usuarios", JSON.stringify(nuevosActivos));
    localStorage.setItem("usuariosSuspendidos", JSON.stringify(nuevosSuspendidos));
  };

  const reactivarUsuario = (id) => {
    const usuario = usuariosSuspendidos.find((u) => u.id === id);
    if (!usuario) return;

    const nuevosSuspendidos = usuariosSuspendidos.filter((u) => u.id !== id);
    const nuevosActivos = [...usuarios, usuario];

    setUsuarios(nuevosActivos);
    setUsuariosSuspendidos(nuevosSuspendidos);

    localStorage.setItem("usuarios", JSON.stringify(nuevosActivos));
    localStorage.setItem("usuariosSuspendidos", JSON.stringify(nuevosSuspendidos));
  };

  const eliminarUsuarioSuspendido = (id) => {
    const nuevos = usuariosSuspendidos.filter((u) => u.id !== id);
    setUsuariosSuspendidos(nuevos);
    localStorage.setItem("usuariosSuspendidos", JSON.stringify(nuevos));
  };

  const editarUsuario = (id, nuevosDatos) => {
    const actualizados = usuarios.map((u) =>
      u.id === id ? { ...u, ...nuevosDatos } : u
    );

    setUsuarios(actualizados);
    localStorage.setItem("usuarios", JSON.stringify(actualizados));
  };

  const agregarProducto = (producto) => {
    const nuevo = {
      ...producto,
      id: crypto.randomUUID(),
      fechaCreacion: new Date().toISOString(),
    };

    const nuevos = [...productos, nuevo];
    setProductos(nuevos);
    localStorage.setItem("productos", JSON.stringify(nuevos));
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
        cargando,
        esAdministrador,
        login,
        logout,
        suspenderUsuario,
        reactivarUsuario,
        eliminarUsuarioSuspendido,
        editarUsuario,
        agregarProducto,
        sincronizarConAPI,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
