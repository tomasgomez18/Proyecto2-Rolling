import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">

        {/* Columna 1 - Navegación */}
        <div className="footer__column">
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/categorias">Categorías</Link></li>
            <li><Link to="/ofertas">Ofertas</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 2 - Mi cuenta */}
        <div className="footer__column">
          <h4>Mi Cuenta</h4>
          <ul>
            <li><Link to="/login">Iniciar sesión</Link></li>
            <li><Link to="/registro">Registrarme</Link></li>
          </ul>
        </div>

        {/* Columna 3 - Redes */}
        <div className="footer__column">
          <h4>Seguinos</h4>
          <div className="footer__socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="bi bi-twitter-x"></i>
            </a>
          </div>
        </div>

        {/* Columna 4 - Legal */}
        <div className="footer__column">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terminos">Términos y Condiciones</Link></li>
            <li><Link to="/privacidad">Política de Privacidad</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer__bottom">
        <p>© {year} Ecommerce Motos. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
