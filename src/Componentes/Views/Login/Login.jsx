import { Modal } from "react-bootstrap";
import { FormLogin } from "./FormLogin/FormLogin";
import "./Login.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/ContextoUsuario";

const Login = ({ onClose, onAbrirRegistro }) => {
  const navigate = useNavigate();
  const { login, usuarioActual, esAdministrador } = useUser(); // Usar el login del contexto

  const onSubmit = async (data) => {
    try {
      // 🔥 CAMBIO: Usar el login del contexto en lugar de UserStorage directamente
      const resultado = await login(data);

      if (resultado.login) {
        toast.success("Login exitoso ✔");
        onClose();

        // 🔥 CAMBIO: Usar el usuarioActual del contexto que ya está actualizado
        setTimeout(() => {
          if (resultado.usuario.role === "admin") {
            toast(
              (t) => (
                <div className="text-white">
                  <p className="mb-2">¿Quieres ir al panel de administrador?</p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        toast.dismiss(t.id);
                        navigate("/admin");
                      }}
                    >
                      Sí
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => toast.dismiss(t.id)}
                    >
                      No
                    </button>
                  </div>
                </div>
              ),
              {
                duration: 6000,
                position: "top-center",
                style: {
                  background: "#222",
                },
              }
            );
          }
        }, 300);

      } else {
        toast.error(resultado.mensaje || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      toast.error("Error inesperado en el login");
    }
  };

  return (
    <Modal
      show={true}
      onHide={onClose}
      centered
      size="lg"
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-login-personalizado"
    >
      <Modal.Header closeButton className="encabezado-modal-personalizado">
        <Modal.Title>Bienvenido de vuelta a Rolling Motors</Modal.Title>
      </Modal.Header>

      <Modal.Body className="cuerpo-modal-personalizado p-0">
        <FormLogin
          onSubmit={onSubmit}
          onClose={onClose}
          onAbrirRegistro={onAbrirRegistro}
        />
      </Modal.Body>
    </Modal>
  );
};

export default Login;