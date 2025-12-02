import React, { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider = ({ children }) => {
  const [itemsCarrito, setItemsCarrito] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carritoMotos');
    if (carritoGuardado) {
      try {
        const carritoParseado = JSON.parse(carritoGuardado);
        console.log('📥 Carrito cargado desde localStorage:', carritoParseado);
        setItemsCarrito(carritoParseado);
      } catch (error) {
        console.error('Error cargando carrito:', error);
        localStorage.removeItem('carritoMotos');
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    console.log('💾 Guardando carrito en localStorage:', itemsCarrito);
    localStorage.setItem('carritoMotos', JSON.stringify(itemsCarrito));
  }, [itemsCarrito]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto, cantidad = 1) => {
    console.log('🛍️ AGREGANDO AL CARRITO - Producto recibido:', producto);
    
    // Asegurar que el producto tenga un ID único
    const productoConId = {
      ...producto,
      id: producto.id || `producto-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    setItemsCarrito(prevItems => {
      console.log('📦 Estado anterior del carrito:', prevItems);
      
      // Verificar si el producto ya está en el carrito
      const productoExistenteIndex = prevItems.findIndex(item => 
        item.id === productoConId.id
      );
      
      if (productoExistenteIndex !== -1) {
        // Si existe, actualizar cantidad
        const nuevosItems = [...prevItems];
        nuevosItems[productoExistenteIndex] = {
          ...nuevosItems[productoExistenteIndex],
          cantidad: nuevosItems[productoExistenteIndex].cantidad + cantidad
        };
        console.log('➕ Producto existente actualizado:', nuevosItems[productoExistenteIndex]);
        return nuevosItems;
      } else {
        // Si no existe, agregar nuevo
        const nuevoItem = {
          id: productoConId.id,
          nombre: `${productoConId.marca} ${productoConId.modelo}`,
          precio: parseFloat(productoConId.precio) || 0,
          cantidad: cantidad,
          imagen: productoConId.imagen,
          productoOriginal: productoConId,
          descuento: 0,
          marca: productoConId.marca,
          modelo: productoConId.modelo
        };
        console.log('✅ Nuevo producto agregado:', nuevoItem);
        const nuevosItems = [...prevItems, nuevoItem];
        console.log('🛒 Nuevo estado del carrito:', nuevosItems);
        return nuevosItems;
      }
    });
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (productoId) => {
    console.log('🗑️ Eliminando producto del carrito ID:', productoId);
    setItemsCarrito(prevItems => prevItems.filter(item => item.id !== productoId));
  };

  // Actualizar cantidad de un producto
  const actualizarCantidad = (productoId, nuevaCantidad) => {
    console.log('🔢 Actualizando cantidad producto ID:', productoId, 'a:', nuevaCantidad);
    if (nuevaCantidad < 1) {
      eliminarDelCarrito(productoId);
      return;
    }

    setItemsCarrito(prevItems =>
      prevItems.map(item =>
        item.id === productoId ? { ...item, cantidad: nuevaCantidad } : item
      )
    );
  };

  // Vaciar todo el carrito
  const vaciarCarrito = () => {
    console.log('🧹 Vaciando carrito completo');
    setItemsCarrito([]);
  };

  // Calcular subtotal
  const calcularSubtotal = () => {
    const subtotal = itemsCarrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    return subtotal;
  };

  // Calcular total de productos
  const calcularTotalProductos = () => {
    const total = itemsCarrito.reduce((total, item) => total + item.cantidad, 0);
    return total;
  };

  // Verificar si un producto está en el carrito
  const estaEnCarrito = (productoId) => {
    return itemsCarrito.some(item => item.id === productoId);
  };

  // Obtener la cantidad de un producto en el carrito
  const obtenerCantidadProducto = (productoId) => {
    const item = itemsCarrito.find(item => item.id === productoId);
    return item ? item.cantidad : 0;
  };

  const valorContexto = {
    itemsCarrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    calcularSubtotal,
    calcularTotalProductos,
    estaEnCarrito,
    obtenerCantidadProducto
  };

  return (
    <CarritoContext.Provider value={valorContexto}>
      {children}
    </CarritoContext.Provider>
  );
};