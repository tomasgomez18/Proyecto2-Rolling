import Form from 'react-bootstrap/Form';
import emailjs from '@emailjs/browser';
import React, { useRef } from 'react';
import './Contacto.css';


const Contacto = () => {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm("service_2huncds", "template_wt8nir8", form.current, {
                publicKey: "4NhIAIqJh5mY2AI9S",
            })

            .then(
                () => {
                    console.log("SUCCESS!");
                },
                (error) => {
                    console.log("FAILED...", error.text);
                }
            );
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


                            type="text"
                            placeholder="Nombre"
                            name="user_name"
                            className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                        />
                        <input

                            type="text"
                            placeholder="Apellido"
                            name="last_name"
                            className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                        />
                        <input

                            type="text"
                            placeholder="Telefono"
                            name="user_phone"
                            className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                        />
                        <input

                            type="email"
                            placeholder="Email"
                            name="user_email"
                            className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                        />
                        <Form.Control

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
                    </form>
                </div>
            </div >
            <div className="container d-flex justify-content-center mt-5">
                <div className="row shadow-lg rounded-4 overflow-hidden"
                    style={{
                        width: "75%",
                        maxWidth: "800px",
                        background: "rgba(0, 0, 0, 0.4)",
                        border: "2px dashed yellow",
                        borderRadius: "15px",
                        height: "350px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "white",
                    }}
                >
                    Aquí irá el mapa
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

                    <div className="d-flex flex-column align-items-center">
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




                        <p className="mb-2">Escaneá el QR para contactarnos por WhatsApp</p>

                        <p className="mb-0">✉️ <strong>Email:</strong> Ianierogiovanna@gmail.com</p>
                    </div>



                </div>
            </div>


        </>
    );
};

export default Contacto;






