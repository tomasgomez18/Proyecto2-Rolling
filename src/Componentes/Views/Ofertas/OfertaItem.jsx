import React from "react";
import { Card, Badge } from "react-bootstrap";

const OfertaItem = () => {
    return (
        <Card className="oferta-card">
            <Card.Img 
                variant="top" 
                src="/img/ofertas/default.jpg"
                className="oferta-img"
            />

            <Card.Body>
                <Badge bg="danger" className="oferta-badge">
                    -20%
                </Badge>

                <Card.Title>Moto en Oferta</Card.Title>
                <Card.Text>
                    Oferta limitada. ¡Aprovecha antes de que termine!
                </Card.Text>

                
            </Card.Body>
        </Card>
    );
};

export default OfertaItem;
