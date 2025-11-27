import Form from 'react-bootstrap/Form';


const Contacto = () => {

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
                        width: "85%",
                        maxWidth: "1100px",
                        background: "rgba(0, 0, 0, 0.4)",
                        backdropFilter: "blur(6px)",
                        border: "3px solid yellow",
                        borderRadius: "15px"
                    }}
                >
                    <div

                        className=" col-12 col-md-6 text-white d-flex flex-column justify-content-center p-5"
                        style={{
                            backdropFilter: "blur(4px)",
                        }

                        }
                    >
                        <h2 className="fw-bold mb-3" >ROLLING MOTORS</h2>
                    </div>
                    <form 
                        className=" col-12 col-md-6 bg-dark d-flex flex-column justify-content-center p-5"
                        style={{
                            background: "rgba(130, 96, 96, 0.65)",
                            backdropFilter: "blur(6px)",
                            color: "white"
                        }}
                    >
                        <h3 className="fw-bold mb-4 text-center">Datos de Contacto</h3>
                        <div></div>
                        <input type="text" placeholder="Nombre" name='Nombre' id='Nombre'
                            className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                        />
                        <input type="Apellido" placeholder="Apellido" name='Apellido' id='Apellido'
                            className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                        />
                        <input type="Telefono" placeholder="Telefono" name='Telefono' id='Telefono'
                            className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                        />
                        <input type="Email" placeholder="Email" name='Email' id='Email'
                            className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                        />
                        <Form.Control
                            name='Mensaje'
                            id='Mensaje'
                            as="textarea"
                            rows={3}
                            placeholder="Mensaje"
                            className="bg-transparent text-white border-0 border-bottom rounded-0 mb-4"
                        />




                        { }
                        <button className="btn w-100 py-2 mt-2" type='submit' id='button' value={"Enviar"}

                            style={{
                                backgroundColor: "#eee605ff",
                                color: "black",
                                fontWeight: "600"
                            }} >Enviar</button>
                    </form>
                </div>
            </div>

            <div className="container mt-5 mb-5">
                <div
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
            </div>
        </>

    );
};

export default Contacto;






