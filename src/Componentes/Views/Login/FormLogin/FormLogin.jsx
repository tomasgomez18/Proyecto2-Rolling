import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import ValidacionesForm from "../../../Utils/ValidacionesForm";
import "./FormLogin.css";

export const FormLogin = ({ onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ValidacionesForm),
  });

  const procesarEnvio = (data) => {
    console.log("Datos de login válidos:", data);
    onSubmit?.(data);
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center py-4 py-md-5">
      <Row className="w-100 justify-content-center mx-0">
        <Col xs={12} sm={11} md={10} lg={9} xl={8} className="px-3 px-md-4">
          <Form onSubmit={handleSubmit(procesarEnvio)} className="contenedor-formulario p-4 p-md-5 rounded">
            
            {/* Título */}
            <div className="text-center mb-4">
              <h4 className="texto-dorado mb-0">INICIAR SESIÓN</h4>
            </div>

            {/* Nombre de Usuario o Email */}
            <Form.Group className="mb-4">
              <Form.Label className="form-label mb-2">NOMBRE DE USUARIO O EMAIL</Form.Label>
              <Form.Control
                type="text"
                {...register("nombreDeUsuario")}
                isInvalid={!!errors.nombreDeUsuario}
                placeholder="Ingrese su nombre de usuario o email"
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Control.Feedback type="invalid" className="retroalimentacion-invalida">
                {errors.nombreDeUsuario?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Contraseña */}
            <Form.Group className="mb-4">
              <Form.Label className="form-label mb-2">CONTRASEÑA</Form.Label>
              <Form.Control
                type="password"
                {...register("contraseña")}
                isInvalid={!!errors.contraseña}
                placeholder="Ingrese su contraseña"
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Control.Feedback type="invalid" className="retroalimentacion-invalida">
                {errors.contraseña?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Enlace de contraseña olvidada */}
            <div className="text-end mb-4">
              <a href="#" className="enlace-dorado">¿OLVIDASTE TU CONTRASEÑA?</a>
            </div>

            {/* Botones */}
            <Row className="g-3 mt-4">
              <Col xs={12} sm={6}>
                <Button
                  variant="outline-light"
                  onClick={onClose}
                  type="button"
                  className="w-100 py-3 boton-personalizado boton-cancelar"
                >
                  CANCELAR
                </Button>
              </Col>
              <Col xs={12} sm={6}>
                <Button 
                  variant="warning" 
                  type="submit" 
                  className="w-100 py-3 boton-personalizado boton-enviar"
                >
                  INICIAR SESIÓN
                </Button>
              </Col>
            </Row>

            {/* Enlace de registro */}
            <div className="text-center mt-4">
              <p className="texto-registro">
                ¿NO TIENES CUENTA? <a href="#" className="enlace-dorado">REGÍSTRATE AQUÍ</a>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};