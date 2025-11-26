import { json } from "zod";
import { da } from "zod/locales";
const URL_API = import.meta.env.VITE_URL_API;
export const UserStorage = {
  async TodosLosUsuarios() {
    const usuarios = await JSON.parse(localStorage.getItem("usuarios") || "[]");
    return usuarios;
  },

  async UltimoLogin(usuario) {
    localStorage.setItem("ultimoUsuario", JSON.stringify(usuario));
  },

  async VerificarLoginUsuario(data) {
    try {
      const usuarios = await this.TodosLosUsuarios();
      const usuarioEncontrado = usuarios.find(
        (usuario) =>
          usuario.nombreDeUsuario === data.credencial ||
          usuario.email === data.credencial
      );

      if (!usuarioEncontrado) {
        return {
          login: false,
          mensaje: "Usuario no encontrado",
        };
      }
      console.log("Usuario existe");

      if (usuarioEncontrado.contraseña === data.contraseña) {
        console.log("Contraseña correcta");
        await this.UltimoLogin(usuarioEncontrado);

        return {
          login: true,
          mensaje: "Login exitoso",
          usuario: usuarioEncontrado,
        };
      } else {
        return {
          login: false,
          mensaje: "Contraseña incorrecta",
        };
      }
    } catch (error) {
      return { login: false, mensaje: "Error al logearse vuelva a intentarlo" };
    }
  },

  async VerificarRegistrarUsuario(data) {
    try {
      const usuarios = await this.TodosLosUsuarios();
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
          id: crypto.randomUUID(),
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
          const respuestaChequeada = await fetch(
            `${URL_API}?email=${encodeURIComponent(
              data.email
            )}&nombreDeUsuario=${encodeURIComponent(data.nombreDeUsuario)}`
          );
          if (respuestaChequeada.ok) {
            const usuariosExistentes = await respuestaChequeada.json();
            const existeEnAPI = usuariosExistentes.some(
              (usuario) =>
                usuario.email === data.email ||
                usuario.nombreDeUsuario === data.nombreDeUsuario
            );

            if (existeEnAPI) {
              console.log(
                "Usuario ya existente en API, por ende registro no valido (nuevo registro)se borra del localStorage y API"
              );
              const usuariosActualizados = usuarios.filter(
                (u) => u.id !== usuarioCompleto.id
              );
              localStorage.setItem(
                "usuarios",
                JSON.stringify(usuariosActualizados)
              );

              return {
                registrado: false,
                mensaje: "El usuario ya existe en nuestra base de datos",
              };
            }
          }

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
