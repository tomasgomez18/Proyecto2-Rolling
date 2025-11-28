import { Modal } from "react-bootstrap";
import { FormLogin } from "./FormLogin/FormLogin";
import { UserStorage } from "../../Utils/UsuarioStorage";
import "./Login.css";
import { toast } from "react-hot-toast";

const Login = ({ onClose, onAbrirRegistro }) => {
  const onSubmit = async (data) => {
    try {
      const resultado = await UserStorage.VerificarLoginUsuario(data);

      if (resultado.login) {
        toast.success("Login exitoso ✔");
        onClose();
      } else {
        toast.error(resultado.mensaje || "Credenciales incorrectas");
      }
    } catch (error) {
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
