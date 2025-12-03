import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { loginSchema } from "../../../Utils/ValidacionesForm";
import "./FormLogin.css";
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";

export const FormLogin = ({ onSubmit, onClose, onAbrirRegistro }) => {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [estaEnviando, setEstaEnviando] = useState(false);
  const [errorGeneral, setErrorGeneral] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
    trigger,
    reset
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      credencial: "",
      contrasena: ""
    }
  });

  const credencial = watch("credencial");
  const contrasena = watch("contrasena");

  useEffect(() => {
    if (errorGeneral) {
      setErrorGeneral(null);
    }
  }, [credencial, contrasena]);

  const manejarClickRegistro = (e) => {
    e.preventDefault();
    reset(); 
    onAbrirRegistro?.();
  };

  const procesarEnvio = async (data) => {
    setEstaEnviando(true);
    setErrorGeneral(null);
    
    try {
      // Validar antes de enviar
      const esValido = await trigger();
      if (esValido) {
        console.log("Datos de login válidos:", data);
        await onSubmit?.(data);
      }
    } catch (error) {
      console.error("Error en login:", error);
      setErrorGeneral(
        error.message || "Credenciales incorrectas. Por favor, verifica tus datos."
      );
    } finally {
      setEstaEnviando(false);
    }
  };

  const toggleMostrarContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const limitarCaracteres = (e, maxLength) => {
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
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
            noValidate
          >
            <div className="text-center mb-4">
              <h4 className="texto-dorado mb-0">INICIAR SESIÓN</h4>
              <p className="texto-blanco mt-2 mb-0" style={{ fontSize: '0.9rem' }}>
                Ingresa tus credenciales para acceder a tu cuenta
              </p>
            </div>

            {errorGeneral && (
              <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                {errorGeneral}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setErrorGeneral(null)}
                  aria-label="Cerrar"
                ></button>
              </div>
            )}

            <Form.Group className="mb-4">
              <Form.Label className="form-label mb-2 texto-dorado">
                NOMBRE DE USUARIO O EMAIL
              </Form.Label>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-transparent border-end-0">
                  <FaUser className="texto-dorado" />
                </span>
                <Form.Control
                  type="text"
                  {...register("credencial")}
                  maxLength={100}
                  onInput={(e) => limitarCaracteres(e, 100)}
                  isInvalid={!!errors.credencial}
                  placeholder="usuario123 o ejemplo@correo.com"
                  className="entrada-personalizada border-start-0"
                />
              </div>
              <Form.Control.Feedback type="invalid" className="d-block mt-1">
                {errors.credencial?.message}
              </Form.Control.Feedback>
              <div className="d-flex justify-content-end mt-1">
                <small className="texto-blanco">
                  {credencial?.length || 0}/100
                </small>
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label className="form-label mb-0 texto-dorado">
                  CONTRASEÑA
                </Form.Label>
                <small className="texto-blanco">
                  {contrasena?.length || 0}/50
                </small>
              </div>
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-transparent border-end-0">
                  <FaLock className="texto-dorado" />
                </span>
                <Form.Control
                  type={mostrarContrasena ? "text" : "password"}
                  {...register("contrasena")}
                  maxLength={50}
                  onInput={(e) => limitarCaracteres(e, 50)}
                  isInvalid={!!errors.contrasena}
                  placeholder="Ingresa tu contraseña"
                  className="entrada-personalizada border-start-0"
                />
                <button
                  type="button"
                  className="input-group-text bg-transparent border-start-0"
                  onClick={toggleMostrarContrasena}
                  aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {mostrarContrasena ? (
                    <FaEyeSlash className="texto-dorado" />
                  ) : (
                    <FaEye className="texto-dorado" />
                  )}
                </button>
              </div>
              <Form.Control.Feedback type="invalid" className="d-block mt-1">
                {errors.contrasena?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="text-end mb-4">
              <a 
                href="#" 
                className="enlace-dorado text-decoration-none"
                onClick={(e) => {
                  e.preventDefault();
                  console.log("Recuperar contraseña");
                }}
              >
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
                  disabled={estaEnviando}
                >
                  CANCELAR
                </Button>
              </Col>
              <Col xs={12} sm={6}>
                <Button
                  variant="warning"
                  type="submit"
                  className="w-100 py-3 boton-personalizado boton-enviar"
                  disabled={estaEnviando || !isValid || !isDirty}
                >
                  {estaEnviando ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      INICIANDO...
                    </>
                  ) : (
                    "INICIAR SESIÓN"
                  )}
                </Button>
              </Col>
            </Row>

            <div className="text-center mt-4 pt-3 border-top border-secondary">
          
              <Button
                variant="outline-warning"
                onClick={manejarClickRegistro}
                className="w-100 py-2 boton-registro"
                disabled={estaEnviando}
              >
                CREAR NUEVA CUENTA
              </Button>
              <p className="texto-registro mt-3">
                ¿NO TIENES CUENTA?{" "}
                <a 
                  href="#" 
                  className="enlace-dorado fw-bold text-decoration-none"
                  onClick={manejarClickRegistro}
                >
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

export default FormLogin;