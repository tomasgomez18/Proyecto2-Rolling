const URL_API = import.meta.env.VITE_URL_API;

export const UserStorage = {
  async TodosLosUsuarios() {
    try {
      const respuesta = await fetch(URL_API);

      if (!respuesta.ok) throw new Error("Respuesta no OK desde la API");

      const usuariosAPI = await respuesta.json();

      localStorage.setItem("usuarios", JSON.stringify(usuariosAPI));

      return usuariosAPI;
    } catch (error) {

      const usuariosLocal = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
      );

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

      const contrasenaEnBD = usuarioEncontrado.contrasena;
      const contrasenaRecibida = data.contrasena;

      if (contrasenaEnBD === contrasenaRecibida) {
        
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
      return { 
        login: false, 
        mensaje: "Error al iniciar sesión. Por favor, intente nuevamente." 
      };
    }
  },

  async VerificarRegistrarUsuario(data) {
    try {

      const usuarios = await this.TodosLosUsuarios();

      const emailExiste = usuarios.some(
        (usuario) => usuario.email === data.email
      );
      
      const usuarioExiste = usuarios.some(
        (usuario) => usuario.nombreDeUsuario === data.nombreDeUsuario
      );

      if (emailExiste) {
        return {
          registrado: false,
          mensaje: "El email ya está registrado. Por favor, use otro email.",
        };
      }

      if (usuarioExiste) {
        return {
          registrado: false,
          mensaje: "El nombre de usuario ya existe. Por favor, elija otro.",
        };
      }

      const usuarioCompleto = {
        id: crypto.randomUUID(),
        nombreDeUsuario: data.nombreDeUsuario,
        email: data.email,
        pais: data.pais,
        fechaNacimiento: data.fechaNacimiento,
        contrasena: data.contrasena,
        role: "usuario",
      };

      usuarios.push(usuarioCompleto);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      try {
        const respuestaChequeada = await fetch(
          `${URL_API}?email=${encodeURIComponent(data.email)}&nombreDeUsuario=${encodeURIComponent(data.nombreDeUsuario)}`
        );

        if (respuestaChequeada.ok) {
          const usuariosExistentes = await respuestaChequeada.json();

          const existeEnAPI = usuariosExistentes.some(
            (usuario) =>
              usuario.email === data.email ||
              usuario.nombreDeUsuario === data.nombreDeUsuario
          );

          if (existeEnAPI) {
            const usuariosActualizados = usuarios.filter(
              (u) => u.id !== usuarioCompleto.id
            );
            localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));

            return {
              registrado: false,
              mensaje: "El usuario ya existe en nuestra base de datos.",
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

        const usuarioGuardadoAPI = await respuesta.json();

        usuarioCompleto.id = usuarioGuardadoAPI.id;
        
        await this.UltimoLogin(usuarioCompleto);

        return {
          registrado: true,
          mensaje: "¡Usuario registrado exitosamente!",
          usuario: usuarioCompleto,
        };
      } catch (error) {
        await this.UltimoLogin(usuarioCompleto);
        
        return {
          registrado: true,
          mensaje: "Usuario registrado. Hubo un problema con la sincronización. Contacte a soporte si persiste.",
          necesitaSoporte: true,
          rutaSoporte: "/contacto",
          usuario: usuarioCompleto,
        };
      }
    } catch (error) {
      return { 
        registrado: false, 
        mensaje: "Error al registrar el usuario. Por favor, intente nuevamente." 
      };
    }
  },

  async Backup() {
    try {
      const usuariosLocal = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
      );

      const respuesta = await fetch(URL_API);

      if (!respuesta.ok) {
        throw new Error(`Error al cargar datos: ${respuesta.status}`);
      }

      const usuariosAPI = await respuesta.json();

      if (usuariosLocal.length === 0) {
        localStorage.setItem("usuarios", JSON.stringify(usuariosAPI));
        return {
          carga: true,
          mensaje: "Datos restaurados desde la API",
          usuariosRestaurados: usuariosAPI.length,
        };
      }

      const usuariosFaltantes = usuariosAPI.filter(
        (apiUser) =>
          !usuariosLocal.find((localUser) => localUser.id === apiUser.id)
      );

      if (usuariosFaltantes.length > 0) {
        const usuariosCombinados = [...usuariosLocal];

        usuariosFaltantes.forEach((apiUser) => {
          if (!usuariosCombinados.find((u) => u.id === apiUser.id)) {
            usuariosCombinados.push(apiUser);
          }
        });

        localStorage.setItem("usuarios", JSON.stringify(usuariosCombinados));

        return {
          carga: true,
          mensaje: "Usuarios nuevos agregados desde la API",
          usuariosAgregados: usuariosFaltantes.length,
        };
      }

      return {
        carga: false,
        mensaje: "LocalStorage y API están sincronizados",
      };
    } catch (error) {
      return {
        error: true,
        mensaje: "Error al realizar el backup. Contacte a soporte.",
        rutaSoporte: "/contacto",
      };
    }
  },

  async ObtenerUsuarioActual() {
    try {
      const usuarioStr = localStorage.getItem("ultimoUsuario");
      if (!usuarioStr) return null;

      const usuario = JSON.parse(usuarioStr);
      
      const usuarios = await this.TodosLosUsuarios();
      const usuarioValido = usuarios.find(u => u.id === usuario.id);
      
      return usuarioValido || null;
    } catch (error) {
      return null;
    }
  },

  async CerrarSesion() {
    localStorage.removeItem("ultimoUsuario");
  }
};