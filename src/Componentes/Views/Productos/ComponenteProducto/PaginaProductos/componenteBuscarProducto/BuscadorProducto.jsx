import React from 'react';
import { Container, Row, Col, Form, Card, Button, InputGroup } from 'react-bootstrap';
import './BuscadorProductos.css';

const BuscadorProducto = () => {
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
                        placeholder="Nombre del producto..." 
                        className="input-royal"
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
                      />
                    </Col>
                    <Col>
                      <Form.Control 
                        type="number" 
                        placeholder="Máximo" 
                        className="input-royal"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col md={6} className="mb-2">
                  <Form.Group>
                    <Form.Label className="etiqueta-form">Marca</Form.Label>
                    <Form.Select className="select-royal">
                      <option value="">Todas las marcas</option>
                      <option value="samsung">Moto 1</option>
                      <option value="apple">Moto 2</option>
                      <option value="sony">Moto 3</option>
                      <option value="lg">Moto 4</option>
                      <option value="xiaomi">Moto 5</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-2">
                  <Form.Group>
                    <Form.Label className="etiqueta-form">Modelo</Form.Label>
                    <Form.Select className="select-royal">
                      <option value="">Todos los modelos</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="text-end mt-2">
                  <Button variant="outline-secondary" className="me-2 boton-limpiar">
                    Limpiar filtros
                  </Button>
                  <Button variant="primary" className="boton-aplicar">
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