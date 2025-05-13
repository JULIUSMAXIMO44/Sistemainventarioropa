const conexion = require("../db/conexion");

const Producto = {
  obtenerTodos: (callback) => {
    conexion.query("SELECT * FROM productos", callback);
  },

  insertar: (producto, callback) => {
    conexion.query("INSERT INTO productos SET ?", producto, callback);
  },

  actualizar: (id, producto, callback) => {
    conexion.query(
      "UPDATE productos SET ? WHERE id = ?",
      [producto, id],
      callback
    );
  },

  eliminar: (id, callback) => {
    conexion.query("DELETE FROM productos WHERE id = ?", [id], callback);
  },
};

module.exports = Producto;
