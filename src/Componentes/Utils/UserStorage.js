import CryptoJS from "crypto-js";
const URL_API = import.meta.env.VITE_URL_API;
export const UserStorage = {
  async TodosLosUsuarios() {
    try {
      const respuesta = await fetch(URL_API);

      if (!respuesta.ok) throw new Error("Respuesta no OK desde la API");

      const usuariosAPI = await respuesta.json();

      localStorage.setItem("usuarios", JSON.stringify(usuariosAPI));

      console.log("Usuarios cargados desde API:", usuariosAPI);
      return usuariosAPI;
    } catch (error) {
      console.warn("Error accediendo a la API, usando localStorage:", error);

      const usuariosLocal = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
      );

      console.log("Usuarios cargados desde LocalStorage:", usuariosLocal);
      return usuariosLocal;
    }
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

      const contraseñaIngresadaHasheada = CryptoJS.SHA256(
        data.contraseña
      ).toString();

      // DEBUG: Agregar estos console.log
      console.log("🔍 DEBUG LOGIN:");
      console.log("Contraseña ingresada:", data.contraseña);
      console.log("Hash generado:", contraseñaIngresadaHasheada);
      console.log("Hash en BD:", usuarioEncontrado.password);
      console.log(
        "Coinciden?",
        usuarioEncontrado.password === contraseñaIngresadaHasheada
      );
      console.log("Usuario completo:", usuarioEncontrado);
      console.log("Longitud contraseña ingresada:", data.contraseña.length);
      console.log(
        "Contraseña ingresada con delimitadores:",
        `|${data.contraseña}|`
      );

      if (usuarioEncontrado.password === contraseñaIngresadaHasheada) {
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
          password: CryptoJS.SHA256(data.password).toString(),
          role: "usuario",
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
          this.UltimoLogin(usuarioCompleto);
          return {
            registrado: true,
            mensaje: "Usuario registrado con exito en ambos sistemas",
          };
        } catch (error) {
          await this.UltimoLogin(usuarioCompleto);
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

  async Backup() {
    try {
      // Leer directo del localStorage, sin llamar a TodosLosUsuarios()
      const usuariosLocal = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
      );

      const respuesta = await fetch(URL_API);

      if (!respuesta.ok) {
        throw new Error(`Error al cargar datos: ${respuesta.status}`);
      }

      const usuariosAPI = await respuesta.json();

      // Si el localStorage está vacío → cargar backup
      if (usuariosLocal.length === 0) {
        localStorage.setItem("usuarios", JSON.stringify(usuariosAPI));
        return {
          carga: true,
          mensaje: "Datos restaurados desde la API",
          usuariosRestaurados: usuariosAPI.length,
        };
      }

      // Si NO coincide la cantidad → sincronizar con API
      if (usuariosLocal.length !== usuariosAPI.length) {
        localStorage.setItem("usuarios", JSON.stringify(usuariosAPI));
        return {
          carga: true,
          mensaje: "Datos sincronizados desde la API",
          usuariosRestaurados: usuariosAPI.length,
          usuariosAnteriores: usuariosLocal.length,
        };
      }

      // Si está todo OK
      return {
        carga: false,
        mensaje: "LocalStorage y API están sincronizados",
      };
    } catch (error) {
      console.log("Error en backup", error);
      return {
        error: true,
        mensaje: "Error al realizar el backup. Contacte a soporte.",
        rutaSoporte: "/contacto",
      };
    }
  },
};
