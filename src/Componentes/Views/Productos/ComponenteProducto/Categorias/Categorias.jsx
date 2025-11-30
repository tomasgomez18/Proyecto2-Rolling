import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Categorias.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Col, Row, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const imgCard = new URL('/Productos/imgCard.jpg', import.meta.url).href;
const ImgCascos = new URL('/Productos/ImgCascos.jpg', import.meta.url).href;
const ImgIndumentaria = new URL('/Productos/ImgIndumentaria.jpg', import.meta.url).href;
const ImgTaller = new URL('/Productos/ImgTaller.jpg', import.meta.url).href;

const Categorias = () => {
  const navigate = useNavigate();

  const scrollAnimation = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1.1, ease: "easeOut" },
    viewport: { once: false, amount: 0.3 }
  };

  const hoverAnimation = (direction) => ({
    whileHover: { 
      x: direction === "left" ? -20 : 20,
      scale: 1.02,
      transition: { type: "spring", stiffness: 150, damping: 12 }
    }
  });

  // Función para manejar el click en las categorías
  const handleCategoryClick = (categoria) => {
    // Navegar a PaginaProducto pasando la categoría como estado
    navigate('/productos', { 
      state: { 
        categoriaSeleccionada: categoria 
      } 
    });
  };

  // Función para manejar el click en el taller
  const handleTallerClick = () => {
    navigate('/taller');
  };

  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: '95%', maxWidth: '1200px' }}>

        {/* Categoría Motocicletas */}
        <motion.div 
          {...scrollAnimation} 
          {...hoverAnimation("left")}
          onClick={() => handleCategoryClick('motocicletas')}
          style={{ cursor: 'pointer' }}
        >
          <Card
            className="p-0 border-0 shadow-sm overflow-hidden mb-4 card-hover"
            style={{ height: '330px' }}
          >
            <Row className="g-0 h-100">
              <Col md={6}>
                <div
                  className="w-100 h-100"
                  style={{
                    backgroundImage: `url(${imgCard})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              </Col>
              <Col md={6}>
                <Card.Body className="d-flex flex-column justify-content-center p-4 h-100" style={{ backgroundColor: '#dadcdfff' }}>
                  <Card.Title className="fs-2 fw-bold text-dark mb-3 text-center">Motocicletas</Card.Title>
                  <Card.Text className="text-secondary text-center mb-3">
                    Descubre nuestra amplia gama de motocicletas de alta calidad.
                  </Card.Text>
                  <div className="text-center">
                    <span className="btn btn-outline-dark">Ver productos</span>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* Categoría Protecciones */}
        <motion.div 
          {...scrollAnimation} 
          {...hoverAnimation("right")}
          onClick={() => handleCategoryClick('protecciones')}
          style={{ cursor: 'pointer' }}
        >
          <Card
            className="p-0 border-0 shadow-sm overflow-hidden mb-4 card-hover"
            style={{ height: '330px' }}
          >
            <Row className="g-0 h-100">
              <Col md={6} className="order-2 order-md-1">
                <Card.Body className="d-flex flex-column justify-content-center p-4 h-100" style={{ backgroundColor: '#dadcdfff' }}>
                  <Card.Title className="fs-2 fw-bold text-dark mb-3 text-center">Protecciones</Card.Title>
                  <Card.Text className="text-secondary text-center mb-3">
                    Seguridad garantizada con productos certificados.
                  </Card.Text>
                  <div className="text-center">
                    <span className="btn btn-outline-dark">Ver productos</span>
                  </div>
                </Card.Body>
              </Col>
              <Col md={6} className="order-1 order-md-2">
                <div
                  className="w-100 h-100"
                  style={{
                    backgroundImage: `url(${ImgCascos})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* Categoría Indumentaria */}
        <motion.div 
          {...scrollAnimation} 
          {...hoverAnimation("left")}
          onClick={() => handleCategoryClick('indumentaria')}
          style={{ cursor: 'pointer' }}
        >
          <Card
            className="p-0 border-0 shadow-sm overflow-hidden mb-4 card-hover"
            style={{ height: '330px' }}
          >
            <Row className="g-0 h-100">
              <Col md={6}>
                <div
                  className="w-100 h-100"
                  style={{
                    backgroundImage: `url(${ImgIndumentaria})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              </Col>
              <Col md={6}>
                <Card.Body className="d-flex flex-column justify-content-center p-4 h-100" style={{ backgroundColor: '#dadcdfff' }}>
                  <Card.Title className="fs-2 fw-bold text-dark mb-3 text-center">Indumentaria</Card.Title>
                  <Card.Text className="text-secondary text-center mb-3">
                    Guantes, camperas, pantalones y más.
                  </Card.Text>
                  <div className="text-center">
                    <span className="btn btn-outline-dark">Ver productos</span>
                  </div>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* Categoría Taller */}
        <motion.div 
          {...scrollAnimation} 
          {...hoverAnimation("right")}
          onClick={handleTallerClick}
          style={{ cursor: 'pointer' }}
        >
          <Card
            className="p-0 border-0 shadow-sm overflow-hidden mb-4 card-hover"
            style={{ height: '330px' }}
          >
            <Row className="g-0 h-100">
              <Col md={6} className="order-2 order-md-1">
                <Card.Body className="d-flex flex-column justify-content-center p-4 h-100" style={{ backgroundColor: '#dadcdfff' }}>
                  <Card.Title className="fs-2 fw-bold text-dark mb-3 text-center">Sección de Taller</Card.Title>
                  <Card.Text className="text-secondary text-center mb-3">
                    Servicios completos con herramientas de última generación.
                  </Card.Text>
                  <div className="text-center">
                    <span className="btn btn-outline-dark">Ver servicios</span>
                  </div>
                </Card.Body>
              </Col>
              <Col md={6} className="order-1 order-md-2">
                <div
                  className="w-100 h-100"
                  style={{
                    backgroundImage: `url(${ImgTaller})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              </Col>
            </Row>
          </Card>
        </motion.div>

      </div>
    </div>
  );
};

export default Categorias;