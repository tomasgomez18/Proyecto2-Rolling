import { Modal } from "react-bootstrap";
import FormRegistro from "./FormRegistro/FormRegistro";
import { UserStorage } from "../../Utils/UserStorage";
import "./Registro.css";

export const Registro = ({ onClose }) => {
  const onSubmit = async (data) => {
    try {
      const resultado = await UserStorage.VerificarRegistrarUsuario(data);

      if (resultado.registrado) {
        console.log("Usuario creado", data);

        if (resultado.necesitaSoporte) {
          
          setMensajeRegistro(
            <div>
              {resultado.mensaje} <br />
              <a href="/contacto" className="link-soporte">
                Contactar soporte
              </a>
            </div>
          );
        } else {
          
          setMensajeRegistro(resultado.mensaje);
          onClose(); 
        }
      } else {
        // Mostrar error de registro
        setMensajeRegistro(resultado.mensaje);
      }
    } catch (error) {
      setMensajeRegistro("Error inesperado al registrar usuario");
    }
    console.log("Usuario creado", data);
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
        <Modal.Title>
          ¿Qué esperas para ser amante de Royal Enfield?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-custom p-0">
        <FormRegistro onSubmit={onSubmit} onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
};
