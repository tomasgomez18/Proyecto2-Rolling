import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Ofertas.css";
import OfertaItem from "./OfertaItem";

const Ofertas = () => {
    return (
        <Container className="ofertas-container">
            <h1 className="ofertas-title">Ofertas y Promociones</h1>

            <Row className="ofertas-grid">
               
                <Col xs={12} md={6} lg={4}>
                    <OfertaItem />
                </Col>
            </Row>
        </Container>
    );
};

export default Ofertas;
