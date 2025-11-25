import { Modal } from "react-bootstrap";
import { FormLogin } from "./FormLogin/FormLogin";
import "./Login.css";

const Login = ({ onClose }) => {
  const onSubmit = (data) => {
    console.log("Datos de login:", data);
    onClose();
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
        <FormLogin onSubmit={onSubmit} onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
};

export default Login;