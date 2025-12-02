import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        login: "Login",
        register: "Register",
        profile: "Profile",
        contact: "Contact",
        support: "Support",
        logout: "Logout",
        home: "Home",
        products: "Products",
        
        changeLanguage: "Change language",
        shoppingCart: "Shopping Cart",
        userMenu: "User Menu"
      }
    },
    es: {
      translation: {
        login: "Iniciar sesión",
        register: "Registrarse",
        profile: "Perfil",
        contact: "Contacto",
        support: "Soporte",
        logout: "Cerrar sesión",
        home: "Inicio",
        products: "Productos",
        
        changeLanguage: "Cambiar idioma",
        shoppingCart: "Carrito de compras",
        userMenu: "Menú de usuario"
      }
    }
  },
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;