// src/App.jsx
// src/App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import EditProduct from "./components/EditProduct";
import Statistics from "./components/Statistics";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/productos");
      setProducts(res.data); // Esto asegura que el estado se actualice
      setProducts([...res.data]);
    } catch (err) {
      toast.error("Error al obtener productos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = () => {
    fetchProducts(); // Se actualiza la lista al agregar
  };

  const handleEdit = (producto) => {
    setEditingProduct(producto);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/productos/${id}`);
      toast.success("Producto eliminado");
      fetchProducts(); // Se actualiza la lista al eliminar
    } catch (err) {
      toast.error("Error al eliminar producto");
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  //Actualizar producto
  const handleUpdate = async (updatedProduct) => {
    try {
      await axios.put(
        `http://localhost:3001/api/productos/${updatedProduct.id}`,
        updatedProduct
      );
      toast.success("Producto actualizado exitosamente");
      fetchProducts(); // Se actualiza la lista al editar
      setEditingProduct(null);
    } catch (err) {
      toast.error("Error al actualizar producto");
    }
  };

  return (
    <div className="container">
      <h1>Sistema de Inventario de Ropa</h1>

      <div className="form-section">
        {editingProduct ? (
          <EditProduct
            productToEdit={editingProduct}
            onCancel={handleCancelEdit}
            onChange={handleUpdate}
          />
        ) : (
          <ProductForm onAdd={handleAdd} />
        )}
      </div>

      <ProductList
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Statistics products={products} />
      <ToastContainer />
    </div>
  );
};

export default App;
