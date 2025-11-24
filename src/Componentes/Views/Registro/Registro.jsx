import { Modal } from "react-bootstrap";

export const Registro = () => {

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
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormRegistro />
        </Modal.Body>
      </Modal>
    </>
  );
};
