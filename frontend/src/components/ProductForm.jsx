// src/components/ProductForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProductForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    stock: "",
    fecha: "",
  });

  const resetForm = () => {
    setForm({
      nombre: "",
      categoria: "",
      precio: "",
      stock: "",
      fecha: "",
    });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/productos", form);
      toast.success("Producto agregado exitosamente");
      resetForm();
      onAdd(); // Actualiza la lista en App.jsx
    } catch (error) {
      toast.error("Error al agregar producto");
    }
  };

  return (
    <div className="product-form">
      <h3>Agregar Producto</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <select
          name="categoria"
          placeholder="Categoría"
          value={form.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar categoría</option>
          <option value="Ropa">Ropa</option>
          <option value="Calzado">Calzado</option>
          <option value="Accesorios">Accesorios</option>
          <option value="Formal">Formal</option>
          <option value="Casual">Casual</option>
          <option value="Deportivo">Deportivo</option>
        </select>
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fecha"
          placeholder="Fecha"
          value={form.fecha}
          onChange={handleChange}
          required
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default ProductForm;
// src/components/ProductForm.jsx
