import { useLocation, useNavigate } from "react-router-dom";
import { NavBarPrincipal } from "./NavbarPrincipal/NavBarPrincipal";
import { Login } from "../../Views/Login/Login"; // ← AÑADIR ESTO
import { Registro } from "../../Views/Registro/Registro";

const Menu = () => {
  const navigate = useNavigate();

  const ubicacion = useLocation();
  const parametroBusqueda = new URLSearchParams(ubicacion.search);
  const tipoModal = parametroBusqueda.get("modal");

  const onClose = () => {
    console.log("Cerrar modal ejecutado");
    console.log("Ruta actual que cerramos:", ubicacion.pathname);

    navigate(ubicacion.pathname);
    return;
  };
  const abrirLogin = () => {
    console.log("entra modal registro login");
    navigate("/?modal=login");
  };
  const abrirRegistro = () => {
    console.log("entra modal registro");
    navigate("/?modal=registro");
  };
  return (
    <>
      <NavBarPrincipal
        onAbrirRegistro={abrirRegistro}
        onAbrirLogin={abrirLogin}
      />
      {tipoModal === "login" && <Login onClose={onClose} />}{" "}
      {tipoModal === "registro" && <Registro onClose={onClose} />}
    </>
  );
};
export default Menu;
