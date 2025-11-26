import { Modal } from "react-bootstrap";
import { FormLogin } from "./FormLogin/FormLogin";
import { UserStorage } from "../../Utils/UserStorage"; // Importa UserStorage
import "./Login.css";

const Login = ({ onClose, onAbrirRegistro }) => {
  const onSubmit = async (data) => {
    try {
      const resultado = await UserStorage.VerificarLoginUsuario(data);
      
      if (resultado.login) {
        console.log("Login exitoso", resultado.usuario);
        onClose();
      } else {
        alert(resultado.mensaje);
      }
    } catch (error) {
      alert("Error inesperado en el login");
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
        <FormLogin onSubmit={onSubmit} onClose={onClose} onAbrirRegistro={onAbrirRegistro} />
      </Modal.Body>
    </Modal>
  );
};

export default Login;