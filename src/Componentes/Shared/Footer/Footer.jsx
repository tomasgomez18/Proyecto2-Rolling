import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__column">
          <h4>Navegación</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/categorias">Categorías</Link></li>
            <li><Link to="/404">Ofertas</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        <div className="footer__column">
          <h4>Mi Cuenta</h4>
          <ul>
            <li><Link to="/404">Iniciar sesión</Link></li>
            <li><Link to="/404">Registrarme</Link></li>
          </ul>
        </div>

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

        <div className="footer__column">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/404">Términos y Condiciones</Link></li>
            <li><Link to="/404">Política de Privacidad</Link></li>
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