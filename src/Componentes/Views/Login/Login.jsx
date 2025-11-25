import { FormLogin } from "./FormLogin/FormLogin";
import Modal from "react-bootstrap/Modal";

const Login = ({ onClose }) => {
  const onSubmit = (data) => {
    console.log("Usuario creado", data);
    onClose();
  };
  return (
    <>
      <Modal
        show={true}
        onHide={onClose}
        centered
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton >
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormLogin onSubmit={onSubmit} onClose={onClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
