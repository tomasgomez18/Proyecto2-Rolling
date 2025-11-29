import Form from 'react-bootstrap/Form';
import emailjs from '@emailjs/browser';
import { useRef, useState } from "react";

import './Contacto.css';




const Contacto = () => {

    const form = useRef();
    const [mensajeEnviado, setMensajeEnviado] = useState(false);


    const sendEmail = (e) => {
        e.preventDefault();

        const formData = new FormData(form.current);
        const nombre = formData.get("user_name").trim();
        const apellido = formData.get("last_name").trim();
        const telefono = formData.get("user_phone").trim();
        const email = formData.get("user_email").trim();
        const mensaje = formData.get("message").trim();


        /* if (!nombre || !apellido || !telefono || !email || !mensaje) {
             alert("Por favor, completa todos los campos.");
             return;
         } */

        if (nombre.length <= 3) {
            alert("El nombre debe tener más de 3 caracteres.");
            return;
        }

        if (apellido.length <= 3) {
            alert("El apellido debe tener más de 3 caracteres.");
            return;
        }
        if (!/^\d+$/.test(telefono)) {
            alert("El teléfono solo puede contener números.");
            return;
        }




        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("El email no es válido.");
            return;
        }

        if (mensaje.length > 50) {
            alert("El mensaje no puede superar los 200 caracteres.");
            return;
        }

        emailjs
            .sendForm(
                "service_2huncds",
                "template_wt8nir8",
                form.current,
                { publicKey: "4NhIAIqJh5mY2AI9S" }
            )
            .then(() => {
                setMensajeEnviado(true); // muestra el modal
                form.current.reset();
            })



            .catch((error) => console.error(error));
    };




    return (
        <>
            <div
                className="container d-flex justify-content-center align-items-center min-vh-100"
                style={{
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "20px",
                }}
            >
                <div
                    className="row shadow-lg rounded-4 overflow-hidden"
                    style={{
                        width: "75%",
                        maxWidth: "800px",
                        background: "rgba(0, 0, 0, 0.4)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid yellow",
                        borderRadius: "15px"
                    }}
                >
                    <div

                        className=" col-12 col-md-6 text-white d-flex flex-column justify-content-center p-5"
                        style={{
                            background: "rgba(0, 0, 0, 0.4)",
                            backdropFilter: "blur(6px)",
                            color: "white",
                        }}
                    >
                        <h2 className="titulo-glow">Rolling Motors</h2>
                    </div>
                    <form
                        ref={form}
                        onSubmit={sendEmail}
                        className="col-12 col-md-6 d-flex flex-column justify-content-center p-5"
                        style={{
                            background: "rgba(0, 0, 0, 0.4)",
                            backdropFilter: "blur(6px)",
                            color: "white",
                        }}
                    >
                        <h5 className="titulo-glow2 pb-3 ">Datos de Contacto</h5>
                        <input
                            id='nombre'
                            type="text"
                            placeholder="Nombre"
                            name="user_name"
                            className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                        />
                        <input
                            id='apellido'

                            type="text"
                            placeholder="Apellido"
                            name="last_name"
                            className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                        />
                        <input
                            type="tel"
                            placeholder="Telefono"
                            name="user_phone"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                        />
                        <input
                            id='email'

                            type="email"
                            placeholder="Email"
                            name="user_email"
                            className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                        />
                        <Form.Control
                            id='mensaje'

                            as="textarea"
                            rows={3}
                            placeholder="Mensaje"
                            name="message"
                            className="bg-transparent text-white border-0 border-bottom rounded-0 mb-4"
                        />
                        <button
                            className="btn w-100 py-2 mt-2 boton-animado"
                            type="submit"
                            style={{
                                background: "rgba(0, 0, 0, 0.4)",
                                backdropFilter: "blur(6px)",
                                border: "1px solid #eee605ff",
                                boxShadow: "0 0 8px #eee60555",
                                color: "white",
                                fontWeight: "600",
                            }}
                        >Enviar</button>


                        {mensajeEnviado && (
                            <div
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(0,0,0,0.6)",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 9999,
                                }}
                            >
                                <div
                                    style={{
                                        background: "#000",
                                        backdropFilter: "blur(6px)",
                                        border: "1px solid #eee605ff",
                                        borderRadius: "10px",
                                        padding: "20px",
                                        textAlign: "center",
                                        color: "white",
                                        width: "90%",
                                        maxWidth: "400px",
                                        boxSizing: "border-box",
                                        animation: "zoomIn 0.3s ease-out",
                                    }}
                                >

                                    <h3 style={{ textShadow: "0 0 5px #eee605" }}>✔ Mensaje enviado</h3>
                                    <p>Gracias por contactarnos, te responderemos pronto.</p>
                                    <button
                                        onClick={() => setMensajeEnviado(false)}
                                        style={{
                                            marginTop: "15px",
                                            padding: "10px 15px",
                                            width: "80%",
                                            maxWidth: "200px",
                                            background: "rgba(0, 0, 0, 0.4)",
                                            backdropFilter: "blur(6px)",
                                            border: "1px solid #eee605ff",
                                            boxShadow: "0 0 8px #eee60555",
                                            color: "white",
                                            fontWeight: "600",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Cerrar
                                    </button>

                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div >

            <div className="container d-flex justify-content-center mt-4">
                <div className="map-container-custom">
                    <div className="map-dark-overlay"></div>

                    <iframe
                        title="Rolling Motors - Ubicación"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.716108013208!2d-65.21060062485453!3d-26.830367590044737!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f18!3m3!1m2!1s0x94225c128505d1c7%3A0x76c7e1982e4797d1!2sGral.%20Paz%20576%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1701123456789"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
            <div className="container mt-4 d-flex justify-content-center">
                <div
                    style={{
                        width: "75%",
                        maxWidth: "800px",
                        color: "white",
                        textAlign: "center",
                    }}
                >
                    <h3 className="fw-bold mb-3">HORARIOS</h3>

                    <h5 className="fw-semibold mb-1">Lunes a Viernes</h5>
                    <p className="m-0">09:00 a 12:00</p>
                    <p className="m-0">17:00 a 20:00</p>

                    <h5 className="fw-semibold mt-3 mb-1">Sábados</h5>
                    <p className="m-0">09:00 a 13:00</p>


                    <h4 className="fw-bold mt-4 mb-3">Contacto</h4>

                    <div className="d-flex flex-column align-items-center pb-4">
                        <img
                            src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&format=png&color=0-0-0&data=https://wa.me/5493813199018"
                            alt="QR WhatsApp"
                            className="img-fluid"

                            style={{
                                width: "130px",
                                backdropFilter: "blur(6px)",
                                border: "1px solid #eee605ff",
                                boxShadow: "0 0 8px #eee60555",
                                color: "white",
                            }}

                        />
                        <p className="mb-2 pt-3">Escaneá el QR para contactarnos por WhatsApp</p>

                        <p className="mb-0 ">📩 <strong>Email:</strong> Ianierogiovanna@gmail.com</p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Contacto;




