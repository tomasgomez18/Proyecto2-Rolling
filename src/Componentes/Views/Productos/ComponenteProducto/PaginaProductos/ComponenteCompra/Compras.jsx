import React from 'react';
import '../card-Producto/CardProducto.css'; // Esta línea importa los estilos

const CardProducto = ({ 
  marca = "Royal Enfield",
  modelo = "Classic 350", 
  año = 2020,
  precio = "450000",
  imagen = "https://images.pexels.com/photos/5192876/pexels-photo-5192876.jpeg",
  kilometros = "12,000",
  ubicacion = "Buenos Aires, AR",
  descripcion = "Mantenimiento al día. Color original. Algunos detalles estéticos mínimos.",
  destacado = true, 
  stock = true
}) => {
  return (
    <div className={`card-moto ${destacado ? 'destacada' : ''} ${!stock ? 'sin-stock' : ''}`} style={{maxWidth: '320px', margin: '10px'}}>
      <div className="barra-superior-color" />

      <div className="contenedor-imagen-moto">
        <img 
          className="imagen-moto" 
          src={imagen} 
          alt={`${marca} ${modelo}`} 
          loading="lazy"
        />
        <span className="etiqueta-año">{año}</span>
      </div>

      <div className="contenido-card">
        <div className="marca-modelo">
          <div className="nombre-marca">{marca}</div>
          <h3 className="nombre-modelo">{modelo}</h3>
        </div>

        <div className="lista-especificaciones">
          <div className="item-especificacion">
            <div className="nombre-caracteristica">Kilómetros</div>
            <div className="valor-caracteristica">{kilometros}</div>
          </div>
          <div className="item-especificacion">
            <div className="nombre-caracteristica">Ubicación</div>
            <div className="valor-caracteristica">{ubicacion}</div>
          </div>
        </div>

        <p className="descripcion-moto">{descripcion}</p>

        <div className="contenedor-precio">
          <div className="texto-precio-desde">Precio</div>
          <div className="valor-precio">${precio}</div>
          <div className="texto-precio-final">Financiación disponible</div>
        </div>

        <div className="contenedor-botones">
          <button 
            className={`boton-contactar ${!stock ? 'boton-deshabilitado' : ''}`} 
            disabled={!stock}
          >
            {stock ? 'Comprar' : 'Agotada'}
          </button>
          <button 
            className={`boton-carrito ${!stock ? 'boton-deshabilitado' : ''}`} 
            disabled={!stock}
          >
            {stock ? 'Agregar al carrito' : 'No disponible'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProducto;