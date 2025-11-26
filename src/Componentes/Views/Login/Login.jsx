import { Modal } from "react-bootstrap";
import { FormLogin } from "./FormLogin/FormLogin";
import { UserStorage } from "../../Utils/UserStorage";
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
      dialogClassName="modal-login-custom"
    >
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>Bienvenido de vuelta a Rolling Motors</Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body-custom p-0">
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
