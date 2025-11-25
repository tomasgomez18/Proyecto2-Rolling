import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaGlobe, FaShoppingCart, FaUser, FaMotorcycle } from "react-icons/fa";
import "./NavbarPrincipal.css";

export const NavBarPrincipal = ({ onAbrirRegistro, onAbrirLogin }) => {
  return (
    <Navbar expand="lg" className="barra-royal">
      <Container fluid className="contenedor-royal">
        
        
        <Navbar.Brand as={Link} to="/" className="logo-royal">
          <img src="Public/Logo.png" alt="logo"  className="logo-royal" />
        </Navbar.Brand>

       
        <Nav className="ms-auto menu-royal">
          <span className="opcion-royal">
            <FaGlobe size={14} /> ES–EUR
          </span>

          <span className="opcion-royal">
            <FaShoppingCart size={16} />
          </span>

          <span className="opcion-royal" onClick={onAbrirLogin}>
            <FaUser size={14} /> Iniciar sesión
          </span>

          <button className="boton-probar" onClick={onAbrirRegistro}>
            Registrarse
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
};