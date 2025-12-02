import { useState } from "react";
import "./Galeria.css";

const imagenes = [
  {
    url: "https://images.pexels.com/photos/17625723/pexels-photo-17625723.jpeg",
    texto: "IF THE COUNTRYSIDE SEEMS BORING, STOP. GET OFF YOUR BIKE...",
  },
  {
    url: "https://images.pexels.com/photos/17624064/pexels-photo-17624064.jpeg",
    texto: "EVERY ROAD HAS A STORY. LIVE IT WITH ROYAL ENFIELD.",
  },
  {
    url: "https://images.pexels.com/photos/15440694/pexels-photo-15440694.jpeg",
    texto: "BUILT FOR ALL ROADS — BUILT FOR ALL JOURNEYS.",
  },
];

const Galeria = () => {
  const [index, setIndex] = useState(0);

  const siguiente = () => {
    setIndex((prev) => (prev + 1) % imagenes.length);
  };

  const anterior = () => {
    setIndex((prev) => (prev - 1 + imagenes.length) % imagenes.length);
  };

  const indexPrev = (index - 1 + imagenes.length) % imagenes.length;
  const indexNext = (index + 1) % imagenes.length;

  return (
    <div className="galeria-container mt-5 py-5">
      <h2 className="galeria-titulo">BUILT FOR ALL ROADS</h2>

      <div className="galeria-wrapper">

        <div className="galeria-lateral izquierda">
          <img src={imagenes[indexPrev].url} alt="previa" />
        </div>

        <div className="galeria-central">
          <button className="galeria-btn left" onClick={anterior}>
            ❮
          </button>

          <img src={imagenes[index].url} alt="principal" />

          <button className="galeria-btn right" onClick={siguiente}>
            ❯
          </button>

          <p className="galeria-texto">{imagenes[index].texto}</p>
        </div>

        <div className="galeria-lateral derecha">
          <img src={imagenes[indexNext].url} alt="siguiente" />
        </div>

      </div>
    </div>
  );
};

export default Galeria;
