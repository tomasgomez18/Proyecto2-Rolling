import React, { useState } from 'react';
import './Cards.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Col, Row, Card, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';

const imgCard = new URL('/Productos/imgCard.jpg', import.meta.url).href;
const ImgCascos = new URL('/Productos/ImgCascos.jpg', import.meta.url).href;
const ImgIndumentaria = new URL('/Productos/ImgIndumentaria.jpg', import.meta.url).href;
const ImgTaller = new URL('/Productos/ImgTaller.jpg', import.meta.url).href;

const Cards = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', text: '', img: '' });

  const handleHover = (title, text, img) => {
    setModalContent({ title, text, img });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  // 🎬 Animación más lenta + repetible
  const scrollAnimation = {
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 1.1, ease: "easeOut" },
    viewport: { once: false, amount: 0.3 } 
  };

  return (
    <div className="d-flex justify-content-center">

      <div style={{ width: '95%', maxWidth: '1200px' }}>

        {/* CARD 1 */}
        <motion.div {...scrollAnimation}>
          <Card
            className="p-0 border-0 shadow-sm overflow-hidden mb-4"
            style={{ height: '360px' }} // 🔥 menos alta
            onClick={() =>
              handleHover(
                'Motocicletas',
                'Descubre nuestra amplia gama de motocicletas de alta calidad. Modelos deportivos, urbanos y de aventura.',
                imgCard
              )
            }
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
                  <Card.Title className="h4 fw-bold text-dark mb-3 text-center">Motocicletas</Card.Title>
                  <Card.Text className="text-secondary text-center mb-3">
                    Descubre nuestra amplia gama de motocicletas de alta calidad.
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* CARD 2 */}
        <motion.div {...scrollAnimation}>
          <Card
            className="p-0 border-0 shadow-sm overflow-hidden mb-4"
            style={{ height: '360px' }}
            onClick={() =>
              handleHover(
                'Protecciones',
                'Explora nuestras protecciones: cascos, guantes y más para máxima seguridad.',
                ImgCascos
              )
            }
          >
            <Row className="g-0 h-100">
              <Col md={6} className="order-2 order-md-1">
                <Card.Body className="d-flex flex-column justify-content-center p-4 h-100" style={{ backgroundColor: '#dadcdfff' }}>
                  <Card.Title className="h4 fw-bold text-dark mb-3 text-center">Protecciones</Card.Title>
                  <Card.Text className="text-secondary text-center mb-3">
                    Seguridad garantizada con productos certificados.
                  </Card.Text>
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

        {/* CARD 3 */}
        <motion.div {...scrollAnimation}>
          <Card
            className="p-0 border-0 shadow-sm overflow-hidden mb-4"
            style={{ height: '360px' }}
            onClick={() =>
              handleHover(
                'Indumentaria',
                'Toda la indumentaria que necesitas para conducir con protección y estilo.',
                ImgIndumentaria
              )
            }
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
                  <Card.Title className="h4 fw-bold text-dark mb-3 text-center">Indumentaria</Card.Title>
                  <Card.Text className="text-secondary text-center mb-3">
                    Guantes, camperas, pantalones y más.
                  </Card.Text>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </motion.div>

        {/* CARD 4 */}
        <motion.div {...scrollAnimation}>
          <Card
            className="p-0 border-0 shadow-sm overflow-hidden mb-4"
            style={{ height: '360px' }}
            onClick={() =>
              handleHover(
                'Sección de Taller',
                'Mantenimiento y reparación con técnicos especializados.',
                ImgTaller
              )
            }
          >
            <Row className="g-0 h-100">
              <Col md={6} className="order-2 order-md-1">
                <Card.Body className="d-flex flex-column justify-content-center p-4 h-100" style={{ backgroundColor: '#dadcdfff' }}>
                  <Card.Title className="h4 fw-bold text-dark mb-3 text-center">Sección de Taller</Card.Title>
                  <Card.Text className="text-secondary text-center mb-3">
                    Servicios completos con herramientas de última generación.
                  </Card.Text>
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

      {/* MODAL */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalContent.img} alt="imagen" className="img-fluid mb-3 rounded" />
          <p>{modalContent.text}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Cards;
