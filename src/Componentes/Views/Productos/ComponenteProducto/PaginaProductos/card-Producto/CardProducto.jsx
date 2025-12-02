import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useCarrito } from '../../../../../Context/ContextoCarrito'; // Ajusta según tu estructura
import './CardProducto.css';

const CardProducto = ({ 
  id,
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
  const { agregarAlCarrito } = useCarrito();

  const handleComprarClick = (e) => {
    if (e) e.stopPropagation();
    
    // Crear objeto con todos los datos del producto
    const productoData = {
      id: id || Date.now().toString(),
      marca,
      modelo,
      año,
      precio,
      imagen,
      kilometros,
      ubicacion,
      descripcion,
      destacado,
      stock
    };
    
    // Navegar a la página de detalle con el estado del producto
    navigate('/detalle-producto', { state: { producto: productoData } });
  };

const handleAgregarCarrito = (e) => {
  e.stopPropagation();
  
  if (!stock) {
    alert('Este producto no está disponible');
    return;
  }

  // Crear objeto del producto con ID garantizado
  const productoData = {
    id: id || `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    marca,
    modelo,
    año,
    precio,
    imagen,
    kilometros,
    ubicacion,
    descripcion,
    destacado,
    stock
  };

  console.log('🎯 CardProducto - Producto a agregar:', productoData);
  
  // Agregar al carrito
  agregarAlCarrito(productoData, 1);
  
  // Mostrar confirmación
  alert(`${marca} ${modelo} agregado al carrito`);
};

  const handleCardClick = (e) => {
    // Solo navegar si no se hizo clic en un botón
    if (!e.target.closest('button')) {
      const productoData = {
        id: id || Date.now().toString(),
        marca,
        modelo,
        año,
        precio,
        imagen,
        kilometros,
        ubicacion,
        descripcion,
        destacado,
        stock
      };
      
      navigate('/detalle-producto', { state: { producto: productoData } });
    }
  };

  return (
    <div 
      className={`card-moto ${destacado ? 'destacada' : ''} ${!stock ? 'sin-stock' : ''}`} 
      style={{maxWidth: '320px', margin: '10px', cursor: 'pointer'}}
      onClick={handleCardClick}
    >
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
            onClick={handleAgregarCarrito}
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