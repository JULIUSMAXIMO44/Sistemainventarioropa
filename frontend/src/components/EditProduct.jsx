// src/components/EditProduct.jsx
import React, { useState, useEffect } from "react";

const EditProduct = ({ productToEdit, onChange, onCancel }) => {
  const [producto, setProduct] = useState(productToEdit);

  useEffect(() => {
    setProduct(productToEdit);
  }, [productToEdit]);

  if (!producto) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(producto);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <input
        type="text"
        name="nombre"
        value={producto.nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="categoria"
        value={producto.categoria}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="precio"
        value={producto.precio}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock"
        value={producto.stock}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="fecha"
        value={producto.fecha}
        onChange={handleChange}
        required
      />
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
    </form>
  );
};

export default EditProduct;
