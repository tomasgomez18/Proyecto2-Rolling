import React, { useState, useRef } from "react";
import "./Suscripcion.css";
import emailjs from "@emailjs/browser";
import { Toaster } from "react-hot-toast";
import { Modal, Button } from "react-bootstrap";
import { CircleDashed } from "lucide-react";


const Suscripcion = () => {
    const form = useRef();
    const [mensajeEnviado, setMensajeEnviado] = useState(false);
    const [errores, setErrores] = useState({ nombre: "", apellido: "", email: "" });
    const [errorGeneral, setErrorGeneral] = useState("");
    const [showPremium, setShowPremium] = useState(false);
    const [metodoPago, setMetodoPago] = useState("");
    const [numeroTarjeta, setNumeroTarjeta] = useState("");
    const [aceptaLegal, setAceptaLegal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);
        const nombre = formData.get("user_name").trim();
        const apellido = formData.get("last_name").trim();
        const email = formData.get("user_email").trim();

        let nuevoErrores = {};
        let camposVacios = false;

        if (!nombre) {
            nuevoErrores.nombre = "Por favor ingresa tu nombre.";
            camposVacios = true;
        } else if (nombre.length < 3) {
            nuevoErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
            camposVacios = true;
        } else if (nombre.length > 12) {
            nuevoErrores.nombre = "El nombre no puede superar los 12 caracteres.";
            camposVacios = true;
        }

        if (!apellido) {
            nuevoErrores.apellido = "Por favor ingresa tu apellido.";
            camposVacios = true;
        } else if (apellido.length < 3) {
            nuevoErrores.apellido = "El apellido debe tener al menos 3 caracteres.";
            camposVacios = true;
        } else if (apellido.length > 12) {
            nuevoErrores.apellido = "El apellido no puede superar los 12 caracteres.";
            camposVacios = true;
        }

        if (!email) {
            nuevoErrores.email = "Por favor ingresa tu correo Gmail.";
            camposVacios = true;
        } else if (!/^[^\s@]+@gmail\.com$/i.test(email)) {
            nuevoErrores.email = "Solo se permiten correos Gmail.";
            camposVacios = true;
        }

        setErrores(nuevoErrores);

        if (camposVacios) {
            setErrorGeneral("Por favor completa todos los campos correctamente.");
            return;
        } else {
            setErrorGeneral("");
        }

        emailjs.sendForm(
            "service_2huncds",
            "template_wt8nir8",
            form.current,
            { publicKey: "4NhIAIqJh5mY2AI9S" }
        )
            .then(() => {
                setMensajeEnviado(true);
                form.current.reset();
                setErrores({ nombre: "", apellido: "", email: "" });
            })
            .catch((err) => console.error(err));
    };

    const renderError = (mensaje) =>
        mensaje ? <div className="error animar-error">{mensaje}</div> : null;

    const confirmarSuscripcion = () => {
        setShowPremium(false);
        setShowConfirm(true);
        setMetodoPago("");
        setNumeroTarjeta("");
        setAceptaLegal(false);
    };


    const handleNumeroTarjeta = (e) => {
        let value = e.target.value;
        value = value.replace(/\s+/g, '');
        value = value.replace(/\D/g, '');
        value = value.slice(0, 16);
        value = value.replace(/(.{4})/g, '$1 ').trim();

        setNumeroTarjeta(value);
    };

    return (
        <>
            <Toaster position="top-right" />
            <div className="form-container">
                <form ref={form} onSubmit={sendEmail} className="subscription-form">
                    <h2 className="suscribete" style={{ color: "black", display: "flex", alignItems: "center" }}>
                        Suscríbete a Rolling Motors
                        <CircleDashed
                            size={24}
                            strokeWidth={2}
                            style={{ marginLeft: "8px", color: "black" }}
                        />
                    </h2>

                    <input type="text" name="user_name" placeholder="Nombre" />
                    {renderError(errores.nombre)}

                    <input type="text" name="last_name" placeholder="Apellido" />
                    {renderError(errores.apellido)}

                    <input type="email" name="user_email" placeholder="Gmail" />
                    {renderError(errores.email)}

                    {errorGeneral && <div className="errorGeneral animar-error">{errorGeneral}</div>}

                    <button type="submit">Suscribirme</button>

                    <button
                        type="button"
                        className="btn-premium"
                        onClick={() => setShowPremium(true)}
                    >
                        Suscripción Premium
                    </button>

                    {mensajeEnviado && (
                        <div className="mensaje-enviado animar-mensaje">
                            <div className="mensaje-contenedor">
                                <h3>✔ Mensaje enviado</h3>
                                <p>Gracias por suscribirte, te contactaremos pronto.</p>
                                <button onClick={() => setMensajeEnviado(false)}>Cerrar</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
            <Modal
                show={showPremium}
                onHide={() => setShowPremium(false)}
                centered
                backdrop="static"
            >
                <div style={{
                    background: "rgba(0,0,0,0.7)",
                    color: "#f5f5dc",
                    borderRadius: "10px",
                    padding: "20px",
                    backdropFilter: "blur(10px)"
                }}>
                    <Modal.Header closeButton closeVariant="white">
                        <Modal.Title style={{ color: "black", fontWeight: "bold" }}>
                            Suscripción Premium <span style={{ color: "#eee605" }}>VIP 🛞</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 className="" style={{ color: "black", fontWeight: "bold" }}>
                            Beneficios Exclusivos:
                        </h5>
                        <ul>
                            <li>⭐ Acceso a ofertas flash</li>
                            <li>⭐ Descuentos exclusivos del 20%</li>
                            <li>⭐ Envíos prioritarios</li>
                        </ul>
                        <hr style={{ borderColor: "#f5f5dc55" }} />
                        <h6>Método de pago:</h6>
                        <select
                            value={metodoPago}
                            onChange={(e) => setMetodoPago(e.target.value)}
                            style={{
                                background: "rgba(0, 0, 0, 0.4)",
                                color: "#ffffff",
                                border: "1px solid #eee605",
                                backdropFilter: "blur(6px)",
                                padding: "12px",
                                borderRadius: "8px",
                                width: "100%"
                            }}
                        >
                            <option value="" disabled>Selecciona un método</option>
                            <option value="tarjeta">Tarjeta de crédito</option>
                            <option value="paypal">PayPal</option>
                            <option value="transferencia">Transferencia bancaria</option>
                        </select>
                        {metodoPago === "tarjeta" && (
                            <input
                                type="text"
                                value={numeroTarjeta}
                                onChange={handleNumeroTarjeta}
                                maxLength={19}  // 16 dígitos + espacios
                                placeholder="Número de tarjeta"
                                style={{
                                    width: "100%",
                                    marginTop: "10px",
                                    padding: "8px",
                                    borderRadius: "5px"
                                }}
                            />
                        )}
                        <div className="mt-3">
                            <input
                                type="checkbox"
                                id="legales"
                                checked={aceptaLegal}
                                onChange={(e) => setAceptaLegal(e.target.checked)}
                            />
                            <label htmlFor="legales" style={{ marginLeft: "8px" }}>
                                Acepto los términos y condiciones
                            </label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            style={{ backgroundColor: "#000", color: "#fff", border: "none" }}
                            onClick={() => setShowPremium(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="warning"
                            style={{ color: "black", fontWeight: "bold" }}
                            disabled={
                                !aceptaLegal ||
                                !metodoPago ||
                                (metodoPago === "tarjeta" && numeroTarjeta.replace(/\s+/g, '').length !== 16)
                            }

                            onClick={confirmarSuscripcion}
                        >
                            Confirmar Suscripción
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
            <Modal
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                centered
                backdrop="static"
            >
                <div style={{
                    background: "rgba(25, 24, 24, 0.8)",
                    color: "#f5f5dc",
                    borderRadius: "10px",
                    padding: "20px",
                    backdropFilter: "blur(10px)",
                    textAlign: "center"
                }}>
                    <Modal.Body>
                        <h4>
                            ¡Suscripción Premium <span style={{ color: "#eee605", fontWeight: "bold" }}>confirmada</span>!
                        </h4>

                        <p>Gracias por suscribirte a nuestro plan VIP.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            style={{ backgroundColor: "#000", color: "#fff", border: "none" }}
                            onClick={() => setShowConfirm(false)}
                        >
                            Cerrar
                        </Button>

                    </Modal.Footer>
                </div>
            </Modal>
        </>
    );
};

export default Suscripcion;
