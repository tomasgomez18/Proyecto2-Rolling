import React from 'react';
import './DetalleProducto.css';

const DetalleProducto = ({ producto }) => {
  // Datos por defecto - reemplazalos con tus props reales
  const datos = producto || {
    marca: "Royal Enfield",
    modelo: "Classic 350",
    año: 2020,
    precio: "450.000",
    imagen: "https://images.pexels.com/photos/5192876/pexels-photo-5192876.jpeg",
    kilometros: "12.000",
    ubicacion: "Buenos Aires, AR",
    stock: true
  };

  return (
    <div className="detalle-producto">
      {/* Header con gradiente */}
      <div className="detalle-header">
        <span className="detalle-marca">{datos.marca}</span>
        <h1 className="detalle-modelo">{datos.modelo}</h1>
        <div className="detalle-año">{datos.año}</div>
      </div>

      <div className="detalle-contenido">
        {/* Columna izquierda - Imagen */}
        <div className="detalle-columna-imagen">
          <div className="imagen-contenedor">
            <img 
              src={datos.imagen} 
              alt={`${datos.marca} ${datos.modelo}`}
              className="imagen-producto"
            />
            <div className="imagen-overlay">
              <span className="stock-badge">
                {datos.stock ? 'DISPONIBLE' : 'AGOTADO'}
              </span>
            </div>
          </div>
        </div>

        {/* Columna derecha - Información */}
        <div className="detalle-columna-info">
          {/* Precio destacado */}
          <div className="precio-destacado">
            <span className="precio-label">PRECIO</span>
            <div className="precio-valor">${datos.precio}</div>
          </div>

          {/* Especificaciones */}
          <div className="especificaciones">
            <div className="especificacion">
              <i className="especificacion-icono">📍</i>
              <div>
                <span className="especificacion-label">Ubicación</span>
                <span className="especificacion-valor">{datos.ubicacion}</span>
              </div>
            </div>
            <div className="especificacion">
              <i className="especificacion-icono">🛣️</i>
              <div>
                <span className="especificacion-label">Kilómetros</span>
                <span className="especificacion-valor">{datos.kilometros} km</span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="detalle-botones">
            <button 
              className={`btn-primario ${!datos.stock ? 'btn-deshabilitado' : ''}`}
              disabled={!datos.stock}
            >
              COMPRAR AHORA
            </button>
            <button 
              className={`btn-secundario ${!datos.stock ? 'btn-deshabilitado' : ''}`}
              disabled={!datos.stock}
            >
              AGREGAR AL CARRITO
            </button>
          </div>

          {/* Info adicional */}
          <div className="info-adicional">
            <p className="info-texto">
              {datos.stock 
                ? 'Producto disponible para entrega inmediata'
                : 'Producto agotado - Próximo stock disponible pronto'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;