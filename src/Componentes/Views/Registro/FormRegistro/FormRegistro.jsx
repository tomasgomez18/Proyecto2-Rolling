import { zodResolver } from "@hookform/resolvers/zod";
import ValidacionesForm from "../../../Utils/ValidacionesForm";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FECHA_MAXIMA, FECHA_MINIMA } from "../../../Utils/ValidacionesForm";
import "./FormRegistro.css";

const FormRegistro = ({ onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(ValidacionesForm),
  });

  const procesarEnvio = (data) => {
    console.log("Datos válidos:", data);
    onSubmit?.(data);
  };

  return (
    <Form onSubmit={handleSubmit(procesarEnvio)}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre de Usuario</Form.Label>
        <Form.Control
          type="text"
          {...register("nombreDeUsuario")}
          isInvalid={!!errors.nombreDeUsuario}
          placeholder="Ingrese su nombre de usuario"
        />
        <Form.Control.Feedback type="invalid">
          {errors.nombreDeUsuario?.message}{" "}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          {...register("email")}
          isInvalid={!!errors.email}
          placeholder="ejemplo@correo.com"
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>País de Residencia</Form.Label>
        <Form.Select
          {...register("pais")}
          isInvalid={!!errors.pais}
          defaultValue=""
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
        <Form.Label>Fecha de Nacimiento</Form.Label>
        <Form.Control
          type="date"
          {...register("fechaNacimiento")}
          isInvalid={!!errors.fechaNacimiento}
          min={FECHA_MINIMA.toISOString().split("T")[0]} // Convierte a formato ISO-'T' lo divide en dos partes- [0] toma la primera
          max={FECHA_MAXIMA.toISOString().split("T")[0]}
        />
        <Form.Text className="text-muted">
          Debe ser entre 1945 y 2006 (18+ años)
        </Form.Text>
        <Form.Control.Feedback type="invalid">
          {errors.fechaNacimiento?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          {...register("contraseña")}
          isInvalid={!!errors.contraseña}
          placeholder="Ingrese su contraseña"
        />
        <Form.Control.Feedback type="invalid">
          {errors.contraseña?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Confirmar Contraseña</Form.Label>
        <Form.Control
          type="password"
          {...register("confirmarContraseña")}
          isInvalid={!!errors.confirmarContraseña}
          placeholder="Repita su contraseña"
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmarContraseña?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Row className="g-2">
        <Col>
          <Button
            variant="secondary"
            onClick={onClose}
            type="button"
            className="w-100"
          >
            Cancelar
          </Button>
        </Col>
        <Col>
          <Button variant="primary" type="submit" className="w-100">
            Registrarse
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormRegistro;
