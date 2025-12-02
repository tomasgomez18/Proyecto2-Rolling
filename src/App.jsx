import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Menu from "./Componentes/Shared/Menu/Menu";
import Home from "./Componentes/Views/Home/Home";
import Pagina404 from './Components/Views/Pagina404/Pagina404'
import Ofertas from "./Componentes/Views/Productos/Ofertas/Ofertas";
import PaginaProductos from "./Componentes/Views/Productos/ComponenteProducto/PaginaProductos/PaginaProductos";
import Contacto from "./Componentes/Views/Contacto/Contacto";
import Nosotros from './Components/Views/Nosotros/Nosotros'
import AdminPanel from "./Componentes/Admin/AdminPanel";
import RutaProtegida from "./Componentes/Utils/RutaProtegida";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { UserStorage } from "./Componentes/Utils/UsuarioStorage";
import { UserProvider } from "./Componentes/Context/ContextoUsuario";
import { ProveedorProductos } from "./Componentes/Context/ContextoProducto";
import DetalleProducto from "./Componentes/Views/Productos/ComponenteProducto/PaginaProductos/Detalle-Producto/DetalleProducto"
import Productos from "./Componentes/Views/Productos/Productos";

function App() {
  useEffect(() => {
    UserStorage.Backup().then((resultado) => {
      if (resultado.carga) {
        console.log("Backup ejecutado", resultado.mensaje);
      }
    });
  }, []);

function App() {
  return (
    <>
      <ProveedorProductos>
        <UserProvider>
          <BrowserRouter>
            <Menu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path='/Nosotros' element={<Nosotros/>}/>
              <Route path="/productos" element={<PaginaProductos />} />
              <Route path="/productos-todos" element={<Productos />} />
              <Route path="/detalleProducto" element={<DetalleProducto />} />
              <Route path='/404' element={<Pagina404/> }/>
              <Route path="/contacto" element={<Contacto />} />

              <Route
                path="/admin"
                element={
                  <RutaProtegida>
                    <AdminPanel />
                  </RutaProtegida>
                }
              />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </ProveedorProductos>
    </>
  );
}

export default App;
