import db from "../../../db.json";

export const inicializarLocalStorage = () => {
  try {
    if (!localStorage.getItem("usuarios")) {
      localStorage.setItem("usuarios", JSON.stringify(db.usuarios || []));
      console.log("LocalStorage: 'usuarios' inicializado desde db.json");
    } else {
      console.log("LocalStorage: 'usuarios' ya existe, no se sobrescribe.");
    }

    if (!localStorage.getItem("usuariosSuspendidos")) {
      localStorage.setItem("usuariosSuspendidos", JSON.stringify(db.usuariosSuspendidos || []));
      console.log("LocalStorage: 'usuariosSuspendidos' inicializado desde db.json");
    } else {
      console.log("LocalStorage: 'usuariosSuspendidos' ya existe, no se sobrescribe.");
    }

    if (!localStorage.getItem("productos")) {
      localStorage.setItem("productos", JSON.stringify(db.productos || []));
      console.log("LocalStorage: 'productos' inicializado desde db.json");
    } else {
      console.log("LocalStorage: 'productos' ya existe, no se sobrescribe.");
    }
  } catch (error) {
    console.error("Error al inicializar LocalStorage:", error);
  }
};
