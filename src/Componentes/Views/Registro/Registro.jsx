import { Modal } from "react-bootstrap";
import FormRegistro from "./ComponenteRegistro/FormRegistro";

export const Registro = ({ onClose }) => {
  const onSubmit = (data) => {
    console.log("Usuario creado", data);

    onClose();
  };

  return (
    <>
      {" "}
      <Modal
        show={true}
        onHide={onClose}
        centered
        size="lg"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton onClose={onClose}>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRegistro onSubmit={onSubmit} />
        </Modal.Body>
      </Modal>
    </>
  );
};
