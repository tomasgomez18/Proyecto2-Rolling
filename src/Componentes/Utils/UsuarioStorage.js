const URL_API = import.meta.env.VITE_URL_API;

export const UserStorage = {
  async TodosLosUsuarios() {
    try {
      const respuesta = await fetch(URL_API);

      if (!respuesta.ok) throw new Error("Respuesta no OK desde la API");

      const usuariosAPI = await respuesta.json();

      localStorage.setItem("usuarios", JSON.stringify(usuariosAPI));

      console.log("✅ Usuarios cargados desde API:", usuariosAPI);
      return usuariosAPI;
    } catch (error) {
      console.warn("⚠️ Error accediendo a la API, usando localStorage:", error);

      const usuariosLocal = JSON.parse(
        localStorage.getItem("usuarios") || "[]"
      );

      console.log("📂 Usuarios cargados desde LocalStorage:", usuariosLocal);
      return usuariosLocal;
    }
  },

  async UltimoLogin(usuario) {
    localStorage.setItem("ultimoUsuario", JSON.stringify(usuario));
    console.log("💾 Último login guardado:", usuario.nombreDeUsuario);
  },

  async VerificarLoginUsuario(data) {
    try {
      console.log("🔐 Datos recibidos para login:", {
        credencial: data.credencial,
        contrasena: data.contrasena ? "***" : "no recibida"
      });

      const usuarios = await this.TodosLosUsuarios();

      console.log("👥 Total de usuarios disponibles:", usuarios.length);

      // Buscar usuario por email O nombre de usuario
      const usuarioEncontrado = usuarios.find(
        (usuario) =>
          usuario.nombreDeUsuario === data.credencial ||
          usuario.email === data.credencial
      );

      if (!usuarioEncontrado) {
        console.log("❌ Usuario no encontrado con credencial:", data.credencial);
        return {
          login: false,
          mensaje: "Usuario no encontrado",
        };
      }

      console.log("✅ Usuario encontrado:", {
        id: usuarioEncontrado.id,
        nombreDeUsuario: usuarioEncontrado.nombreDeUsuario,
        email: usuarioEncontrado.email,
        role: usuarioEncontrado.role,
        tieneContrasena: !!usuarioEncontrado.contrasena
      });

      // IMPORTANTE: Ahora comparamos con el campo 'contrasena' (en español)
      const contrasenaEnBD = usuarioEncontrado.contrasena;
      const contrasenaRecibida = data.contrasena;

      console.log("🔑 Comparando contraseñas:", {
        enBD: contrasenaEnBD ? "***" : "vacía",
        recibida: contrasenaRecibida ? "***" : "vacía",
        iguales: contrasenaEnBD === contrasenaRecibida
      });

      if (contrasenaEnBD === contrasenaRecibida) {
        console.log("✅ Contraseña correcta - Login exitoso");
        await this.UltimoLogin(usuarioEncontrado);
        return {
          login: true,
          mensaje: "Login exitoso",
          usuario: usuarioEncontrado,
        };
      } else {
        console.log("❌ Contraseña incorrecta");
        return {
          login: false,
          mensaje: "Contraseña incorrecta",
        };
      }
    } catch (error) {
      console.error("💥 Error en VerificarLoginUsuario:", error);
      return { 
        login: false, 
        mensaje: "Error al iniciar sesión. Por favor, intente nuevamente." 
      };
    }
  },

  async VerificarRegistrarUsuario(data) {
    try {
      console.log("📝 Datos recibidos para registro:", {
        ...data,
        contrasena: data.contrasena ? "***" : "no recibida",
        confirmarContrasena: data.confirmarContrasena ? "***" : "no recibida"
      });

      const usuarios = await this.TodosLosUsuarios();

      // Verificar si el usuario ya existe
      const emailExiste = usuarios.some(
        (usuario) => usuario.email === data.email
      );
      
      const usuarioExiste = usuarios.some(
        (usuario) => usuario.nombreDeUsuario === data.nombreDeUsuario
      );

      if (emailExiste) {
        console.log("❌ Email ya registrado:", data.email);
        return {
          registrado: false,
          mensaje: "El email ya está registrado. Por favor, use otro email.",
        };
      }

      if (usuarioExiste) {
        console.log("❌ Nombre de usuario ya existe:", data.nombreDeUsuario);
        return {
          registrado: false,
          mensaje: "El nombre de usuario ya existe. Por favor, elija otro.",
        };
      }

      // Crear nuevo usuario con campo 'contrasena' (en español)
      const usuarioCompleto = {
        id: crypto.randomUUID(),
        nombreDeUsuario: data.nombreDeUsuario,
        email: data.email,
        pais: data.pais,
        fechaNacimiento: data.fechaNacimiento,
        contrasena: data.contrasena, // ← CAMPO EN ESPAÑOL
        role: "usuario",
      };

      console.log("👤 Nuevo usuario a crear:", {
        ...usuarioCompleto,
        contrasena: "***"
      });

      // Guardar en localStorage primero
      usuarios.push(usuarioCompleto);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      console.log("💾 Usuario guardado en localStorage");

      try {
        // Verificar si ya existe en la API
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
            console.log("⚠️ Usuario ya existente en API, eliminando de localStorage");
            
            // Remover del localStorage si ya existe en API
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

        // Guardar en la API (JSON Server)
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
        console.log("✅ Usuario guardado en API:", usuarioGuardadoAPI.id);

        // Actualizar el usuario con el ID generado por la API
        usuarioCompleto.id = usuarioGuardadoAPI.id;
        
        // Guardar sesión
        await this.UltimoLogin(usuarioCompleto);

        return {
          registrado: true,
          mensaje: "¡Usuario registrado exitosamente!",
          usuario: usuarioCompleto,
        };
      } catch (error) {
        console.error("⚠️ Error al guardar en API:", error);
        
        // El usuario ya está guardado en localStorage, así que el registro es exitoso
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
      console.error("💥 Error en VerificarRegistrarUsuario:", error);
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

      console.log("🔄 Iniciando backup...");
      console.log("📂 Usuarios en localStorage:", usuariosLocal.length);

      const respuesta = await fetch(URL_API);

      if (!respuesta.ok) {
        throw new Error(`Error al cargar datos: ${respuesta.status}`);
      }

      const usuariosAPI = await respuesta.json();
      console.log("🌐 Usuarios en API:", usuariosAPI.length);

      // Si no hay usuarios en localStorage, restaurar desde API
      if (usuariosLocal.length === 0) {
        localStorage.setItem("usuarios", JSON.stringify(usuariosAPI));
        console.log("✅ Datos restaurados desde la API");
        return {
          carga: true,
          mensaje: "Datos restaurados desde la API",
          usuariosRestaurados: usuariosAPI.length,
        };
      }

      // Encontrar usuarios en API que no están en localStorage
      const usuariosFaltantes = usuariosAPI.filter(
        (apiUser) =>
          !usuariosLocal.find((localUser) => localUser.id === apiUser.id)
      );

      console.log("🔍 Usuarios faltantes en localStorage:", usuariosFaltantes.length);

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

      console.log("✅ LocalStorage y API están sincronizados");
      return {
        carga: false,
        mensaje: "LocalStorage y API están sincronizados",
      };
    } catch (error) {
      console.error("💥 Error en backup:", error);
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
      
      // Verificar que el usuario aún existe en la base de datos
      const usuarios = await this.TodosLosUsuarios();
      const usuarioValido = usuarios.find(u => u.id === usuario.id);
      
      return usuarioValido || null;
    } catch (error) {
      console.error("💥 Error al obtener usuario actual:", error);
      return null;
    }
  },

  async CerrarSesion() {
    localStorage.removeItem("ultimoUsuario");
    console.log("👋 Sesión cerrada");
  }
};