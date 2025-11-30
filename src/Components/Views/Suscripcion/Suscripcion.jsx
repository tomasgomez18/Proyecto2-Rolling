import React, { useState, useRef } from "react";
import "./Suscripcion.css";
import emailjs from "@emailjs/browser";
import { Toaster } from "react-hot-toast";

const Suscripcion = () => {
  const form = useRef();
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [errores, setErrores] = useState({ nombre: "", apellido: "", email: "" });
  const [errorGeneral, setErrorGeneral] = useState("");

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

  return (
    <>
      <Toaster position="top-right" />
      <div className="form-container">
        <form ref={form} onSubmit={sendEmail} className="subscription-form">
          <h2 className="suscribete ">Suscríbete</h2>

          <input type="text" name="user_name" placeholder="Nombre" />
          {renderError(errores.nombre)}

          <input type="text" name="last_name" placeholder="Apellido" />
          {renderError(errores.apellido)}

          <input type="email" name="user_email" placeholder="Correo Gmail" />
          {renderError(errores.email)}

          {errorGeneral && <div className="errorGeneral animar-error">{errorGeneral}</div>}

          <button type="submit">Suscribirme</button>

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
    </>
  );
};

export default Suscripcion;
