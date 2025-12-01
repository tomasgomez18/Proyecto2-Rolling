
import React from 'react'
import Ofertas from "../Productos/Ofertas/Ofertas";
import Producto from '../Productos/Productos';
import Galeria from './galeria/galeria';
import Portada from './portada/Portada';

const Home = () => {
  return (
    <div>
      <Portada/>
      <Galeria/>
      <Producto/>
    </div>
  )
}
export default Home