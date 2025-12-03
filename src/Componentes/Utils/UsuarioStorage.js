export const UserStorage = {
  // Obtener todos los usuarios desde localStorage
  async TodosLosUsuarios() {
    const usuariosLocal = JSON.parse(localStorage.getItem("usuarios") || "[]");
    return usuariosLocal;
  },

  // Guardar el último usuario que hizo login
  async UltimoLogin(usuario) {
    localStorage.setItem("ultimoUsuario", JSON.stringify(usuario));
  },

  // Verificar credenciales de login
  async VerificarLoginUsuario(data) {
    try {
      const usuarios = await this.TodosLosUsuarios();

      const usuarioEncontrado = usuarios.find(
        (usuario) =>
          usuario.nombreDeUsuario === data.credencial ||
          usuario.email === data.credencial
      );

      if (!usuarioEncontrado) {
        return { login: false, mensaje: "Usuario no encontrado" };
      }

      if (usuarioEncontrado.contrasena === data.contrasena) {
        await this.UltimoLogin(usuarioEncontrado);
        return { login: true, mensaje: "Login exitoso", usuario: usuarioEncontrado };
      } else {
        return { login: false, mensaje: "Contraseña incorrecta" };
      }
    } catch {
      return { login: false, mensaje: "Error al iniciar sesión" };
    }
  },

  // Registrar un nuevo usuario
  async VerificarRegistrarUsuario(data) {
    try {
      const usuarios = await this.TodosLosUsuarios();

      const emailExiste = usuarios.some(u => u.email === data.email);
      const usuarioExiste = usuarios.some(u => u.nombreDeUsuario === data.nombreDeUsuario);

      if (emailExiste) {
        return { registrado: false, mensaje: "El email ya está registrado" };
      }

      if (usuarioExiste) {
        return { registrado: false, mensaje: "El nombre de usuario ya existe" };
      }

      const usuarioCompleto = {
        id: crypto.randomUUID(),
        nombreDeUsuario: data.nombreDeUsuario,
        email: data.email,
        pais: data.pais,
        fechaNacimiento: data.fechaNacimiento,
        contrasena: data.contrasena,
        role: "usuario"
      };

      usuarios.push(usuarioCompleto);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      await this.UltimoLogin(usuarioCompleto);

      return { registrado: true, mensaje: "Usuario registrado exitosamente", usuario: usuarioCompleto };
    } catch {
      return { registrado: false, mensaje: "Error al registrar usuario" };
    }
  },

  // Actualizar un usuario existente
  async EditarUsuario(id, nuevosDatos) {
    try {
      const usuarios = await this.TodosLosUsuarios();
      const index = usuarios.findIndex(u => u.id === id);
      if (index === -1) throw new Error("Usuario no encontrado");

      const usuarioActualizado = { ...usuarios[index], ...nuevosDatos };
      usuarios[index] = usuarioActualizado;

      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      await this.UltimoLogin(usuarioActualizado);

      return { exito: true, usuario: usuarioActualizado };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  },

  // Eliminar un usuario
  async EliminarUsuario(id) {
    try {
      const usuarios = await this.TodosLosUsuarios();
      const index = usuarios.findIndex(u => u.id === id);
      if (index === -1) throw new Error("Usuario no encontrado");

      const usuarioEliminado = usuarios.splice(index, 1)[0];
      localStorage.setItem("usuarios", JSON.stringify(usuarios));

      const ultimoUsuario = JSON.parse(localStorage.getItem("ultimoUsuario") || "{}");
      if (ultimoUsuario.id === id) {
        localStorage.removeItem("ultimoUsuario");
      }

      return { exito: true, usuario: usuarioEliminado };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  },

  // Obtener usuario actual
  async ObtenerUsuarioActual() {
    const usuarioStr = localStorage.getItem("ultimoUsuario");
    if (!usuarioStr) return null;

    const usuario = JSON.parse(usuarioStr);
    const usuarios = await this.TodosLosUsuarios();
    return usuarios.find(u => u.id === usuario.id) || null;
  },

  // Cerrar sesión
  async CerrarSesion() {
    localStorage.removeItem("ultimoUsuario");
  }
};
