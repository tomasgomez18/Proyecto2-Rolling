import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import FormRegistro from "./FormRegistro/FormRegistro";
import { UserStorage } from "../../Utils/UserStorage";
import "./Registro.css";

export const Registro = ({ onClose }) => {
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const resultado = await UserStorage.VerificarRegistrarUsuario(data);

      if (resultado.registrado) {
        toast.success("Usuario registrado correctamente");

        if (resultado.necesitaSoporte) {
          toast(
            (t) => (
              <span>
                {resultado.mensaje} <br />
                <button
                  className="btn btn-link p-0 text-warning"
                  onClick={() => {
                    toast.dismiss(t.id);
                    onClose();
                    navigate("/contacto");
                  }}
                >
                  Contactar soporte
                </button>
              </span>
            ),
            { duration: 6000 }
          );
        } else {
          toast.success(resultado.mensaje || "¡Registro exitoso!");
          onClose();
        }
      } else {
        toast.error(resultado.mensaje || "No se pudo registrar el usuario");
      }
    } catch (error) {
      toast.error("Error inesperado al registrar usuario");
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
