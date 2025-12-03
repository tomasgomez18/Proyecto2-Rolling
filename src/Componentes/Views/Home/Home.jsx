import Producto from '../Productos/Productos';
import Galeria from './galeria/Galeria';
import Portada from './inicio/Portada';

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