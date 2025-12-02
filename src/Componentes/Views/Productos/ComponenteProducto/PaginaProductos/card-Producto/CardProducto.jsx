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


  const truncarTexto = (texto, maxLength = 75) => {
    if (!texto || texto.length <= maxLength) return texto;
    return texto.substring(0, maxLength) + '...';
  };

  const formatearPrecio = (precioStr) => {
    if (!precioStr) return "0";
    const numero = parseInt(precioStr.replace(/\D/g, ''));
    return isNaN(numero) ? "0" : numero.toLocaleString('es-ES');
  };

  const formatearKilometros = (kmStr) => {
    if (!kmStr) return "0 km";
    const numero = parseInt(kmStr.replace(/\D/g, ''));
    return isNaN(numero) ? "0 km" : numero.toLocaleString('es-ES') + ' km';
  };


  const acortarUbicacion = (ubicacionStr) => {
    if (!ubicacionStr) return "";
    if (ubicacionStr.length <= 20) return ubicacionStr;
    return ubicacionStr.substring(0, 20) + '...';
  };

  const handleComprarClick = () => {
    navigate('/detalle-producto');
  };

  return (
    <div className={`card-moto ${destacado ? 'destacada' : ''} ${!stock ? 'sin-stock' : ''}`}>
      <div className="barra-superior-color" />

      <div className="contenedor-imagen-moto">
        <img 
          className="imagen-moto" 
          src={imagen} 
          alt={`${marca} ${modelo}`} 
          loading="lazy"
        />
        <span className="etiqueta-año">{año}</span>
        

        {destacado && (
          <span className="etiqueta-destacado">Destacado</span>
        )}
        

        {!stock && (
          <span className="etiqueta-agotado">Agotado</span>
        )}
      </div>

      <div className="contenido-card ">
        <div className="marca-modelo">
          <div className="nombre-marca">{marca}</div>
          <h3 className="nombre-modelo">{modelo}</h3>
        </div>


        <div className="especificaciones-columnas">

          <div className="columna-especificacion">
            <div className="icono-especificacion">📍</div>
            <div className="contenido-especificacion">
              <div className="titulo-especificacion">Ubicación</div>
              <div className="valor-especificacion ubicacion-texto" title={ubicacion}>
                {acortarUbicacion(ubicacion)}
              </div>
            </div>
          </div>
          
     
          <div className="columna-especificacion">
            <div className="icono-especificacion">🛣️</div>
            <div className="contenido-especificacion">
              <div className="titulo-especificacion">Kilómetros</div>
              <div className="valor-especificacion km-texto">
                {formatearKilometros(kilometros)}
              </div>
            </div>
          </div>
        </div>

        <p className="descripcion-moto" title={descripcion}>
          {truncarTexto(descripcion)}
        </p>

        <div className="contenedor-precio">
          <div className="texto-precio-desde">Precio</div>
          <div className="valor-precio">${formatearPrecio(precio)}</div>
          <div className="texto-precio-final">Financiación disponible</div>
        </div>

        <div className="contenedor-botones">
          <button 
            className={`boton-contactar ${!stock ? 'boton-deshabilitado' : ''}`} 
            onClick={handleComprarClick} 
            disabled={!stock}
          >
            <span className="texto-boton">
              {stock ? 'Comprar' : 'Agotada'}
            </span>
          </button>
          <button 
            className={`boton-carrito ${!stock ? 'boton-deshabilitado' : ''}`} 
            disabled={!stock}
          >
            <span className="texto-boton">
              {stock ? 'Agregar' : 'No disponible'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProducto;