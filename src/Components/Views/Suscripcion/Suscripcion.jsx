import React, { useState, useRef } from "react";
import "./Suscripcion.css";



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
);

