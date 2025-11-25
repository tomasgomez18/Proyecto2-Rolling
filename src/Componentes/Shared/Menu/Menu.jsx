import { useLocation, useNavigate } from "react-router-dom";
import { NavBarPrincipal } from "./NavBarPrincipal/NavBarPrincipal";
import { Registro } from "../../Views/Registro/Registro";
import Login from "../../Views/Login/Login";
const Menu = () => {
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const parametroBusqueda = new URLSearchParams(ubicacion.search);
  const tipoModal = parametroBusqueda.get("modal");

  const onClose = () => {
    navigate(ubicacion.pathname);
  };

  const abrirLogin = () => {
    navigate("/?modal=login");
  };

  const abrirRegistro = () => {
    navigate("/?modal=registro");
  };

  return (
    <>
      <NavBarPrincipal
        key="navbar"
        onAbrirRegistro={abrirRegistro}
        onAbrirLogin={abrirLogin}
      />
      {tipoModal === "login" && (
        <Login
          key="login-modal"
          onClose={onClose}
          onAbrirRegistro={abrirRegistro}
        />
      )}
      {tipoModal === "registro" && (
        <Registro key="registro-modal" onClose={onClose} />
      )}
    </>
  );
};
export default Menu;
