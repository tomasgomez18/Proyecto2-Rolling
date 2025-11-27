import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaGlobe, FaShoppingCart, FaUser, FaBars } from "react-icons/fa";
import "./NavBarPrincipal.css";

export const NavBarPrincipal = ({ onAbrirRegistro, onAbrirLogin }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top" className="barra-navegacion-royal">
      <Container>
        <Navbar.Brand as={Link} to="/" className="marca-royal">
          <img 
            src="Public/png-transparent-enfield-cycle-co-ltd-motorcycle-royal-enfield-interceptor-royal-enfield-of-milwaukee-motorcycle-text-trademark-logo.png" 
            alt="Rolling Motors" 
            height="40" 
          />
        </Navbar.Brand>

        <Navbar.Collapse className="d-none d-md-flex">
          <Nav className="ms-auto align-items-center gap-3">
            <Nav.Link className="enlace-navegacion d-flex align-items-center">
              <FaGlobe className="me-1" /> ES–EN
            </Nav.Link>
            <Nav.Link className="enlace-navegacion position-relative">
              <FaShoppingCart />
              <span className="position-absolute top-0 start-100 translate-middle badge etiqueta-carrito">
                0
              </span>
            </Nav.Link>
            <Nav.Link onClick={onAbrirLogin} className="enlace-navegacion d-flex align-items-center puntero-mano">
              <FaUser className="me-1" /> Iniciar sesión
            </Nav.Link>
            <button onClick={onAbrirRegistro} className="boton-registro rounded-pill px-3">
              Registrarse
            </button>
          </Nav>
        </Navbar.Collapse>

        <div className="d-flex d-md-none align-items-center gap-2">
          <Nav.Link className="carrito-movil text-white">
            <FaShoppingCart size={18} />
          </Nav.Link>
          
          <Dropdown align="end">
            <Dropdown.Toggle variant="dark" className="boton-desplegable-movil">
              <FaBars size={18} />
            </Dropdown.Toggle>
            
            <Dropdown.Menu className="menu-desplegable-movil">
              <Dropdown.Item className="item-desplegable" onClick={onAbrirLogin}>
                <FaUser className="me-2" /> Iniciar sesión
              </Dropdown.Item>
              <Dropdown.Item className="item-desplegable">
                <FaGlobe className="me-2" /> ES–EN
              </Dropdown.Item>
              <Dropdown.Divider className="separador-desplegable" />
              <Dropdown.Item className="text-center">
                <button 
                  onClick={onAbrirRegistro} 
                  className="boton-registro rounded-pill w-100"
                >
                  Registrarse
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};