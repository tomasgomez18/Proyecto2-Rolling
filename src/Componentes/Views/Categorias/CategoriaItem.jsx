import React from "react";

const CategoriaItem = ({ nombre, imagen }) => {
    return (
        <div className="categoria-item">
            <img src={imagen} alt={nombre} className="categoria-img" />
            <h3>{nombre}</h3>
        </div>
    );
};

export default CategoriaItem;
