import React from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useProductos } from '../Context/ContextoProducto';
import CardProducto from './CardProducto';
import './ListaProductos.css';

const ListaProductos = () => {
  const { productosFiltrados, cargando, filtros } = useProductos();

  if (cargando) {
    return (
      <div className="contenedor-cargando">
        <Spinner animation="border" variant="primary" />
        <p className="texto-cargando">Cargando productos...</p>
      </div>
    );
  }

  if (productosFiltrados.length === 0) {
    return (
      <Alert variant="info" className="alerta-sin-productos">
        <Alert.Heading>No se encontraron productos</Alert.Heading>
        <p>
          {filtros.terminoBusqueda 
            ? `No hay resultados para "${filtros.terminoBusqueda}"`
            : `No hay productos disponibles con los filtros seleccionados`
          }
        </p>
      </Alert>
    );
  }

  return (
    <div className="contenedor-lista-productos">
      <Row className="g-4">
        {productosFiltrados.map(producto => (
          <Col key={producto.id} xs={12} sm={6} lg={4} xl={3}>
            <CardProducto {...producto} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ListaProductos;