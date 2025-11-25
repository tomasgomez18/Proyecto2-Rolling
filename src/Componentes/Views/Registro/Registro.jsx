import { Modal } from "react-bootstrap";
import FormRegistro from "./FormRegistro/FormRegistro";
import "./Registro.css";

export const Registro = ({ onClose }) => {
  const onSubmit = (data) => {
    console.log("Usuario creado", data);
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
      dialogClassName="modal-registro-custom"
    >
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>¿Qué esperas para ser amante de Royal Enfield?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom p-0">
        <FormRegistro onSubmit={onSubmit} onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
};