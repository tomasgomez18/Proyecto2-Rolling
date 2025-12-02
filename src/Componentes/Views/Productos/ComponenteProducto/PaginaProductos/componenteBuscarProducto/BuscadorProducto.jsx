import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Card, Button, InputGroup } from 'react-bootstrap';
import { useProductos } from '../../../../../Context/ContextoProducto';
import './BuscadorProductos.css';

const BuscadorProducto = () => {
  const { productos, filtros, actualizarFiltros, limpiarFiltros, obtenerCategoriasUnicas } = useProductos();
  
  const [filtrosLocales, setFiltrosLocales] = useState({
    terminoBusqueda: filtros.terminoBusqueda,
    categoria: filtros.categoria,           // <- AÑADE ESTO
    precioMin: filtros.precioMin,
    precioMax: filtros.precioMax,
    marca: filtros.marca,
    modelo: filtros.modelo
  });

  // Obtener categorías, marcas y modelos únicos
  const categoriasUnicas = obtenerCategoriasUnicas();
  const marcasUnicas = [...new Set(productos.map(p => p.marca))];
  const modelosUnicos = [...new Set(productos.map(p => p.modelo))];

  // Sincronizar filtros locales con globales cuando cambien
  useEffect(() => {
    setFiltrosLocales({
      terminoBusqueda: filtros.terminoBusqueda,
      categoria: filtros.categoria,
      precioMin: filtros.precioMin,
      precioMax: filtros.precioMax,
      marca: filtros.marca,
      modelo: filtros.modelo
    });
  }, [filtros]);

  const manejarCambioFiltro = (campo, valor) => {
    setFiltrosLocales(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const manejarAplicarFiltros = (e) => {
    e.preventDefault();
    actualizarFiltros(filtrosLocales);
  };

  const manejarLimpiarFiltros = () => {
    const filtrosVacios = {
      terminoBusqueda: '',
      categoria: '',
      precioMin: '',
      precioMax: '',
      marca: '',
      modelo: ''
    };
    setFiltrosLocales(filtrosVacios);
    limpiarFiltros();
  };

  const manejarBusquedaEnTiempoReal = (termino) => {
    setFiltrosLocales(prev => ({ ...prev, terminoBusqueda: termino }));
    actualizarFiltros({ terminoBusqueda: termino });
  };

  // Filtro de categoría en tiempo real
  const manejarCambioCategoria = (categoria) => {
    setFiltrosLocales(prev => ({ ...prev, categoria }));
    actualizarFiltros({ categoria });
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
                  {/* Búsqueda general */}
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

                  {/* Filtro de categoría */}
                  <Col md={6} className="mb-2">
                    <Form.Group>
                      <Form.Label className="etiqueta-form">Categoría</Form.Label>
                      <Form.Select 
                        className="select-royal"
                        value={filtrosLocales.categoria}
                        onChange={(e) => manejarCambioCategoria(e.target.value)}
                      >
                        <option value="">Todas las categorías</option>
                        {categoriasUnicas.map(categoria => (
                          <option key={categoria} value={categoria}>
                            {categoria}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {/* Rango de precio */}
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

                  {/* Marca */}
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

                  {/* Modelo */}
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
                
                {/* Botones */}
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