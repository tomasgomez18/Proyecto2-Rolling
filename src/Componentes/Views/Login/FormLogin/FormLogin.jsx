import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { loginSchema } from "../../../Utils/ValidacionesForm";
import "./FormLogin.css";

export const FormLogin = ({ onSubmit, onClose, onAbrirRegistro }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const manejarClickRegistro = (e) => {
    e.preventDefault();
    onAbrirRegistro?.();
  };

  const procesarEnvio = (data) => {
    console.log("Datos de login válidos:", data);
    onSubmit?.(data);
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center py-4 py-md-5"
    >
      <Row className="w-100 justify-content-center mx-0">
        <Col xs={12} sm={11} md={10} lg={9} xl={8} className="px-3 px-md-4">
          <Form
            onSubmit={handleSubmit(procesarEnvio)}
            className="contenedor-formulario p-4 p-md-5 rounded"
          >
            <div className="text-center mb-4">
              <h4 className="texto-dorado mb-0">INICIAR SESIÓN</h4>
            </div>

            <Form.Group className="mb-4">
              <Form.Label className="form-label mb-2">
                NOMBRE DE USUARIO O EMAIL
              </Form.Label>
              <Form.Control
                type="text"
                {...register("credencial")}
                isInvalid={!!errors.credencial}
                placeholder="Ingrese su nombre de usuario o email"
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.credencial?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="form-label mb-2">CONTRASEÑA</Form.Label>
              <Form.Control
                type="password"
                {...register("contrasena")}
                isInvalid={!!errors.contrasena}
                placeholder="Ingrese su contraseña"
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.contrasena?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="text-end mb-4">
              <a href="#" className="enlace-dorado">
                ¿OLVIDASTE TU CONTRASEÑA?
              </a>
            </div>

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

            <div className="text-center mt-4">
              <p className="texto-registro">
                ¿NO TIENES CUENTA?{" "}
                <a href="#" className="enlace-dorado" onClick={manejarClickRegistro}>
                  REGÍSTRATE AQUÍ
                </a>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
