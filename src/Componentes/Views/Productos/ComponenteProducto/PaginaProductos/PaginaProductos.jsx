import React, { useEffect, useState } from 'react';
import { useProductos } from '../../../../Context/ContextoProducto';
import CardProducto from './card-Producto/CardProducto';
import './Lista-Productos/ListaProducto.css';

const ListaProductos = () => {
  const { productos, cargando, filtros, actualizarFiltros, limpiarFiltros } = useProductos();
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  useEffect(() => {
    if (productos) {
      const filtrados = productos.filter(producto => {
        // Filtro por categoría
        if (filtros.categoria && producto.categoria !== filtros.categoria) {
          return false;
        }
        
        // Filtro por búsqueda
        if (filtros.terminoBusqueda) {
          const termino = filtros.terminoBusqueda.toLowerCase();
          const coincideNombre = producto.nombre?.toLowerCase().includes(termino);
          const coincideMarca = producto.marca?.toLowerCase().includes(termino);
          const coincideModelo = producto.modelo?.toLowerCase().includes(termino);
          const coincideDescripcion = producto.descripcion?.toLowerCase().includes(termino);
          
          if (!(coincideNombre || coincideMarca || coincideModelo || coincideDescripcion)) {
            return false;
          }
        }
        
        // Filtro por precio
        if (filtros.precioMin && parseFloat(producto.precio) < parseFloat(filtros.precioMin)) {
          return false;
        }
        if (filtros.precioMax && parseFloat(producto.precio) > parseFloat(filtros.precioMax)) {
          return false;
        }
        
        // Filtro por marca
        if (filtros.marca && producto.marca !== filtros.marca) {
          return false;
        }
        
        // Filtro por stock
        if (filtros.soloStock && !producto.stock) {
          return false;
        }
        
        return true;
      });
      
      setProductosFiltrados(filtrados);
    }
  }, [productos, filtros]);

  if (cargando) {
    return <div className="cargando-productos">Cargando productos...</div>;
  }

  return (
    <div className="contenedor-productos">
      {/* Filtros */}
      <div className="filtros-productos">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={filtros.terminoBusqueda}
          onChange={(e) => actualizarFiltros({ terminoBusqueda: e.target.value })}
        />
        
        <select
          value={filtros.categoria}
          onChange={(e) => actualizarFiltros({ categoria: e.target.value })}
        >
          <option value="">Todas las categorías</option>
          {[...new Set(productos.map(p => p.categoria))].map(categoria => (
            <option key={categoria} value={categoria}>{categoria}</option>
          ))}
        </select>
        
        <select
          value={filtros.marca}
          onChange={(e) => actualizarFiltros({ marca: e.target.value })}
        >
          <option value="">Todas las marcas</option>
          {[...new Set(productos.map(p => p.marca))].map(marca => (
            <option key={marca} value={marca}>{marca}</option>
          ))}
        </select>
        
        <button onClick={limpiarFiltros}>Limpiar filtros</button>
      </div>

      {/* Lista de productos */}
      <div className="grid-productos">
        {productosFiltrados.map((producto) => (
          <CardProducto
            key={producto.id}
            marca={producto.marca}
            modelo={producto.modelo}
            año={producto.año}
            precio={producto.precio}
            imagen={producto.imagen}
            kilometros={producto.kilometros}
            ubicacion={producto.ubicacion}
            descripcion={producto.descripcion}
            destacado={producto.destacado}
            stock={producto.stock}
          />
        ))}
      </div>
      
      {productosFiltrados.length === 0 && (
        <div className="sin-resultados">
          No se encontraron productos que coincidan con los filtros.
        </div>
      )}
    </div>
  );
};

export default ListaProductos;