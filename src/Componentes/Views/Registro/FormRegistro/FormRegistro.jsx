import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ValidacionesForm, {
  PAISES_VALIDOS,
  FECHA_MINIMA,
  FECHA_MAXIMA,
} from "../../../Utils/ValidacionesForm";
import "./FormRegistro.css";

const FormRegistro = ({ onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch
  } = useForm({
    resolver: zodResolver(ValidacionesForm),
    mode: "onChange"
  });

  const procesarEnvio = (data) => {
    console.log("Datos válidos:", data);
    
    const datosParaEnviar = {
      nombreDeUsuario: data.nombreDeUsuario,
      email: data.email,
      pais: data.pais,
      fechaNacimiento: data.fechaNacimiento,
      password: data.contrasena,
    };
    
    onSubmit?.(datosParaEnviar);
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center py-4 py-md-5">
      <Row className="w-100 justify-content-center mx-0">
        <Col xs={12} sm={11} md={10} lg={9} xl={8} className="px-3 px-md-4">
          <Form onSubmit={handleSubmit(procesarEnvio)} className="contenedor-formulario p-4 p-md-5 rounded" noValidate>
            
            <div className="text-center mb-4">
              <h4 className="texto-dorado mb-0">REGISTRO</h4>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="texto-dorado mb-2">NOMBRE DE USUARIO</Form.Label>
              <Form.Control
                type="text"
                {...register("nombreDeUsuario")}
                isInvalid={!!errors.nombreDeUsuario}
                placeholder="Ingrese su nombre de usuario"
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombreDeUsuario?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="texto-dorado mb-2">EMAIL</Form.Label>
              <Form.Control
                type="email"
                {...register("email")}
                isInvalid={!!errors.email}
                placeholder="ejemplo@correo.com"
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="texto-dorado mb-2">PAÍS DE RESIDENCIA</Form.Label>
              <Form.Select
                {...register("pais")}
                isInvalid={!!errors.pais}
                defaultValue=""
                className="entrada-personalizada"
                size="lg"
              >
                <option value="" disabled>
                  Selecciona tu país
                </option>
                {PAISES_VALIDOS.map((pais) => (
                  <option key={pais} value={pais}>
                    {pais}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.pais?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="texto-dorado mb-2">FECHA DE NACIMIENTO</Form.Label>
              <Form.Control
                type="date"
                {...register("fechaNacimiento")}
                isInvalid={!!errors.fechaNacimiento}
                min={FECHA_MINIMA.toISOString().split("T")[0]}
                max={FECHA_MAXIMA.toISOString().split("T")[0]}
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Text className="texto-blanco d-block mt-2">
                Debe ser entre 1945 y 2006 (18+ años)
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors.fechaNacimiento?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="texto-dorado mb-2">CONTRASEÑA</Form.Label>
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
              <Form.Text className="texto-blanco">
                Mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="texto-dorado mb-2">CONFIRMAR CONTRASEÑA</Form.Label>
              <Form.Control
                type="password"
                {...register("confirmarContrasena")}
                isInvalid={!!errors.confirmarContrasena}
                placeholder="Repita su contraseña"
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmarContrasena?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="g-3 mt-4">
              <Col xs={12} sm={6}>
                <Button
                  variant="outline-light"
                  onClick={onClose}
                  type="button"
                  className="w-100 py-3 boton-personalizado boton-cancelar"
                  disabled={isSubmitting}
                >
                  CANCELAR
                </Button>
              </Col>
              <Col xs={12} sm={6}>
                <Button 
                  variant="warning" 
                  type="submit" 
                  className="w-100 py-3 boton-personalizado boton-enviar"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "REGISTRANDO..." : "REGISTRARSE"}
                </Button>
              </Col>
            </Row>

            {Object.keys(errors).length > 0 && (
              <div className="mt-3 p-3 bg-dark rounded">
                <h6 className="text-warning">Errores de validación:</h6>
                <ul className="text-white small">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>
                      <strong>{field}:</strong> {error.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormRegistro;