import React from 'react';
import './DetalleProducto.css';

const DetalleProducto = ({
  marca = "Royal Enfield",
  modelo = "Classic 350",
  año = 2020,
  precio = "450.000",
  imagen = "https://images.pexels.com/photos/5192876/pexels-photo-5192876.jpeg",
  kilometros = "12.000",
  ubicacion = "Buenos Aires, AR",
  descripcion = "Esta motocicleta Royal Enfield Classic 350 es un verdadero ícono del motociclismo clásico. Conserva todo el carácter y la esencia de las motos británicas originales, combinado con la confiabilidad moderna.",
  descripcionCompleta = "La Royal Enfield Classic 350 2020 se presenta en excelente estado de conservación. Cuenta con mantenimiento al día en taller oficial, todos sus servicios realizados en tiempo y forma. La moto conserva su color original rojo y negro con detalles cromados impecables. Incluye documentación completa al día y está lista para transferir. Único dueño, siempre guardada en garage. Perfecta para coleccionistas y amantes de las motos clásicas.",
  caracteristicas = [
    "Motor monocilíndrico 346cc",
    "Arranque eléctrico y a patada",
    "Frenos a disco delantero y tambor trasero",
    "Suspensión telescópica delantera",
    "Asiento individual clásico",
    "Escape cromado original",
    "Cuadro de doble cuna",
    "Llantas de rayos"
  ],
  stock = true
}) => {
  return (
    <div className="detalle-producto-container">
      <div className="detalle-producto">
        {/* Barra superior */}
        <div className="barra-superior-detalle"></div>
        
        <div className="contenido-detalle">
          {/* Imagen principal */}
          <div className="contenedor-imagen-detalle">
            <img 
              src={imagen} 
              alt={`${marca} ${modelo}`}
              className="imagen-principal"
            />
            <div className="etiqueta-año-detalle">{año}</div>
          </div>

          {/* Información del producto */}
          <div className="informacion-producto">
            {/* Encabezado */}
            <div className="encabezado-detalle">
              <div className="marca-modelo-detalle">
                <span className="marca-detalle">{marca}</span>
                <h1 className="modelo-detalle">{modelo}</h1>
              </div>
              <div className="precio-detalle">${precio}</div>
            </div>

            {/* Especificaciones principales */}
            <div className="especificaciones-principales">
              <div className="especificacion-item">
                <span className="especificacion-label">Kilómetros:</span>
                <span className="especificacion-valor">{kilometros} km</span>
              </div>
              <div className="especificacion-item">
                <span className="especificacion-label">Ubicación:</span>
                <span className="especificacion-valor">{ubicacion}</span>
              </div>
              <div className="especificacion-item">
                <span className="especificacion-label">Estado:</span>
                <span className="especificacion-valor stock-disponible">
                  {stock ? 'Disponible' : 'Agotado'}
                </span>
              </div>
            </div>

            {/* Descripción corta */}
            <div className="descripcion-corta">
              <p>{descripcion}</p>
            </div>

            {/* Descripción completa */}
            <div className="descripcion-completa">
              <h3>Descripción Detallada</h3>
              <p>{descripcionCompleta}</p>
            </div>

            {/* Características */}
            <div className="caracteristicas-lista">
              <h3>Características Principales</h3>
              <div className="lista-caracteristicas">
                {caracteristicas.map((caracteristica, index) => (
                  <div key={index} className="caracteristica-item">
                    <span className="icono-caracteristica">✓</span>
                    {caracteristica}
                  </div>
                ))}
              </div>
            </div>

            {/* Botones de acción */}
            <div className="contenedor-botones-detalle">
              <button 
                className={`boton-comprar-detalle ${!stock ? 'boton-deshabilitado' : ''}`}
                disabled={!stock}
              >
                {stock ? 'Comprar Ahora' : 'Agotado'}
              </button>
              <button 
                className={`boton-carrito-detalle ${!stock ? 'boton-deshabilitado' : ''}`}
                disabled={!stock}
              >
                {stock ? 'Agregar al Carrito' : 'No Disponible'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;