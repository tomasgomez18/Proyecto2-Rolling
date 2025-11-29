import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Componentes/Shared/Menu/Menu.jsx";
import { Home } from "./Componentes/Views/Home/Home.jsx";
import "./App.css";


function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
