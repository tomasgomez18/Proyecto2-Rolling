import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCarrito } from '../../../../../Context/ContextoCarrito'; 
import './DetalleProducto.css';

const DetalleProducto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();

  const productoData = location.state?.producto || {

    id: null, 
    marca: "Royal Enfield",
    modelo: "Classic 350",
    año: 2020,
    precio: "450.000",
    imagen: "https://images.pexels.com/photos/5192876/pexels-photo-5192876.jpeg",
    kilometros: "12.000",
    ubicacion: "Buenos Aires, AR",
    descripcion: "Moto en excelente estado, mantenimiento al día. Perfecta para ciudad y rutas cortas.",
    destacado: false,
    stock: true
  };

  const handleComprarAhora = () => {
    if (!productoData.stock) {
      alert('Este producto no está disponible');
      return;
    }

    const productoConId = {
      ...productoData,
      id: productoData.id || Date.now().toString() 
    };

    agregarAlCarrito(productoConId, 1);
  
    navigate('/carrito');
  };

  const handleAgregarAlCarrito = () => {
    if (!productoData.stock) {
      alert('Este producto no está disponible');
      return;
    }

    const productoConId = {
      ...productoData,
      id: productoData.id || Date.now().toString()
    };

    agregarAlCarrito(productoConId, 1);
    
    alert(`${productoData.marca} ${productoData.modelo} agregado al carrito`);
  };

  return (
    <div className="detalle-producto">
      <div className="detalle-header">
        <span className="detalle-marca">{productoData.marca}</span>
        <h1 className="detalle-modelo">{productoData.modelo}</h1>
        <div className="detalle-año">{productoData.año}</div>
      </div>

      <div className="detalle-contenido">
        <div className="detalle-columna-imagen">
          <div className="imagen-contenedor">
            <img 
              src={productoData.imagen} 
              alt={`${productoData.marca} ${productoData.modelo}`}
              className="imagen-producto"
            />
            <div className="imagen-overlay">
              <span className="stock-badge">
                {productoData.stock ? 'DISPONIBLE' : 'AGOTADO'}
              </span>
            </div>
          </div>
        </div>
        <div className="detalle-columna-info">
          <div className="precio-destacado">
            <span className="precio-label">PRECIO</span>
            <div className="precio-valor">${productoData.precio}</div>
          </div>


          <div className="especificaciones">
            <div className="especificacion">
              <i className="especificacion-icono">📍</i>
              <div>
                <span className="especificacion-label">Ubicación</span>
                <span className="especificacion-valor">{productoData.ubicacion}</span>
              </div>
            </div>
            <div className="especificacion">
              <i className="especificacion-icono">🛣️</i>
              <div>
                <span className="especificacion-label">Kilómetros</span>
                <span className="especificacion-valor">{productoData.kilometros} km</span>
              </div>
            </div>
          </div>
          <div className="descripcion-detalle">
            <h3>Descripción</h3>
            <p>{productoData.descripcion}</p>
          </div>
          <div className="detalle-botones">
            <button 
              className={`btn-primario ${!productoData.stock ? 'btn-deshabilitado' : ''}`}
              disabled={!productoData.stock}
              onClick={handleComprarAhora}
            >
              COMPRAR AHORA
            </button>
            <button 
              className={`btn-secundario ${!productoData.stock ? 'btn-deshabilitado' : ''}`}
              disabled={!productoData.stock}
              onClick={handleAgregarAlCarrito} 
            >
              AGREGAR AL CARRITO
            </button>
          </div>

          <div className="info-adicional">
            <p className="info-texto">
              {productoData.stock 
                ? 'Producto disponible para entrega inmediata'
                : 'Producto agotado - Próximo stock disponible pronto'
              }
            </p>
            {productoData.destacado && (
              <span className="destacado-badge">⭐ DESTACADO</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;