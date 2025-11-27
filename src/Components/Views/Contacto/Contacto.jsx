const Contacto = () => {
    return (
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
                    backdropFilter: "blur(6px)"
                }}
            >
                <div

                    className="col-12 col-md-6 text-white d-flex flex-column justify-content-center p-5"
                    style={{
                        backdropFilter: "blur(4px)",
                    }

                    }
                >
                    <h2 className="fw-bold mb-3" >ROLLING MOTORS</h2>
                </div>
                <div
                    className="col-12 col-md-6 bg-dark d-flex flex-column justify-content-center p-5"
                    style={{
                        background: "rgba(0, 0, 0, 0.65)",
                        backdropFilter: "blur(6px)",
                        color: "white"
                    }}
                >
                    <h3 className="fw-bold mb-4 text-center">Datos de Contacto</h3>
                    <input
                        type="text"
                        placeholder="Nombre"
                        className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                    />
                    <input
                        type="Apellido"
                        placeholder="Apellido"
                        className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                    />
                    <input
                        type="Telefono"
                        placeholder="Telefono"
                        className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                    />
                    <input
                        type="Email"
                        placeholder="Email"
                        className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                    />
                    <input
                        type="Provincia"
                        placeholder="Provincia"
                        className="form-control bg-transparent border-0 border-bottom text-white mb-4 rounded-0"
                    />
                    { }
                    <button className="btn w-100 py-2 mt-2"
                        style={{
                            backgroundColor: "#eee605ff",
                            color: "black",
                            fontWeight: "600"
                        }} >Enviar</button>


                </div>
            </div>
        </div>
    );
};

export default Contacto;


