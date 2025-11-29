import React from 'react';
import { Container, Row, Col, Form, Card, Button, InputGroup } from 'react-bootstrap';
import './BuscadorProductos.css';

const BuscadorProducto = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col lg={12}>
          <h2 className="text-center mb-4">Buscador de Productos</h2>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Buscar producto</Form.Label>
                    <InputGroup>
                      <Form.Control type="text" placeholder="Nombre del producto..." />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Rango de precio</Form.Label>
                  <Row>
                    <Col>
                      <Form.Control type="number" placeholder="Mínimo" />
                    </Col>
                    <Col>
                      <Form.Control type="number" placeholder="Máximo" />
                    </Col>
                  </Row>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Marca</Form.Label>
                    <Form.Select>
                      <option value="">Todas las marcas</option>
                      <option value="samsung">Moto 1</option>
                      <option value="apple">Moto 2</option>
                      <option value="sony">Moto 3</option>
                      <option value="lg">Moto 4</option>
                      <option value="xiaomi">Moto 5</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Modelo</Form.Label>
                    <Form.Select>
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
                <Col className="text-end">
                  <Button variant="outline-secondary" className="me-2">
                    Limpiar filtros
                  </Button>
                  <Button variant="primary">Aplicar filtros</Button>
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
