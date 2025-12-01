import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button, InputGroup } from 'react-bootstrap';
import { useProductos } from '../../../../../Context/ContextoProducto';
import './BuscadorProductos.css';

const BuscadorProducto = () => {
  const { productos, filtros, actualizarFiltros, limpiarFiltros } = useProductos();
  
  // Usar los filtros globales directamente como estado local inicial
  const [filtrosLocales, setFiltrosLocales] = useState({
    terminoBusqueda: filtros.terminoBusqueda,
    precioMin: filtros.precioMin,
    precioMax: filtros.precioMax,
    marca: filtros.marca,
    modelo: filtros.modelo
  });

  // Obtener marcas y modelos únicos para los selects
  const marcasUnicas = [...new Set(productos.map(p => p.marca))];
  const modelosUnicos = [...new Set(productos.map(p => p.modelo))];

  const manejarCambioFiltro = (campo, valor) => {
    setFiltrosLocales(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const manejarAplicarFiltros = (e) => {
    e.preventDefault();
    // Solo actualizar los filtros globales cuando se presiona "Aplicar filtros"
    actualizarFiltros(filtrosLocales);
  };

  const manejarLimpiarFiltros = () => {
    const filtrosVacios = {
      terminoBusqueda: '',
      precioMin: '',
      precioMax: '',
      marca: '',
      modelo: ''
    };
    setFiltrosLocales(filtrosVacios);
    limpiarFiltros();
  };

  // Manejar búsqueda en tiempo real para el término de búsqueda
  const manejarBusquedaEnTiempoReal = (termino) => {
    setFiltrosLocales(prev => ({ ...prev, terminoBusqueda: termino }));
    // Actualizar solo el término de búsqueda en tiempo real
    actualizarFiltros({ terminoBusqueda: termino });
  };

  return (
    <Container className="my-4 buscador-royal-enfield">
      <Row>
        <Col lg={12}>
          <h2 className="text-center mb-3 titulo-buscador mt-2">Buscador de Productos</h2>
          <Card className="shadow-sm mb-3 card-buscador">
            <Card.Body className="cuerpo-buscador">
              <Form onSubmit={manejarAplicarFiltros}>
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
                          onChange={(e) => manejarBusquedaEnTiempoReal(e.target.value)}
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
                      type="button"
                      variant="outline-secondary" 
                      className="me-2 boton-limpiar"
                      onClick={manejarLimpiarFiltros}
                    >
                      Limpiar filtros
                    </Button>
                    <Button 
                      type="submit"
                      variant="primary" 
                      className="boton-aplicar"
                    >
                      Aplicar filtros
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BuscadorProducto;