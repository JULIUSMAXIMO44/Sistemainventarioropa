// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../index.css";

const ProductList = ({ onEdit, onDelete }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/productos");
      setProducts(response.data);
    } catch (error) {
      toast.error("Error al obtener productos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await onDelete(id);
        fetchProducts(); // Vuelve a cargar después de eliminar
      } catch {
        toast.error("Error al eliminar el producto");
      }
    }
  };

  const filtered = products.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="product-list">
      <h2>Inventario de Ropa</h2>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((product) => (
            <tr key={product.id}>
              <td>{product.nombre}</td>
              <td>{product.categoria}</td>
              <td>${product.precio}</td>
              <td>{product.stock}</td>
              <td>{new Date(product.fecha).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onEdit(product)}>Editar</button>
                <button onClick={() => handleDelete(product.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="6">No se encontraron productos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
// src/components/ProductList.jsx
