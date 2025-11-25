import { useLocation, useNavigate } from "react-router-dom";
 feature/Login
import { NavBarPrincipal } from "./NavBarPrincipal/NavBarPrincipal";
import { Registro } from "../../Views/Registro/Registro";
import Login from "../../Views/Login/Login";
const Menu = () => {
  const navigate = useNavigate();

  const ubicacion = useLocation();
  const parametroBusqueda = new URLSearchParams(ubicacion.search);
  const tipoModal = parametroBusqueda.get("modal");
  console.log("Parámetro modal:", tipoModal);
  console.log("Ubicación completa:", ubicacion);


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
          
      {tipoModal === "login" && <Login onClose={onClose} onAbrirRegistro={abrirRegistro} />}
      {tipoModal === "registro" && <Registro onClose={onClose} />}
    </>
  );
};
export default Menu;
