import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import * as topojson from "topojson-client";
import paisesCoordenadas from "../../Componentes/Utils/CoordenadasPaises";

const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MapaUsuarios = () => {
  const [geografias, setGeografias] = useState([]);

  useEffect(() => {
    fetch(GEO_URL)
      .then((response) => response.json())
      .then((data) => {
        const geo = data.objects.countries;
        const geoConverted = topojson.feature(data, geo).features;
        setGeografias(geoConverted);
      })
      .catch((error) => console.error("Error cargando mapa:", error));
  }, []);

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Mapa de Usuarios Registrados
      </h2>

      <ComposableMap projection="geoMercator">
        <Geographies geography={geografias}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#D6D6DA",
                    outline: "none",
                  },
                  hover: {
                    fill: "#A1A1A1",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>

 
        {usuarios.map((user, index) => {
          const pais = user.pais;
          const coord = paisesCoordenadas[pais];

          if (!coord) return null; 

          return (
            <Marker key={index} coordinates={coord}>
              <circle r={5} fill="#ff0000" stroke="#fff" strokeWidth={1.5} />
              <text
                textAnchor="middle"
                y={-10}
                style={{ fontFamily: "Arial", fontSize: 10, fill: "#333" }}
              >
                {user.nombre}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
};

export default MapaUsuarios;
