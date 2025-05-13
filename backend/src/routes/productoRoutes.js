const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.get("/productos", productoController.getAll); // obtener productos
router.post("/productos", productoController.create); // crear producto
router.put("/productos/:id", productoController.update); // actualizar producto
router.delete("/productos/:id", productoController.delete); // eliminar producto

module.exports = router;
