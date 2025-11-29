import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./Ofertas.css";
import OfertaItem from "./OfertaItem";

const productosEnOferta = [
    {
        id: 1,
        marca: "Yamaha",
        modelo: "MT-07",
        precioOriginal: 1450000,
        precioOferta: 1190000,
        imagen: "/img/mt07.jpg",
        finOferta: new Date().getTime() + (1000 * 60 * 60 * 3) 
    },
    {
        id: 2,
        marca: "Honda",
        modelo: "CB 300F",
        precioOriginal: 980000,
        precioOferta: 849000,
        imagen: "/img/cb300f.jpg",
        finOferta: new Date().getTime() + (1000 * 60 * 60 * 3) 
    },
    {
        id: 3,
        marca: "Kawasaki",
        modelo: "Z400",
        precioOriginal: 1350000,
        precioOferta: 1090000,
        imagen: "/img/z400.jpg",
        finOferta: new Date().getTime() + (1000 * 60 * 60 * 3) 
    }
];

function Ofertas() {
    return (
        <section className="ofertas-container">
            <Container>
                <h2>Ofertas Especiales</h2>
                <p>
                    Promociones por tiempo limitado en motocicletas seleccionadas
                </p>

                <Row className="mt-4">
                    {productosEnOferta.map((producto) => (
                        <Col key={producto.id} lg={4} md={6} className="mb-4">
                            <OfertaItem producto={producto} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}

export default Ofertas;
