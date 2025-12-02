import React from "react";
import { useNavigate } from "react-router-dom";
import "./Nosotros.css";

const Nosotros = () => {
  const navigate = useNavigate();

  const handleContactoClick = () => {
    navigate("/404");
  };

  return (
    <section className="nosotros-section">
      <div className="barra-superior-nosotros">
        <div className="contenido-barra">
          <h1 className="titulo-principal-nosotros">ROLLING MOTORS</h1>
          <p className="subtitulo-nosotros">Pasión sobre ruedas desde 2010</p>
          <div className="linea-divisora-dorada"></div>
        </div>
      </div>

      <div className="nosotros-container">
        <div className="info-card">
          <div className="encabezado-card">
            <div className="icono-encabezado">🏍️</div>
            <h2 className="card-title">NUESTRA HISTORIA</h2>
            <div className="linea-decorativa"></div>
          </div>

          <div className="contenido-card">
            <div className="seccion-historia">
              <div className="icono-seccion">📜</div>
              <h3 className="small-title">Nacimiento de una Pasión</h3>
              <p className="texto-descripcion">
                En el año 2010, cuatro amigos apasionados por el rugido de los
                motores y la elegancia atemporal decidieron convertir su sueño
                en realidad. Así nació{" "}
                <span className="texto-destacado">Rolling Motors</span>, un
                santuario para aquellos que buscan más que una motocicleta:
                buscan una experiencia, una extensión de su personalidad.
              </p>
            </div>

            <div className="grid-doble">
              <div className="tarjeta-valor">
                <div className="icono-tarjeta">🎯</div>
                <h3 className="small-title">Nuestra Misión</h3>
                <p className="texto-tarjeta">
                  Brindar motocicletas premium con atención personalizada,
                  creando relaciones duraderas basadas en la confianza y la
                  excelencia en cada interacción.
                </p>
              </div>

              <div className="tarjeta-valor">
                <div className="icono-tarjeta">👁️</div>
                <h3 className="small-title">Nuestra Visión</h3>
                <p className="texto-tarjeta">
                  Ser líderes indiscutidos en el mercado de motos premium,
                  reconocidos por nuestra pasión, compromiso y la comunidad de
                  riders que hemos construido.
                </p>
              </div>
            </div>

            <div className="seccion-valores">
              <div className="encabezado-seccion">
                <div className="icono-seccion">⭐</div>
                <h3 className="small-title">Nuestros Valores Fundamentales</h3>
              </div>
              <div className="valores-grid">
                <div className="valor-item">
                  <span className="icono-valor">❤️</span>
                  <div>
                    <h4 className="nombre-valor">PASIÓN</h4>
                    <p className="descripcion-valor">
                      Vivimos y respiramos motocicletas
                    </p>
                  </div>
                </div>
                <div className="valor-item">
                  <span className="icono-valor">⚙️</span>
                  <div>
                    <h4 className="nombre-valor">INNOVACIÓN</h4>
                    <p className="descripcion-valor">
                      Siempre buscando lo mejor para nuestros clientes
                    </p>
                  </div>
                </div>
                <div className="valor-item">
                  <span className="icono-valor">🤝</span>
                  <div>
                    <h4 className="nombre-valor">HONESTIDAD</h4>
                    <p className="descripcion-valor">
                      Transparencia en cada transacción
                    </p>
                  </div>
                </div>
                <div className="valor-item">
                  <span className="icono-valor">🏆</span>
                  <div>
                    <h4 className="nombre-valor">EXCELENCIA</h4>
                    <p className="descripcion-valor">
                      Calidad suprema en cada detalle
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="seccion-logros">
              <div className="encabezado-seccion">
                <div className="icono-seccion">🏆</div>
                <h3 className="small-title">Logros Destacados</h3>
              </div>
              <div className="logros-grid">
                <div className="logro-item">
                  <div className="numero-logro">2015</div>
                  <h4 className="titulo-logro">Concesionario del Año</h4>
                  <p className="descripcion-logro">
                    Premio Royal Enfield Argentina
                  </p>
                </div>
                <div className="logro-item">
                  <div className="numero-logro">500+</div>
                  <h4 className="titulo-logro">Motos Vendidas</h4>
                  <p className="descripcion-logro">
                    Familias felices en la ruta
                  </p>
                </div>
                <div className="logro-item">
                  <div className="numero-logro">98%</div>
                  <h4 className="titulo-logro">Satisfacción</h4>
                  <p className="descripcion-logro">Clientes satisfechos</p>
                </div>
                <div className="logro-item">
                  <div className="numero-logro">13</div>
                  <h4 className="titulo-logro">Años de Experiencia</h4>
                  <p className="descripcion-logro">
                    Desde 2010 sirviendo a riders
                  </p>
                </div>
              </div>
            </div>

            <div className="cita-inspiradora">
              <div className="comillas">"</div>
              <p className="texto-cita">
                No vendemos motocicletas, compartimos un estilo de vida. Cada
                Royal Enfield que sale de nuestro concesionario lleva consigo la
                esencia de la libertad, la tradición y la pasión por el camino.
              </p>
              <p className="autor-cita">— Fundadores de Rolling Motors</p>
            </div>
          </div>
        </div>

        <div className="tarjeta-contacto">
          <h3 className="titulo-contacto">¿Listo para unirte a la familia?</h3>
          <p className="texto-contacto">
            Visítanos en nuestro showroom o contáctanos para una experiencia
            personalizada.
          </p>
          <button className="boton-contacto" onClick={handleContactoClick}>
            Contáctanos
          </button>
        </div>
      </div>
    </section>
  );
};

export default Nosotros;
