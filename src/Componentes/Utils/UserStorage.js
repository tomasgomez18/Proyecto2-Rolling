import { json } from "zod";
import { da } from "zod/locales";
const URL_API = import.meta.env.VITE_URL_API;
export const UserStorage = {
  TodosLosUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    return usuarios;
  },

  async VerificarRegistrarUsuario(data) {
    try {
      const usuarios = this.TodosLosUsuarios();
      const usuarioExiste = usuarios.some(
        (usuario) =>
          usuario.email === data.email ||
          usuario.nombreDeUsuario === data.nombreDeUsuario
      );

      if (usuarioExiste) {
        return {
          registrado: false,
          mensaje: "El nombre de usuario o Email ya esta registrado.",
        };
      } else {
        const usuarioCompleto = {
          id: Date.now() + Math.random().toString(36).substr(2, 9),
          nombreDeUsuario: data.nombreDeUsuario,
          email: data.email,
          pais: data.pais,
          fechaNacimiento: data.fechaNacimiento,
          contraseña: data.contraseña,
        };
        usuarios.push(usuarioCompleto);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log("Usuario guardado en localStorage");
        try {
          const respuesta = await fetch(URL_API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioCompleto),
          });

          if (!respuesta.ok) {
            throw new Error(`Error API: ${respuesta.status}`);
          }
          return {
            registrado: true,
            mensaje: "Usuario registrado con exito en ambos sistemas",
          };
        } catch (error) {
          return {
            registrado: true,
            mensaje:
              "usuario registrado con exito, pero fallo backup por favor contacte a soporte",
            necesitaSoporte: true,
            rutaSoporte: "/contacto",
          };
        }
      }
    } catch (error) {
      return { registrado: false, mensaje: "Error al registrar el usuario." };
    }
  },
};
