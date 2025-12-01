import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './CardProducto.css'; 

const CardProducto = ({ 
  marca = "",
  modelo = "", 
  año = "",
  precio = "",
  imagen = "",
  kilometros = "",
  ubicacion = "",
  descripcion = "",
  destacado = false, 
  stock = true
}) => {
  const navigate = useNavigate(); 

  const handleComprarClick = () => {
   
    navigate('/detalle-producto');
  };

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
            onClick={handleComprarClick} 
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