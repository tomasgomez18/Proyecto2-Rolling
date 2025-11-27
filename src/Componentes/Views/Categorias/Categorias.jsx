import React from "react";
import "./Categorias.css";
import CategoriaItem from "./CategoriaItem";

const categoriasData = [
    { id: 1, nombre: "350cc", imagen: "/img/categorias/cilindrada350.png" },
    { id: 2, nombre: "450cc", imagen: "/img/categorias/cilindrada450.jpg" },
    { id: 3, nombre: "650cc", imagen: "/img/categorias/cilindrada650.webp" },
];

const Categorias = () => {
    return (
        <div className="categorias-container">
            <h1 className="categorias-title">Categorías de Motocicletas</h1>

            <div className="categorias-grid">
                {categoriasData.map(cat => (
                    <CategoriaItem
                        key={cat.id}
                        nombre={cat.nombre}
                        imagen={cat.imagen}
                    />
                ))}
            </div>
        </div>
    );
};

export default Categorias;