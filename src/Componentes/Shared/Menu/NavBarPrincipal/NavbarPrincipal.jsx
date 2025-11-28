import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { 
  FaGlobe, 
  FaShoppingCart, 
  FaUser, 
  FaBars, 
  FaEnvelope, 
  FaHeadset, 
  FaSignOutAlt 
} from "react-icons/fa";
import { useUser } from "../../../Context/ContextoUsuario";
import MenuUsuario from "../../../Utils/MenuUsuario";
import "./NavBarPrincipal.css";

export const NavBarPrincipal = ({ onAbrirRegistro, onAbrirLogin }) => {
  const { usuarioActual, logout } = useUser();

  const manejarCerrarSesion = () => {
    logout();
    // No necesitas navigate aquí porque el contexto ya actualizará el componente
  };

  const manejarPerfil = () => {
    // Puedes implementar la navegación al perfil aquí si lo deseas
    console.log("Ir al perfil");
  };

  const manejarContacto = () => {
    // Puedes implementar la navegación al contacto aquí si lo deseas
    console.log("Ir a contacto");
  };

  const manejarSoporte = () => {
    // Puedes implementar la navegación al soporte aquí si lo deseas
    console.log("Ir a soporte");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top" className="barra-navegacion-royal">
      <Container>
        <Navbar.Brand as={Link} to="/" className="marca-royal">
          <img 
            src="/Public/png-transparent-enfield-cycle-co-ltd-motorcycle-royal-enfield-interceptor-royal-enfield-of-milwaukee-motorcycle-text-trademark-logo.png" 
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
            
            {/* CONDICIÓN: Mostrar MenuUsuario si está logueado, sino botones de login/registro */}
            {usuarioActual ? (
              <MenuUsuario />
            ) : (
              <>
                <Nav.Link onClick={onAbrirLogin} className="enlace-navegacion d-flex align-items-center puntero-mano">
                  <FaUser className="me-1" /> Iniciar sesión
                </Nav.Link>
                <button onClick={onAbrirRegistro} className="boton-registro rounded-pill px-3">
                  Registrarse
                </button>
              </>
            )}
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
              {/* CONDICIÓN MÓVIL: Mostrar opciones según si está logueado o no */}
              {usuarioActual ? (
                <>
                  <Dropdown.Item className="item-desplegable" onClick={manejarPerfil}>
                    <FaUser className="me-2" /> {usuarioActual.nombreDeUsuario}
                  </Dropdown.Item>
                  <Dropdown.Item className="item-desplegable" onClick={manejarPerfil}>
                    <FaUser className="me-2" /> Perfil
                  </Dropdown.Item>
                  <Dropdown.Item className="item-desplegable" onClick={manejarContacto}>
                    <FaEnvelope className="me-2" /> Contacto
                  </Dropdown.Item>
                  <Dropdown.Item className="item-desplegable" onClick={manejarSoporte}>
                    <FaHeadset className="me-2" /> Soporte
                  </Dropdown.Item>
                  <Dropdown.Divider className="separador-desplegable" />
                  <Dropdown.Item 
                    className="item-desplegable text-danger" 
                    onClick={manejarCerrarSesion}
                  >
                    <FaSignOutAlt className="me-2" /> Cerrar Sesión
                  </Dropdown.Item>
                </>
              ) : (
                <>
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
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};