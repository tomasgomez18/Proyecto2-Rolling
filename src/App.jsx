import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Menu from "./Componentes/Shared/Menu/Menu";
import { Home } from "./Componentes/Views/Home/Home";
import Contacto from "./Componentes/Views/Contacto/Contacto";
import AdminPanel from "./Componentes/Admin/AdminPanel";
import RutaProtegida from "./Componentes/Utils/RutaProtegida"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { UserStorage } from "./Componentes/Utils/UserStorage";
import { UserProvider } from "./Componentes/Context/ContextoUsuario"; 

function App() {
  useEffect(() => {
    UserStorage.Backup().then(resultado => {
      if(resultado.carga){
        console.log("Backup ejecutado",resultado.mensaje);
      }
    })
  }, []);

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto/> } />
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
    </>
  );
}

export default App;