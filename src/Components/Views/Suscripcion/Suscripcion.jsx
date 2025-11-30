import React, { useState, useRef } from "react";
import "./Suscripcion.css";



export default function Suscripcion() {
  const form = useRef();
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [errores, setErrores] = useState({ nombre: "", apellido: "", email: "" });
  const [errorGeneral, setErrorGeneral] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const nombre = formData.get("user_name").trim();
    const apellido = formData.get("last_name").trim();
    const email = formData.get("user_email").trim();

    let nuevoErrores = {};
    let camposVacios = false;

    if (!nombre) { nuevoErrores.nombre = "Por favor ingresa tu nombre."; camposVacios = true; }
    if (!apellido) { nuevoErrores.apellido = "Por favor ingresa tu apellido."; camposVacios = true; }
    if (!email) { nuevoErrores.email = "Ingresa tu correo electrónico."; camposVacios = true; }
    else if (!/^[^\s@]+@gmail\.com$/i.test(email)) nuevoErrores.email = "Solo se permiten correos Gmail.";

    setErrores(nuevoErrores);

    if (camposVacios) {
      setErrorGeneral("Por favor, completa todos los campos correctamente.");
      return;
    } else {
      setErrorGeneral("");
    }

    setMensajeEnviado(true);
    form.current.reset();
    setErrores({ nombre: "", apellido: "", email: "" });
  };

  const renderError = (mensaje) => mensaje ? <div className="error">{mensaje}</div> : null;



return (
    <div className="form-container">
        <form ref={form} className="subscription-form" onSubmit={handleSubmit}>
            <h2>Suscribete a Rolling Motors</h2>

            <input
                type="text"
                name="user_name"
                placeholder="Nombre"
            />
            {renderError(errores.nombre)}

            <input
                type="text"
                name="last_name"
                placeholder="Apellido"
            />
            {renderError(errores.apellido)}

            <input
                type="email"
                name="user_email"
                placeholder="Correo Gmail"
            />
            {renderError(errores.email)}

            <button type="submit">Suscribirme</button>
            {errorGeneral && <div className="errorGeneral">{errorGeneral}</div>}
        </form>

        {mensajeEnviado && (
            <div className="mensaje-enviado">
                <div className="mensaje-contenedor">
                    <h3>✔ Mensaje enviado</h3>
                    <p>Gracias por suscribirte.</p>
                    <button onClick={() => setMensajeEnviado(false)}>Cerrar</button>
                </div>
            </div>
        )}
    </div>
); }
