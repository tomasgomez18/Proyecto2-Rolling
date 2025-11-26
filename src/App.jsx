import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Menu from "./Componentes/Shared/Menu/Menu";
import { Home } from "./Componentes/Views/Home/Home";
import Contacto from "./Componentes/Views/Contacto/Contacto";
import AdminDiseño from "./Componentes/Admin/AdminDiseño";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { UserStorage } from "./Componentes/Utils/UserStorage";

function App() {
  useEffect(() =>{
    UserStorage.Backup().then(resultado => {
      if(resultado.carga){
        console.log("Backup ejecutado",resultado.mensaje);
      }
    })
  },[]);
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto/> } />
          <Route path="/admin" element={<AdminDiseño />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
