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
                publicKey: "4nhIAIqJh5mY2AI9s",
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
                    padding: "40px",
                }}
            >
                <div
                    className="row shadow-lg rounded-4 overflow-hidden"
                    style={{
                        width: "75%",
                        maxWidth: "800px",
                        background: "rgba(0, 0, 0, 0.4)",
                        backdropFilter: "blur(6px)",
                        border: "3px solid yellow",
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
                        >
                            Enviar
                        </button>
                    </form>

                </div>
            </div >

            <div className="container col- 12 mt-5 mb-5">
                <div className='col-6 text-center '
                    style={{
                        maxWidth: "500px",
                        border: "3px white solid",
                        borderRadius: "10px",
                        padding: "20px"
                    }}
                >

                    <div className="d-flex align-items-center text-white mb-3 flex-wrap">

                        <span className="fw-semibold me-3" style={{ whiteSpace: "nowrap" }}>
                            LUNES A VIERNES
                        </span>
                        <div
                            style={{
                                flexGrow: 1,
                                height: "2px",
                                backgroundColor: "white",
                                opacity: 0.5
                            }}
                        ></div>
                        <span className="fw-bold ms-3" style={{ whiteSpace: "nowrap" }}>
                            10:00 / 19:00
                        </span>
                    </div>
                    <div className="d-flex align-items-center text-white mb-3 flex-wrap">
                        <span className="fw-semibold me-3" style={{ whiteSpace: "nowrap" }}>
                            SÁBADOS
                        </span>
                        <div
                            style={{
                                flexGrow: 1,
                                height: "2px",
                                backgroundColor: "white",
                                opacity: 0.5
                            }}
                        ></div>
                        <span className="fw-bold ms-3" style={{ whiteSpace: "nowrap" }}>
                            10:00 / 18:00
                        </span>
                    </div>

                </div>
                <div className='col-' style={{
                    maxWidth: "500px",
                    border: "3px white solid",
                    borderRadius: "10px",
                    padding: "20px",
                    marginLeft: "auto",
                    marginRight: "20px"  // opcional
                }}
                >
                    <div className="d-flex align-items-center text-white mb-3 flex-wrap">
                        <p>METODOS DE CONTACTO</p>

                    </div>

                </div>
            </div>
        </>
    );
};

export default Contacto;






