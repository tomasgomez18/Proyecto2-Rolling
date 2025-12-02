import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../../../Context/ContextoCarrito';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carrito.css';

const Carrito = () => {
  const navigate = useNavigate();
  const { 
    itemsCarrito, 
    eliminarDelCarrito, 
    actualizarCantidad,
    vaciarCarrito,
    calcularSubtotal,
    calcularTotalProductos
  } = useCarrito();

  // DEBUG: Ver qué hay en el carrito
  console.log('🔍 Carrito.jsx - Estado actual del carrito:', itemsCarrito);
  console.log('🔍 Carrito.jsx - Total productos:', calcularTotalProductos());
  console.log('🔍 Carrito.jsx - Subtotal:', calcularSubtotal());

  const envio = itemsCarrito.length > 0 ? 50000 : 0;
  const descuentos = 0;
  const total = calcularSubtotal() + envio - descuentos;

  const handleCantidadChange = (productoId, nuevaCantidad) => {
    actualizarCantidad(productoId, parseInt(nuevaCantidad) || 1);
  };

  const handleVaciarCarrito = () => {
    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      vaciarCarrito();
    }
  };

  const handleSeguirComprando = () => {
    navigate('/');
  };

  const handleProcederPago = () => {
    if (itemsCarrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    alert('Redirigiendo al proceso de pago...');
  };

  if (itemsCarrito.length === 0) {
    return (
      <Container className="carrito-container py-5">
        <h1 className="text-center mb-4 titulo-carrito">
          <i className="bi bi-cart3 me-2"></i>Tu Carrito de Motos
        </h1>
        <Card className="text-center shadow-sm border-0">
          <Card.Body className="py-5">
            <i className="bi bi-cart-x display-1 text-metal mb-3"></i>
            <h4 className="mb-3">Tu carrito está vacío</h4>
            <p className="text-metal mb-4">
              No has agregado ningún producto al carrito.
            </p>
            <Button 
              variant="oscuro" 
              onClick={handleSeguirComprando}
              className="btn-proceder"
            >
              <i className="bi bi-bicycle me-2"></i>Ver Productos
            </Button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="carrito-container py-5">
      <h1 className="text-center mb-4 titulo-carrito">
        <i className="bi bi-cart3 me-2"></i>Tu Carrito de Motos ({calcularTotalProductos()})
      </h1>
      
      <Row>
        {/* Columna de productos */}
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm border-0 mb-3">
            <Card.Header className="bg-oscuro text-crema py-3">
              <h5 className="mb-0">
                <i className="bi bi-bicycle me-2"></i>Productos en el carrito ({itemsCarrito.length})
              </h5>
            </Card.Header>
            <ListGroup variant="flush">
              {itemsCarrito.map((item) => (
                <ListGroup.Item key={item.id} className="py-4 px-3">
                  <Row className="align-items-center">
                    <Col xs={3} md={2}>
                      <div className="imagen-producto-carrito">
                        <img 
                          src={item.imagen} 
                          alt={item.nombre}
                          className="img-fluid rounded"
                        />
                      </div>
                    </Col>
                    
                    <Col xs={9} md={5}>
                      <h6 className="mb-1 nombre-producto">{item.nombre}</h6>
                      <div className="precio-producto">
                        <span className="text-dorado fw-bold">
                          ${item.precio.toLocaleString()}
                        </span>
                      </div>
                    </Col>
                    
                    <Col xs={6} md={3}>
                      <div className="d-flex align-items-center">
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          className="boton-cantidad"
                          onClick={() => handleCantidadChange(item.id, item.cantidad - 1)}
                        >
                          <i className="bi bi-dash"></i>
                        </Button>
                        
                        <Form.Control 
                          type="number" 
                          value={item.cantidad}
                          min="1"
                          className="mx-2 text-center input-cantidad"
                          onChange={(e) => handleCantidadChange(item.id, e.target.value)}
                        />
                        
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          className="boton-cantidad"
                          onClick={() => handleCantidadChange(item.id, item.cantidad + 1)}
                        >
                          <i className="bi bi-plus"></i>
                        </Button>
                      </div>
                    </Col>
                    
                    <Col xs={6} md={2} className="text-end">
                      <div className="fw-bold subtotal-producto">
                        ${(item.precio * item.cantidad).toLocaleString()}
                      </div>
                      <Button 
                        variant="link" 
                        className="text-rojo p-0 mt-1 btn-eliminar"
                        onClick={() => eliminarDelCarrito(item.id)}
                      >
                        <i className="bi bi-trash me-1"></i>Eliminar
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
          
          <div className="d-flex justify-content-between mt-3">
            <Button variant="outline-oscuro" className="btn-continuar" onClick={handleSeguirComprando}>
              <i className="bi bi-arrow-left me-2"></i>Seguir Comprando
            </Button>
            <Button variant="outline-rojo" className="btn-vaciar" onClick={handleVaciarCarrito}>
              <i className="bi bi-trash me-2"></i>Vaciar Carrito
            </Button>
          </div>
        </Col>
        
        {/* Columna del resumen */}
        <Col lg={4}>
          <Card className="shadow-sm border-0 sticky-top resumen-card">
            <Card.Header className="bg-oscuro text-crema py-3">
              <h5 className="mb-0">
                <i className="bi bi-receipt me-2"></i>Resumen del Pedido
              </h5>
            </Card.Header>
            
            <Card.Body>
              <ListGroup variant="flush" className="mb-3">
                <ListGroup.Item className="d-flex justify-content-between py-2">
                  <span>Subtotal ({calcularTotalProductos()} items)</span>
                  <span>${calcularSubtotal().toLocaleString()}</span>
                </ListGroup.Item>
                
                <ListGroup.Item className="d-flex justify-content-between py-2">
                  <span>Envío</span>
                  <span>${envio.toLocaleString()}</span>
                </ListGroup.Item>
                
                {descuentos > 0 && (
                  <ListGroup.Item className="d-flex justify-content-between py-2 text-rojo">
                    <span>Descuentos</span>
                    <span>-${descuentos.toLocaleString()}</span>
                  </ListGroup.Item>
                )}
                
                <ListGroup.Item className="d-flex justify-content-between py-3 total-item">
                  <strong className="fs-5">Total</strong>
                  <strong className="fs-5 text-dorado">${total.toLocaleString()}</strong>
                </ListGroup.Item>
              </ListGroup>
              
              <div className="mb-3">
                <Form.Label className="mb-2">
                  <i className="bi bi-ticket-perforated me-2"></i>Código de descuento
                </Form.Label>
                <div className="d-flex">
                  <Form.Control 
                    type="text" 
                    placeholder="Ingresa tu código"
                    className="me-2"
                  />
                  <Button variant="dorado" className="btn-aplicar">
                    Aplicar
                  </Button>
                </div>
              </div>
              
              <Button 
                variant="oscuro" 
                size="lg" 
                className="w-100 mb-3 btn-proceder"
                onClick={handleProcederPago}
              >
                <i className="bi bi-lock-fill me-2"></i>Proceder al Pago
              </Button>
              
              <div className="text-center mt-3">
                <small className="text-metal">
                  <i className="bi bi-shield-check me-1"></i>
                  Compra 100% segura • Envío garantizado
                </small>
              </div>
            </Card.Body>
          </Card>
          
          {/* Métodos de pago */}
          <Card className="shadow-sm border-0 mt-3">
            <Card.Body>
              <h6 className="mb-3">
                <i className="bi bi-credit-card me-2"></i>Métodos de pago aceptados
              </h6>
              <div className="d-flex justify-content-around">
                <i className="bi bi-credit-card fs-4 text-metal"></i>
                <i className="bi bi-paypal fs-4 text-primary"></i>
                <i className="bi bi-bank fs-4 text-metal"></i>
                <i className="bi bi-cash-coin fs-4 text-metal"></i>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Carrito;