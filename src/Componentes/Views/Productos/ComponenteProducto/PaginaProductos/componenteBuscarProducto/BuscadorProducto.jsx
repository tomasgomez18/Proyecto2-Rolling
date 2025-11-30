import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button, InputGroup } from 'react-bootstrap';
import { useProductos } from '../Context/ContextoProducto';
import './BuscadorProductos.css';

const BuscadorProducto = () => {
  const { productos, filtros, actualizarFiltros, limpiarFiltros } = useProductos();
  const [filtrosLocales, setFiltrosLocales] = useState({
    terminoBusqueda: '',
    precioMin: '',
    precioMax: '',
    marca: '',
    modelo: ''
  });

  // Sincronizar con los filtros globales
  useEffect(() => {
    setFiltrosLocales({
      terminoBusqueda: filtros.terminoBusqueda,
      precioMin: filtros.precioMin,
      precioMax: filtros.precioMax,
      marca: filtros.marca,
      modelo: filtros.modelo
    });
  }, [filtros]);

  // Obtener marcas y modelos únicos para los selects
  const marcasUnicas = [...new Set(productos.map(p => p.marca))];
  const modelosUnicos = [...new Set(productos.map(p => p.modelo))];

  const manejarCambioFiltro = (campo, valor) => {
    setFiltrosLocales(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const manejarAplicarFiltros = () => {
    actualizarFiltros(filtrosLocales);
  };

  const manejarLimpiarFiltros = () => {
    setFiltrosLocales({
      terminoBusqueda: '',
      precioMin: '',
      precioMax: '',
      marca: '',
      modelo: ''
    });
    limpiarFiltros();
  };

  return (
    <Container className="my-4 buscador-royal-enfield">
      <Row>
        <Col lg={12}>
          <h2 className="text-center mb-3 titulo-buscador">Buscador de Productos</h2>
          <Card className="shadow-sm mb-3 card-buscador">
            <Card.Body className="cuerpo-buscador">
              <Row>
                <Col md={6} className="mb-2">
                  <Form.Group>
                    <Form.Label className="etiqueta-form">Buscar producto</Form.Label>
                    <InputGroup>
                      <Form.Control 
                        type="text" 
                        placeholder="Nombre, marca o modelo..." 
                        className="input-royal"
                        value={filtrosLocales.terminoBusqueda}
                        onChange={(e) => manejarCambioFiltro('terminoBusqueda', e.target.value)}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-2">
                  <Form.Label className="etiqueta-form">Rango de precio</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control 
                        type="number" 
                        placeholder="Mínimo" 
                        className="input-royal"
                        value={filtrosLocales.precioMin}
                        onChange={(e) => manejarCambioFiltro('precioMin', e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Control 
                        type="number" 
                        placeholder="Máximo" 
                        className="input-royal"
                        value={filtrosLocales.precioMax}
                        onChange={(e) => manejarCambioFiltro('precioMax', e.target.value)}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6} className="mb-2">
                  <Form.Group>
                    <Form.Label className="etiqueta-form">Marca</Form.Label>
                    <Form.Select 
                      className="select-royal"
                      value={filtrosLocales.marca}
                      onChange={(e) => manejarCambioFiltro('marca', e.target.value)}
                    >
                      <option value="">Todas las marcas</option>
                      {marcasUnicas.map(marca => (
                        <option key={marca} value={marca}>{marca}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-2">
                  <Form.Group>
                    <Form.Label className="etiqueta-form">Modelo</Form.Label>
                    <Form.Select 
                      className="select-royal"
                      value={filtrosLocales.modelo}
                      onChange={(e) => manejarCambioFiltro('modelo', e.target.value)}
                    >
                      <option value="">Todos los modelos</option>
                      {modelosUnicos.map(modelo => (
                        <option key={modelo} value={modelo}>{modelo}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="text-end mt-2">
                  <Button 
                    variant="outline-secondary" 
                    className="me-2 boton-limpiar"
                    onClick={manejarLimpiarFiltros}
                  >
                    Limpiar filtros
                  </Button>
                  <Button 
                    variant="primary" 
                    className="boton-aplicar"
                    onClick={manejarAplicarFiltros}
                  >
                    Aplicar filtros
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BuscadorProducto;