import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProductos } from '../../../../Context/ContextoProducto';
import BuscadorProducto from './componenteBuscarProducto/BuscadorProducto';
import ListaProductos from './Lista-Productos/ListaProductos';
import './PaginaProductos.css';

const PaginaProductos = () => {
  const location = useLocation();
  const { actualizarFiltros, filtros } = useProductos();

  // Obtener la categoría desde la navegación y aplicarla como filtro
  useEffect(() => {
    if (location.state?.categoriaSeleccionada) {
      actualizarFiltros({ 
        categoria: location.state.categoriaSeleccionada 
      },[]);
    }
  }, [location.state, actualizarFiltros]);

  return (
    <div className="contenedor-pagina-productos">
      <div className="encabezado-productos">
        <h1 className="titulo-pagina">
          {filtros.categoria 
            ? `Productos - ${filtros.categoria.charAt(0).toUpperCase() + filtros.categoria.slice(1)}`
            : 'Todos nuestros productos'
          }
        </h1>
        <p className="descripcion-pagina">
          Encuentra exactamente lo que necesitas para tu moto
        </p>
      </div>

      <BuscadorProducto />
      
      <ListaProductos />
    </div>
  );
};

export default PaginaProductos;