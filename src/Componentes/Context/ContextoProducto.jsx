import React, { createContext, useContext, useState, useEffect } from 'react';

const ContextoProducto = createContext();

export const useProductos = () => {
  const context = useContext(ContextoProducto);
  if (!context) {
    throw new Error('useProductos debe ser usado dentro de un ProveedorProductos');
  }
  return context;
};

export const ProveedorProductos = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState({
    categoria: '',
    terminoBusqueda: '',
    precioMin: '',
    precioMax: '',
    marca: '',
    modelo: ''
  });

  // Cargar productos desde json-server
  const cargarProductos = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch('http://localhost:3001/productos');
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Filtrar productos según los filtros activos
  const productosFiltrados = productos.filter(producto => {
    // Filtrar por categoría
    if (filtros.categoria && producto.categoria !== filtros.categoria) {
      return false;
    }

    // Filtrar por término de búsqueda
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

    // Filtrar por precio
    if (filtros.precioMin && producto.precio < parseInt(filtros.precioMin)) {
      return false;
    }
    if (filtros.precioMax && producto.precio > parseInt(filtros.precioMax)) {
      return false;
    }

    // Filtrar por marca
    if (filtros.marca && producto.marca !== filtros.marca) {
      return false;
    }

    // Filtrar por modelo
    if (filtros.modelo && producto.modelo !== filtros.modelo) {
      return false;
    }

    return true;
  });

  const actualizarFiltros = (nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      categoria: '',
      terminoBusqueda: '',
      precioMin: '',
      precioMax: '',
      marca: '',
      modelo: ''
    });
  };

  const valorContexto = {
    productos,
    productosFiltrados,
    cargando,
    filtros,
    actualizarFiltros,
    limpiarFiltros,
    cargarProductos
  };

  return (
    <ContextoProducto.Provider value={valorContexto}>
      {children}
    </ContextoProducto.Provider>
  );
};