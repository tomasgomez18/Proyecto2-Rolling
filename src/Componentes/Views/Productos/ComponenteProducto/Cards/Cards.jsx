import React from 'react'
import './Cards.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Col, Container, Form, FormLabel, Row , Card,} from 'react-bootstrap';


const imgCard = new URL('/Productos/imgCard.jpg', import.meta.url).href;
const ImgCasco = new URL('/Productos/imgCasco.png', import.meta.url).href;


const Cards = () => {
  return (
<div className="d-flex justify-content-center">
  <div style={{width: '90%', maxWidth: '900px'}}>
    <Card className="p-0 border-0 shadow-sm overflow-hidden" style={{maxHeight: '280px'}}>
      <Row className="g-0 h-100">
        <Col md={6}>
          <div 
            className="w-100 h-100"
            style={{
              backgroundImage: `url(${imgCard})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              objectFit: 'cover',
            }}
          ></div>
        </Col>
        <Col md={6}> 
          <Card.Body 
            className="d-flex flex-column justify-content-center p-3 h-100"
            style={{backgroundColor: '#dadcdfff'}}
          >
            <Card.Title className="h4 fw-bold text-dark mb-3 text-center">
              Motocicletas
            </Card.Title>
            <Card.Text className="text-secondary text-center mb-3" style={{fontSize: '0.9rem'}}>
              Descubre nuestra amplia gama de motocicletas de alta calidad. 
              Modelos deportivos, urbanos y de aventura.
            </Card.Text>
            
            <div className="d-flex justify-content-center">
              <Button 
                variant="primary" 
                size="md"
                className="px-4 py-2 fw-semibold"
                style={{
                  backgroundColor: '#007bff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem'
                }}
              >
                Ver Catálogo
              </Button>
            </div>
          </Card.Body>
        </Col>
        
      </Row>
    </Card>
    
  </div>
</div>
  );
};

export default Cards;

