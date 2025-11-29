import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Contacto from "./components/views/contacto/Contacto";
import { Component } from "react";
 /*
export default class MapContainer extends Component {
  render () {
    return (

    );
  }
}*/




function App() {
  return (
    <>
  
      <BrowserRouter>
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

