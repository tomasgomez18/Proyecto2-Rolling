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

  // Cargar productos desde json-server - memoizado para evitar loops
  const cargarProductos = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      console.log('🔍 Cargando productos de json-server...');
      
      const respuesta = await fetch('http://localhost:3001/productos');
      
      if (!respuesta.ok) {
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
      
      const datos = await respuesta.json();
      console.log(`✅ ${datos.length} productos cargados`);
      setProductos(datos);
    } catch (error) {
      console.error('❌ Error cargando productos:', error);
      setError('No se pudieron cargar los productos. Verifica que json-server esté ejecutándose en http://localhost:3001');
    } finally {
      setCargando(false);
    }
  }, []);

  // Cargar productos al iniciar
  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  // Filtrar productos según los filtros activos
  const productosFiltrados = productos.filter(producto => {
    // 1. Filtrar por categoría
    if (filtros.categoria && producto.categoria) {
      if (producto.categoria.toLowerCase() !== filtros.categoria.toLowerCase()) {
        return false;
      }
    }

    // 2. Filtrar por término de búsqueda
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

    // 3. Filtrar por precio
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

    // 4. Filtrar por marca
    if (filtros.marca && producto.marca) {
      if (producto.marca.toLowerCase() !== filtros.marca.toLowerCase()) {
        return false;
      }
    }

    // 5. Filtrar por modelo
    if (filtros.modelo && producto.modelo) {
      if (producto.modelo.toLowerCase() !== filtros.modelo.toLowerCase()) {
        return false;
      }
    }

    // 6. Filtrar por destacado
    if (filtros.destacado !== '') {
      const esDestacado = producto.destacado?.toString() || 'false';
      if (esDestacado !== filtros.destacado) {
        return false;
      }
    }

    // 7. Filtrar por stock
    if (filtros.stock !== '') {
      const tieneStock = producto.stock?.toString() || 'true';
      if (tieneStock !== filtros.stock) {
        return false;
      }
    }

    return true;
  });

  // Función para actualizar filtros
  const actualizarFiltros = useCallback((nuevosFiltros) => {
    setFiltros(prev => ({ ...prev, ...nuevosFiltros }));
  }, []);

  // Función para limpiar todos los filtros
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

  // Función específica para filtrar por categoría
  const filtrarPorCategoria = useCallback((categoria) => {
    setFiltros(prev => ({
      ...prev,
      categoria: categoria
    }));
  }, []);

  // Obtener todas las categorías únicas de los productos
  const obtenerCategoriasUnicas = useCallback(() => {
    const categorias = productos
      .map(p => p.categoria)
      .filter(categoria => categoria && categoria.trim() !== '');
    return [...new Set(categorias)];
  }, [productos]);

  // Obtener marcas únicas para una categoría específica
  const obtenerMarcasPorCategoria = useCallback((categoria) => {
    const productosCategoria = categoria 
      ? productos.filter(p => p.categoria === categoria)
      : productos;
    
    const marcas = productosCategoria
      .map(p => p.marca)
      .filter(marca => marca && marca.trim() !== '');
    return [...new Set(marcas)];
  }, [productos]);

  // Obtener todos los productos de una categoría específica
  const obtenerProductosPorCategoria = useCallback((categoria) => {
    if (!categoria) return productos;
    return productos.filter(producto => 
      producto.categoria?.toLowerCase() === categoria.toLowerCase()
    );
  }, [productos]);

  // Obtener estadísticas de productos
  const obtenerEstadisticas = useCallback(() => {
    const productosPorCategoria = {};
    const productosPorMarca = {};
    
    productos.forEach(producto => {
      // Por categoría
      const categoria = producto.categoria || 'Sin categoría';
      productosPorCategoria[categoria] = (productosPorCategoria[categoria] || 0) + 1;
      
      // Por marca
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

  // Obtener rango de precios
  const obtenerRangoPrecios = useCallback(() => {
    if (productos.length === 0) return { min: 0, max: 0 };
    
    const precios = productos.map(p => parseFloat(p.precio) || 0);
    return {
      min: Math.min(...precios),
      max: Math.max(...precios),
      promedio: precios.reduce((a, b) => a + b, 0) / precios.length
    };
  }, [productos]);

  // Buscar productos por término (para autocompletar)
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

  // Agregar un nuevo producto
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

      console.log('📤 Agregando producto:', nuevoProducto);

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
      
      console.log('✅ Producto agregado:', productoAgregado);
      return { exito: true, producto: productoAgregado };
    } catch (error) {
      console.error('❌ Error agregando producto:', error);
      return { exito: false, mensaje: error.message };
    }
  }, []);

  // Editar producto existente
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

      console.log('📝 Editando producto:', productoActualizado);

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
      
      console.log('✅ Producto editado:', productoEditado);
      return { exito: true, producto: productoEditado };
    } catch (error) {
      console.error('❌ Error editando producto:', error);
      return { exito: false, mensaje: error.message };
    }
  }, [productos]);

  // Eliminar producto
  const eliminarProducto = useCallback(async (id) => {
    try {
      console.log('🗑️ Eliminando producto ID:', id);

      const respuesta = await fetch(`http://localhost:3001/productos/${id}`, {
        method: 'DELETE'
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.text();
        throw new Error(errorData || 'Error al eliminar producto');
      }

      setProductos(prev => prev.filter(p => p.id !== id));
      console.log('✅ Producto eliminado');
      return { exito: true };
    } catch (error) {
      console.error('❌ Error eliminando producto:', error);
      return { exito: false, mensaje: error.message };
    }
  }, []);

  // Obtener producto por ID
  const obtenerProductoPorId = useCallback((id) => {
    return productos.find(p => p.id === id);
  }, [productos]);

  // Obtener productos destacados
  const obtenerProductosDestacados = useCallback(() => {
    return productos.filter(p => p.destacado);
  }, [productos]);

  // Obtener productos con stock
  const obtenerProductosConStock = useCallback(() => {
    return productos.filter(p => p.stock);
  }, [productos]);

  // Obtener productos recientes
  const obtenerProductosRecientes = useCallback((limite = 5) => {
    return [...productos]
      .sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion))
      .slice(0, limite);
  }, [productos]);

  // Actualizar estado de stock
  const actualizarStockProducto = useCallback(async (id, tieneStock) => {
    const producto = obtenerProductoPorId(id);
    if (!producto) return { exito: false, mensaje: 'Producto no encontrado' };
    
    return await editarProducto(id, { ...producto, stock: tieneStock });
  }, [editarProducto, obtenerProductoPorId]);

  // Valor del contexto
  const valorContexto = {
    // Datos
    productos,
    productosFiltrados,
    cargando,
    error,
    filtros,
    
    // Funciones de filtrado
    actualizarFiltros,
    limpiarFiltros,
    filtrarPorCategoria,
    
    // Funciones de obtención de datos
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
    
    // Funciones CRUD
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