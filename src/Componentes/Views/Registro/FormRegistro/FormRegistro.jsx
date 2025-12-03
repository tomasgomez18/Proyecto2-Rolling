import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import ValidacionesForm, {
  PAISES_VALIDOS,
  FECHA_MINIMA,
  FECHA_MAXIMA,
} from "../../../Utils/ValidacionesForm";
import "./FormRegistro.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const FormRegistro = ({ onSubmit, onClose }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    trigger
  } = useForm({
    resolver: zodResolver(ValidacionesForm),
    mode: "onChange"
  });

  const [caracteresUsuario, setCaracteresUsuario] = useState(0);
  const [caracteresContrasena, setCaracteresContrasena] = useState(0);
  const [caracteresConfirmar, setCaracteresConfirmar] = useState(0);
  const [caracteresEmail, setCaracteresEmail] = useState(0);

  const nombreUsuario = watch("nombreDeUsuario") || "";
  const email = watch("email") || "";
  const contrasena = watch("contrasena") || "";
  const confirmarContrasena = watch("confirmarContrasena") || "";

  useEffect(() => setCaracteresUsuario(nombreUsuario.length), [nombreUsuario]);
  useEffect(() => setCaracteresEmail(email.length), [email]);
  useEffect(() => setCaracteresContrasena(contrasena.length), [contrasena]);
  useEffect(() => setCaracteresConfirmar(confirmarContrasena.length), [confirmarContrasena]);

  const limitarCaracteres = (e, maxLength, setCaracteres) => {
    const value = e.target.value;
    if (value.length > maxLength) {
      e.target.value = value.slice(0, maxLength);
      setCaracteres(maxLength);
    } else {
      setCaracteres(value.length);
    }
  };

  const procesarEnvio = async (data) => {
    const isValid = await trigger();
    if (isValid) onSubmit?.(data);
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center py-4 py-md-5">
      <Row className="w-100 justify-content-center mx-0">
        <Col xs={12} sm={11} md={10} lg={9} xl={8} className="px-3 px-md-4">
          <Form onSubmit={handleSubmit(procesarEnvio)} className="contenedor-formulario p-4 p-md-5 rounded" noValidate>
            
            <div className="text-center mb-4">
              <h4 className="texto-dorado mb-0">{t("form.title")}</h4>
              <p className="texto-blanco mt-2 mb-0" style={{ fontSize: '0.9rem' }}>
                {t("form.subtitle")}
              </p>
            </div>

            {/* NOMBRE DE USUARIO */}
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label className="texto-dorado mb-0">
                  {t("form.username")}
                </Form.Label>
                <span className={`contador-caracteres ${caracteresUsuario === 20 ? 'maximo' : 'normal'}`}>
                  {caracteresUsuario}/20
                </span>
              </div>
              <Form.Control
                type="text"
                {...register("nombreDeUsuario")}
                maxLength={20}
                onInput={(e) => limitarCaracteres(e, 20, setCaracteresUsuario)}
                isInvalid={!!errors.nombreDeUsuario}
                placeholder={t("form.placeholderUsername")}
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombreDeUsuario?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* EMAIL */}
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label className="texto-dorado mb-0">{t("form.email")}</Form.Label>
                <span className={`contador-caracteres ${caracteresEmail === 50 ? 'maximo' : 'normal'}`}>
                  {caracteresEmail}/50
                </span>
              </div>
              <Form.Control
                type="email"
                {...register("email")}
                maxLength={50}
                onInput={(e) => limitarCaracteres(e, 50, setCaracteresEmail)}
                isInvalid={!!errors.email}
                placeholder={t("form.placeholderEmail")}
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* PAÍS */}
            <Form.Group className="mb-3">
              <Form.Label className="texto-dorado mb-2">{t("form.country")}</Form.Label>
              <Form.Select
                {...register("pais")}
                isInvalid={!!errors.pais}
                defaultValue=""
                className="entrada-personalizada"
                size="lg"
              >
                <option value="" disabled>{t("form.countrySelect")}</option>
                {PAISES_VALIDOS.map((pais) => (
                  <option key={pais} value={pais}>{pais}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.pais?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* FECHA */}
            <Form.Group className="mb-3">
              <Form.Label className="texto-dorado mb-2">{t("form.birthday")}</Form.Label>
              <Form.Control
                type="date"
                {...register("fechaNacimiento")}
                isInvalid={!!errors.fechaNacimiento}
                min={FECHA_MINIMA.toISOString().split("T")[0]}
                max={FECHA_MAXIMA.toISOString().split("T")[0]}
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.fechaNacimiento?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* CONTRASEÑA */}
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label className="texto-dorado mb-0">{t("form.password")}</Form.Label>
                <span className={`contador-caracteres ${caracteresContrasena === 50 ? 'maximo' : 'normal'}`}>
                  {caracteresContrasena}/50
                </span>
              </div>
              <Form.Control
                type="password"
                {...register("contrasena")}
                maxLength={50}
                onInput={(e) => limitarCaracteres(e, 50, setCaracteresContrasena)}
                isInvalid={!!errors.contrasena}
                placeholder={t("form.placeholderPassword")}
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.contrasena?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* CONFIRMAR CONTRASEÑA */}
            <Form.Group className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label className="texto-dorado mb-0">{t("form.confirmPassword")}</Form.Label>
                <span className={`contador-caracteres ${caracteresConfirmar === 50 ? 'maximo' : 'normal'}`}>
                  {caracteresConfirmar}/50
                </span>
              </div>
              <Form.Control
                type="password"
                {...register("confirmarContrasena")}
                maxLength={50}
                onInput={(e) => limitarCaracteres(e, 50, setCaracteresConfirmar)}
                isInvalid={!!errors.confirmarContrasena}
                placeholder={t("form.placeholderConfirmPassword")}
                className="entrada-personalizada"
                size="lg"
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmarContrasena?.message}
              </Form.Control.Feedback>

              {contrasena && confirmarContrasena && contrasena !== confirmarContrasena && (
                <Form.Text className="text-danger d-block mt-1">
                  {t("form.passwordMismatch")}
                </Form.Text>
              )}
            </Form.Group>

            {/* BOTONES */}
            <Row className="g-3 mt-4">
              <Col xs={12} sm={6}>
                <Button
                  variant="outline-light"
                  onClick={onClose}
                  type="button"
                  className="w-100 py-3 boton-personalizado boton-cancelar"
                  disabled={isSubmitting}
                >
                  {t("form.cancel")}
                </Button>
              </Col>

              <Col xs={12} sm={6}>
                <Button 
                  variant="warning" 
                  type="submit" 
                  className="w-100 py-3 boton-personalizado boton-enviar"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? t("form.registering") : t("form.register")}
                </Button>
              </Col>
            </Row>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormRegistro;