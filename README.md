# Proyecto2Rolling - Plataforma de E-commerce de Motocicletas

Una aplicación web moderna desarrollada con **React + Vite** para la venta y gestión de motocicletas y accesorios. Incluye autenticación de usuarios, carrito de compras, panel de administración y múltiples idiomas.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Configuración](#configuración)
- [Rutas](#rutas)
- [Contextos (State Management)](#contextos-state-management)
- [Componentes Principales](#componentes-principales)
- [Base de Datos](#base-de-datos)
- [Autenticación](#autenticación)
- [Licencia](#licencia)

---

## 🎯 Características

✅ **Autenticación de Usuarios**
- Registro e inicio de sesión
- Recuperación de contraseñas
- Gestión de perfil

✅ **Catálogo de Productos**
- Búsqueda y filtrado de motocicletas
- Vista detallada de productos
- Oferta especial de productos destacados
- Categorías: Protecciones, Indumentaria, Taller, Motocicletas

✅ **Carrito de Compras**
- Agregar/eliminar productos
- Persistencia en localStorage
- Cálculo automático de totales
- Historial de compras

✅ **Panel de Administración**
- Gestión de productos (CRUD)
- Visualización de usuarios
- Mapa de usuarios con geolocalización
- Estadísticas de ventas

✅ **Funcionalidades Adicionales**
- Multiidioma (i18next)
- Contacto por email (EmailJS)
- Mapa interactivo (Leaflet)
- Notificaciones (react-hot-toast)
- Animaciones (Framer Motion, AOS)
- Formularios validados (React Hook Form + Zod)

---

## 🛠️ Tecnologías

### Frontend
- **React 19.2.0** - Librería UI
- **Vite 7.2.4** - Build tool & dev server
- **React Router DOM 7.9.6** - Enrutamiento
- **React Bootstrap 2.10.10** - Componentes UI

### State Management
- **Context API** - Gestión de estado (Usuarios, Productos, Carrito)

### Formularios & Validación
- **React Hook Form 7.66.1** - Manejo de formularios
- **Zod 4.1.13** - Validación de esquemas

### Librerías Utilitarias
- **i18next + react-i18next** - Multiidioma
- **EmailJS** - Envío de emails
- **Leaflet + React Leaflet** - Mapas interactivos
- **React Hot Toast** - Notificaciones
- **Framer Motion** - Animaciones avanzadas
- **AOS** - Animaciones al scroll
- **React Icons** - Iconos SVG

### Backend (Simulado)
- **JSON Server 1.0.0-beta.3** - API REST simulada

### Herramientas de Desarrollo
- **ESLint 9.39.1** - Linting
- **Vite SWC Plugin** - Transpilación rápida

---

## 📦 Instalación

### Requisitos Previos
- **Node.js** >= 18.x
- **npm** >= 9.x (o yarn/pnpm)

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tomasgomez18/Proyecto2-Rolling.git
   cd Proyecto2-Rolling
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (opcional)
   - Crear archivo `.env` en la raíz:
   ```env
   VITE_API_URL=http://localhost:3001
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Iniciar la aplicación**
   ```bash
   npm run dev
   ```
   La app estará disponible en `http://localhost:5173`

5. **Iniciar JSON Server (opcional, para backend simulado)**
   ```bash
   npm run server
   ```
   API disponible en `http://localhost:3001`

---

## 📁 Estructura del Proyecto

```
src/
├── Componentes/
│   ├── Admin/                      # Panel administrativo
│   │   ├── AdminPanel.jsx
│   │   └── MapaUsuarios.jsx
│   ├── Context/                    # Context API providers
│   │   ├── ContextoUsuario.jsx     # Gestión de usuarios
│   │   ├── ContextoProducto.jsx    # Gestión de productos
│   │   └── ContextoCarrito.jsx     # Gestión del carrito
│   ├── Shared/                     # Componentes compartidos
│   │   ├── Menu/
│   │   │   ├── Menu.jsx
│   │   │   ├── NavBarPrincipal/    # Barra de navegación
│   │   │   └── MenuUsuario/        # Menú de usuario
│   │   └── Footer/
│   ├── Utils/                      # Utilidades
│   │   ├── UsuarioStorage.jsx      # Persistencia de usuario
│   │   ├── RutaProtegida.jsx       # Rutas protegidas
│   │   ├── ValidacionesForm.jsx    # Esquemas Zod
│   │   ├── CoordenadasPaises.jsx   # Datos para mapa
│   │   └── I18next.js              # Config i18next
│   └── Views/                      # Páginas/Vistas
│       ├── Home/                   # Página de inicio
│       ├── Login/
│       ├── Registro/
│       ├── Contacto/
│       ├── Nosotros/
│       ├── Pagina404/
│       ├── Productos/              # Catálogo
│       │   ├── Productos.jsx
│       │   ├── Ofertas.jsx
│       │   ├── ComponenteProducto/
│       │   │   ├── PaginaProductos/
│       │   │   │   ├── PaginaProductos.jsx
│       │   │   │   ├── Detalle-Producto/
│       │   │   │   ├── componenteBuscarProducto/
│       │   │   │   ├── card-Producto/
│       │   │   │   └── Lista-Productos/
│       │   │   └── Categorias/
│       ├── ComponenteCarrito/      # Carrito de compras
│       └── pages/                  # Páginas de categorías
├── App.jsx                         # Componente raíz
├── main.jsx                        # Punto de entrada
├── App.css
└── index.html
```

---

## 🚀 Scripts Disponibles

```bash
# Iniciar servidor de desarrollo (Vite)
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción localmente
npm run preview

# Ejecutar linter (ESLint)
npm run lint

# Iniciar JSON Server (backend simulado)
npm run server
```

---

## 🔌 Rutas Principales

| Ruta | Componente | Descripción |
|------|-----------|------------|
| `/` | Home | Página de inicio |
| `/productos` | PaginaProductos | Catálogo de productos |
| `/productos-todos` | Productos | Vista completa de productos |
| `/detalle-producto` | DetalleProducto | Detalles de un producto |
| `/carrito` | Carrito | Carrito de compras |
| `/ofertas` | Ofertas | Productos en oferta |
| `/contacto` | Contacto | Formulario de contacto |
| `/login` | Login | Inicio de sesión |
| `/registro` | Registro | Registro de usuario |
| `/admin` | AdminPanel | Panel de administración (protegido) |
| `/404` | Pagina404 | Página no encontrada |

---

## 🎛️ Contextos (State Management)

### 1. **ContextoUsuario** (`useUser`)
Maneja la autenticación y datos del usuario.

```jsx
const { usuario, login, logout, actualizarPerfil } = useUser();
```

**Funciones:**
- `login(email, password)` - Autenticar usuario
- `logout()` - Cerrar sesión
- `registrar(datos)` - Crear cuenta
- `actualizarPerfil(datos)` - Actualizar información

---

### 2. **ContextoProducto** (`useProductos`)
Gestiona el catálogo de productos.

```jsx
const { productos, cargar, agregar, actualizar, eliminar } = useProductos();
```

**Funciones:**
- `cargar()` - Obtener lista de productos
- `agregar(producto)` - Crear producto
- `actualizar(id, datos)` - Modificar producto
- `eliminar(id)` - Eliminar producto

---

### 3. **ContextoCarrito** (`useCarrito`)
Maneja el carrito de compras (persistido en localStorage).

```jsx
const { carrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito } = useCarrito();
```

**Funciones:**
- `agregarAlCarrito(producto)` - Añadir producto
- `eliminarDelCarrito(id)` - Remover producto
- `actualizarCantidad(id, cantidad)` - Cambiar cantidad
- `vaciarCarrito()` - Limpiar carrito

---

## 🧩 Componentes Principales

### Menu / NavBar
- Navegación principal con enlaces a todas las secciones
- Carrito con contador de items
- Menú de usuario (Login/Perfil/Logout)

### Catálogo de Productos
- Búsqueda por texto
- Filtros (precio, marca, año)
- Tarjetas de producto con imagen, precio y botón de compra

### Carrito de Compras
- Vista de items con cantidad
- Cálculo de subtotal, impuestos y total
- Opciones para aumentar/disminuir cantidad
- Botón para proceder al checkout

### Panel de Administración
- Tabla de productos con opciones CRUD
- Visualización de usuarios registrados
- Mapa interactivo con ubicación de usuarios

---

## 💾 Base de Datos

Se usa **JSON Server** para simular una API REST.

**Archivo:** `db.json` (en la raíz del proyecto)

**Iniciar servidor:**
```bash
npm run server
```

---

## 🔐 Autenticación

### Flujo de Login
1. Usuario ingresa email y contraseña en `/login`
2. Se valida contra la base de datos (JSON Server)
3. Si es válido, se guarda en `localStorage` y `Context`
4. Token/sesión persiste en `UsuarioStorage`

### Rutas Protegidas
El panel de administración (`/admin`) usa `RutaProtegida` para validar que el usuario sea admin antes de permitir acceso.

```jsx
<Route path="/admin" element={<RutaProtegida><AdminPanel /></RutaProtegida>} />
```

---

## 🌍 Multiidioma (i18next)

Configurado en `Componentes/Utils/I18next.js`.

**Idiomas soportados:** Español, Inglés, Portugués (configurable)

**Uso:**
```jsx
import { useTranslation } from 'react-i18next';

function Componente() {
  const { t } = useTranslation();
  return <h1>{t('home.titulo')}</h1>;
}
```

---

## 📧 Contacto por Email

Integrado con **EmailJS**.

**Configuración necesaria en `.env`:**
```env
VITE_EMAILJS_SERVICE_ID=service_...
VITE_EMAILJS_TEMPLATE_ID=template_...
VITE_EMAILJS_PUBLIC_KEY=public_key_...
```

---

## 🗺️ Mapa Interactivo

Usa **Leaflet** y **React Leaflet**.

Visible en:
- Panel de Admin (ubicación de usuarios)
- Página de Contacto (ubicación de la empresa)

---

## ⚡ Optimizaciones

- **Lazy Loading:** Componentes cargados con React.lazy
- **Memoización:** Uso de `useCallback` y `useMemo` en contextos
- **localStorage:** Persistencia de carrito y sesión de usuario
- **Code Splitting:** Vite genera chunks optimizados en build

---

## 🐛 Solución de Problemas

### Página en blanco al ejecutar `npm run dev`
1. Verifica que `react-router-dom` esté instalado
2. Revisa la consola del navegador (F12) para errores
3. Asegúrate de que imports locales usen extensión `.jsx`

### Carrito no persiste
- Verifica que localStorage no esté bloqueado
- Abre DevTools → Application → Storage → LocalStorage

### EmailJS no funciona
- Comprueba las credenciales en `.env`
- Verifica que el template de EmailJS exista

---

## 📝 Contribuir

1. Crea una rama para tu feature: `git checkout -b feature/mi-feature`
2. Commit cambios: `git commit -m "Feat: mi feature"`
3. Push a rama: `git push origin feature/mi-feature`
4. Abre Pull Request

---

## 📄 Licencia

Proyecto desarrollado para **Rolling Code School**. Derechos reservados.

---

## 👤 Autor

**Tomás Gómez**  
GitHub: [@tomasgomez18](https://github.com/tomasgomez18)

---

## 🔗 Enlaces Útiles

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [React Router Docs](https://reactrouter.com)
- [Bootstrap Docs](https://getbootstrap.com)
- [i18next Docs](https://www.i18next.com)

---

**Última actualización:** 3 de Diciembre de 2025
