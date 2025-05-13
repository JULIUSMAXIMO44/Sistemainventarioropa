const Producto = require("../models/productoModel");

// Obtener todos los productos
exports.getAll = (req, res) => {
  Producto.obtenerTodos((error, resultados) => {
    if (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ error: "Error al obtener productos" });
    } else {
      res.status(200).json(resultados);
    }
  });
};

// Crear nuevo producto
exports.create = (req, res) => {
  const nuevoProducto = req.body;

  // Validación básica de campos
  if (
    !nuevoProducto.nombre ||
    !nuevoProducto.categoria ||
    nuevoProducto.precio == null ||
    nuevoProducto.stock == null ||
    !nuevoProducto.fecha
  ) {
    return res.status(400).json({ error: "Datos incompletos o inválidos" });
  }

  Producto.insertar(nuevoProducto, (error, resultado) => {
    if (error) {
      console.error("Error al insertar producto:", error);
      res.status(500).json({ error: "Error al insertar producto" });
    } else {
      res
        .status(201)
        .json({ mensaje: "Producto creado", id: resultado.insertId });
    }
  });
};

// Actualizar producto
exports.update = (req, res) => {
  const id = req.params.id;
  const datosActualizados = req.body;

  Producto.actualizar(id, datosActualizados, (error, resultado) => {
    if (error) {
      console.error("Error al actualizar producto:", error);
      res.status(500).json({ error: "Error al actualizar producto" });
    } else {
      res.status(200).json({ mensaje: "Producto actualizado" });
    }
  });
};

// Eliminar producto
exports.delete = (req, res) => {
  const id = req.params.id;

  Producto.eliminar(id, (error, resultado) => {
    if (error) {
      console.error("Error al eliminar producto:", error);
      res.status(500).json({ error: "Error al eliminar producto" });
    } else {
      res.status(200).json({ mensaje: "Producto eliminado" });
    }
  });
};
