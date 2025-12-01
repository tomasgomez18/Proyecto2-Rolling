import React from 'react';
import { Container } from 'react-bootstrap';
import BuscadorProducto from './componenteBuscarProducto/BuscadorProducto';
import ListaProductos from './Lista-Productos/ListaProductos';
import './PaginaProductos.css';

const PaginaProductos = () => {
  return (
    <Container fluid className="pagina-productos mt-5 py-5">

      <div className="contenido-principal">
        <div className="seccion-buscador">
          <div className="encabezado-buscador">
            <h2 className="titulo-seccion">
              Encuentra Tu Classic
            </h2>
            <p className="descripcion-seccion">
              Filtra y encuentra la motocicleta que se adapte a tu estilo de vida
            </p>
          </div>
          <BuscadorProducto />
        </div>

        <div className="seccion-lista-productos">
          <div className="encabezado-lista">
            <h2 className="titulo-seccion">
              <span className="icono-titulo">⭐</span>
              Nuestro Catálogo
            </h2>
            <p className="descripcion-seccion">
              Colección de motocicletas Royal Enfield disponibles
            </p>
          </div>
          <ListaProductos />
        </div>
      </div>

      <div className="informacion-adicional">
        <div className="tarjeta-informativa">
          <div className="icono-tarjeta">👨‍🔧</div>
          <h3>Asesoría Especializada</h3>
          <p className="texto-tarjeta">
            Nuestros expertos en motocicletas clásicas están listos para ayudarte 
            a encontrar la Royal Enfield perfecta para ti.
          </p>
          <button className="boton-contacto">
            <span className="texto-boton">Contactar Concesionario</span>
            <span className="icono-boton">→</span>
          </button>
        </div>
      </div>
    </Container>
  );
};

export default PaginaProductos;