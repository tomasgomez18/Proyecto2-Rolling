import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import "./Ofertas.css";

function OfertaItem({ producto }) {
  const descuento = Math.round(
    ((producto.precioOriginal - producto.precioOferta) /
      producto.precioOriginal) *
      100
  );

  return (
    <Card className="oferta-card h-100">
      <Badge bg="danger" className="badge-oferta">
        -{descuento}%
      </Badge>

      <Card.Img src={producto.imagen} alt={producto.modelo} />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="oferta-titulo">
          {producto.marca} {producto.modelo}
        </Card.Title>

        <div className="precio-original">
          ${producto.precioOriginal.toLocaleString()}
        </div>

        <div className="precio-oferta">
          ${producto.precioOferta.toLocaleString()}
        </div>

        <Button className="btn-oferta mt-3">
          Ver oferta
        </Button>
      </Card.Body>
    </Card>
  );
}

export default OfertaItem;
