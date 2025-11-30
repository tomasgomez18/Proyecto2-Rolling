import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import FormRegistro from "./FormRegistro/FormRegistro";
import { UserStorage } from "../../Utils/UsuarioStorage";
import { useUser } from "../../Context/ContextoUsuario";
import "./Registro.css";

export const Registro = ({ onClose }) => {
  const navigate = useNavigate();
  const { setUsuarioActual, usuarioActual } = useUser(); 

  const onSubmit = async (data) => {
    try {
      console.log("📝 Datos recibidos para registro:", data);
      const resultado = await UserStorage.VerificarRegistrarUsuario(data);
      console.log("📋 Resultado del registro:", resultado);

      if (resultado.registrado) {
        toast.success("¡Registro exitoso! Bienvenido a Rolling Motors");

        console.log("👤 Usuario recibido en resultado:", resultado.usuario);
        
        if (resultado.usuario) {
          console.log("🔄 Intentando setear usuario actual...");
          setUsuarioActual(resultado.usuario);
          console.log("✅ Usuario actual después de setear:", usuarioActual);
          
          // Verificar localStorage
          const ultimoUsuario = localStorage.getItem("ultimoUsuario");
          console.log("💾 ultimoUsuario en localStorage:", ultimoUsuario);
        } else {
          console.log("❌ No se recibió usuario en el resultado");
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
            // Recargar la página para forzar la actualización del menú
            window.location.reload();
          }, 1500);
        }
      } else {
        toast.error(resultado.mensaje || "No se pudo registrar el usuario");
      }
    } catch (error) {
      console.error("💥 Error en registro:", error);
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
      dialogClassName="modal-registro-personalizado"
    >
      <Modal.Header closeButton className="encabezado-modal-personalizado">
        <Modal.Title className="ms-auto">¿Qué esperas para ser amante de Rolling Motors?</Modal.Title>
      </Modal.Header>

      <Modal.Body className="cuerpo-modal-personalizado p-0">
        <FormRegistro onSubmit={onSubmit} onClose={onClose} />
      </Modal.Body>
    </Modal>
  );
};