import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    categoria: '',
    terminoBusqueda: '',
    precioMin: '',
    precioMax: '',
    marca: '',
    modelo: '',
    destacado: '',
    stock: ''
  });


  const cargarProductos = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      
      const respuesta = await fetch('http://localhost:3001/productos');
      
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
      
      const datos = await respuesta.json();
  
      setProductos(datos);
    } catch (error) {
      setError('No se pudieron cargar los productos. Verifica que json-server esté ejecutándose en http://localhost:3001');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);


  const productosFiltrados = productos.filter(producto => {
    if (filtros.categoria && producto.categoria) {
      if (producto.categoria.toLowerCase() !== filtros.categoria.toLowerCase()) {
        return false;
      }
    }


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

    const precioProducto = parseFloat(producto.precio) || 0;
    if (filtros.precioMin) {
      const precioMin = parseFloat(filtros.precioMin);
      if (precioProducto < precioMin) {
        return false;
      }
    }
    if (filtros.precioMax) {
      const precioMax = parseFloat(filtros.precioMax);
      if (precioProducto > precioMax) {
        return false;
      }
    }


    if (filtros.marca && producto.marca) {
      if (producto.marca.toLowerCase() !== filtros.marca.toLowerCase()) {
        return false;
      }
    }


    if (filtros.modelo && producto.modelo) {
      if (producto.modelo.toLowerCase() !== filtros.modelo.toLowerCase()) {
        return false;
      }
    }

    if (filtros.destacado !== '') {
      const esDestacado = producto.destacado?.toString() || 'false';
      if (esDestacado !== filtros.destacado) {
        return false;
      }
    }


    if (filtros.stock !== '') {
      const tieneStock = producto.stock?.toString() || 'true';
      if (tieneStock !== filtros.stock) {
        return false;
      }
    }

    return true;
  });

  const actualizarFiltros = useCallback((nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  }, []);

  const limpiarFiltros = useCallback(() => {
    setFiltros({
      categoria: '',
      terminoBusqueda: '',
      precioMin: '',
      precioMax: '',
      marca: '',
      modelo: '',
      destacado: '',
      stock: ''
    });
  }, []);

  const filtrarPorCategoria = useCallback((categoria) => {
    setFiltros(prev => ({
      ...prev,
      categoria: categoria
    }));
  }, []);

  const obtenerCategoriasUnicas = useCallback(() => {
    const categorias = productos
      .map(p => p.categoria)
      .filter(categoria => categoria && categoria.trim() !== '');
    return [...new Set(categorias)];
  }, [productos]);

  const obtenerMarcasPorCategoria = useCallback((categoria) => {
    const productosCategoria = categoria 
      ? productos.filter(p => p.categoria === categoria)
      : productos;
    
    const marcas = productosCategoria
      .map(p => p.marca)
      .filter(marca => marca && marca.trim() !== '');
    return [...new Set(marcas)];
  }, [productos]);


  const obtenerProductosPorCategoria = useCallback((categoria) => {
    if (!categoria) return productos;
    return productos.filter(producto => 
      producto.categoria?.toLowerCase() === categoria.toLowerCase()
    );
  }, [productos]);

  
  const obtenerEstadisticas = useCallback(() => {
    const productosPorCategoria = {};
    const productosPorMarca = {};
    
    productos.forEach(producto => {
    
      const categoria = producto.categoria || 'Sin categoría';
      productosPorCategoria[categoria] = (productosPorCategoria[categoria] || 0) + 1;
      
      const marca = producto.marca || 'Sin marca';
      productosPorMarca[marca] = (productosPorMarca[marca] || 0) + 1;
    });

    return {
      total: productos.length,
      porCategoria: productosPorCategoria,
      porMarca: productosPorMarca,
      disponibles: productos.filter(p => p.stock).length,
      sinStock: productos.filter(p => !p.stock).length,
      destacados: productos.filter(p => p.destacado).length,
      categoriasUnicas: Object.keys(productosPorCategoria).length,
      marcasUnicas: Object.keys(productosPorMarca).length
    };
  }, [productos]);


  const obtenerRangoPrecios = useCallback(() => {
    if (productos.length === 0) return { min: 0, max: 0 };
    
    const precios = productos.map(p => parseFloat(p.precio) || 0);
    return {
      min: Math.min(...precios),
      max: Math.max(...precios),
      promedio: precios.reduce((a, b) => a + b, 0) / precios.length
    };
  }, [productos]);

  const buscarSugerencias = useCallback((termino) => {
    if (!termino || termino.length < 2) return [];
    
    return productos
      .filter(producto => {
        const busqueda = termino.toLowerCase();
        return (
          producto.nombre?.toLowerCase().includes(busqueda) ||
          producto.marca?.toLowerCase().includes(busqueda) ||
          producto.modelo?.toLowerCase().includes(busqueda)
        );
      })
      .slice(0, 5);
  }, [productos]);

  const agregarProducto = useCallback(async (producto) => {
    try {
      const nuevoProducto = {
        ...producto,
        id: crypto.randomUUID(),
        fechaCreacion: new Date().toISOString(),
        stock: producto.stock !== undefined ? producto.stock : true,
        destacado: producto.destacado !== undefined ? producto.destacado : false,
        precio: producto.precio.toString()
      };


      const respuesta = await fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto)
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.message || 'Error al agregar producto');
      }

      const productoAgregado = await respuesta.json();
      setProductos(prev => [...prev, productoAgregado]);
      
      return { exito: true, producto: productoAgregado };
    } catch (error) {
 
      return { exito: false, mensaje: error.message };
    }
  }, []);

  const editarProducto = useCallback(async (id, datosActualizados) => {
    try {
      const productoExistente = productos.find(p => p.id === id);
      if (!productoExistente) {
        throw new Error('Producto no encontrado');
      }

      const productoActualizado = {
        ...productoExistente,
        ...datosActualizados,
        fechaModificacion: new Date().toISOString(),
        precio: datosActualizados.precio?.toString() || productoExistente.precio
      };


      const respuesta = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoActualizado)
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.message || 'Error al editar producto');
      }

      const productoEditado = await respuesta.json();
      setProductos(prev => 
        prev.map(p => p.id === id ? productoEditado : p)
      );
      

      return { exito: true, producto: productoEditado };
    } catch (error) {

      return { exito: false, mensaje: error.message };
    }
  }, [productos]);


  const eliminarProducto = useCallback(async (id) => {
    try {


      const respuesta = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'DELETE'
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.text();
        throw new Error(errorData || 'Error al eliminar producto');
      }

      setProductos(prev => prev.filter(p => p.id !== id));
  
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  }, []);

  const obtenerProductoPorId = useCallback((id) => {
    return productos.find(p => p.id === id);
  }, [productos]);

  const obtenerProductosDestacados = useCallback(() => {
    return productos.filter(p => p.destacado);
  }, [productos]);

  const obtenerProductosConStock = useCallback(() => {
    return productos.filter(p => p.stock);
  }, [productos]);

  const obtenerProductosRecientes = useCallback((limite = 5) => {
    return [...productos]
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
      .slice(0, limite);
  }, [productos]);


  const actualizarStockProducto = useCallback(async (id, tieneStock) => {
    const producto = obtenerProductoPorId(id);
    if (!producto) return { exito: false, mensaje: 'Producto no encontrado' };
    
    return await editarProducto(id, { ...producto, stock: tieneStock });
  }, [editarProducto, obtenerProductoPorId]);


  const valorContexto = {
    productos,
    productosFiltrados,
    cargando,
    error,
    filtros,
    

    actualizarFiltros,
    limpiarFiltros,
    filtrarPorCategoria,
    
    obtenerCategoriasUnicas,
    obtenerMarcasPorCategoria,
    obtenerProductosPorCategoria,
    obtenerEstadisticas,
    obtenerRangoPrecios,
    buscarSugerencias,
    obtenerProductoPorId,
    obtenerProductosDestacados,
    obtenerProductosConStock,
    obtenerProductosRecientes,
    

    cargarProductos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    actualizarStockProducto
  };

  return (
    <ContextoProducto.Provider value={valorContexto}>
      {children}
    </ContextoProducto.Provider>
  );
};