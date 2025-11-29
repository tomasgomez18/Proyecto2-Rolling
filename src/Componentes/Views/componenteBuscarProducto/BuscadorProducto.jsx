import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  InputGroup,
} from "react-bootstrap";
import "./BuscadorProductos.css";

const BuscadorProducto = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col lg={12}>
          <h2 className="text-center mb-4">Buscador de Productos</h2>

          {/* Filtros */}
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Row>
                {/* Búsqueda general */}
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Buscar producto</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Nombre del producto..."
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>

                {/* Rango de precios */}
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

                {/* Filtros por marca y modelo */}
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label>Marca</Form.Label>
                    <Form.Select>
                      <option value="">Todas las marcas</option>
                      <option value="samsung">Samsung</option>
                      <option value="apple">Apple</option>
                      <option value="sony">Sony</option>
                      <option value="lg">LG</option>
                      <option value="xiaomi">Xiaomi</option>
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

              {/* Botones de acción */}
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

          {/* Sección de resultados */}
          <Card className="shadow-sm">
            <Card.Body>
              <div className="text-center text-muted">
                <h5>Resultados de búsqueda</h5>
                <p>
                  Los productos aparecerán aquí después de aplicar los filtros
                </p>

                {/* Ejemplo de filtros aplicados */}
                <div className="mt-3">
                  <h6>Filtros disponibles:</h6>
                  <div className="d-flex flex-wrap gap-2 justify-content-center">
                    <span className="badge bg-primary">Búsqueda por texto</span>
                    <span className="badge bg-success">Filtro por precio</span>
                    <span className="badge bg-warning text-dark">
                      Filtro por marca
                    </span>
                    <span className="badge bg-info text-dark">
                      Filtro por modelo
                    </span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BuscadorProducto;
