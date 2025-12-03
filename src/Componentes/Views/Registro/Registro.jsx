import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import FormRegistro from "./FormRegistro/FormRegistro";
import { UserStorage } from "../../Utils/UsuarioStorage";
import { useUser } from "../../Context/ContextoUsuario";
import "./Registro.css";

export const Registro = ({ onClose, onAbrirLogin }) => {
  const navigate = useNavigate();
  const { setUsuarioActual } = useUser();

  const onSubmit = async (data) => {
    try {
      console.log("Registro.jsx - Datos recibidos:", data);
      
      const resultado = await UserStorage.VerificarRegistrarUsuario(data);
      console.log("Registro.jsx - Resultado:", resultado);

      if (resultado.registrado) {
        toast.success("¡Registro exitoso! Bienvenido a Rolling Motors");
        
        if (resultado.usuario) {
          setUsuarioActual(resultado.usuario);
        }

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
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 1500);
        }
      } else {
        toast.error(resultado.mensaje || "No se pudo registrar el usuario");
      }
    } catch (error) {
      console.error("Registro.jsx - Error:", error);
      toast.error("Error inesperado: " + error.message);
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
      dialogClassName="modal-registro-personalizado"
    >
      <Modal.Header closeButton className="encabezado-modal-personalizado">
        <Modal.Title className="ms-auto">¿Qué esperas para ser amante de Rolling Motors?</Modal.Title>
      </Modal.Header>

      <Modal.Body className="cuerpo-modal-personalizado p-0">
        <FormRegistro 
          onSubmit={onSubmit} 
          onClose={onClose} 
          onAbrirLogin={onAbrirLogin}
        />
      </Modal.Body>
    </Modal>
  );
};