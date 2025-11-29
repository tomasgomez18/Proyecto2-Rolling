import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contacto from "./components/views/contacto/Contacto";
import { Component } from "react";




function App() {
  return (
    <>
  
      <BrowserRouter>
      <menu></menu>
        <main>
          <Routes>
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;

