const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const productoRoutes = require("./src/routes/productoRoutes");
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", productoRoutes);

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // tu contraseña
  database: "inventario_ropa", // asegúrate que esta BD exista
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión a MySQL:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

// Ruta simple
app.get("/", (req, res) => {
  res.send("Servidor backend funcionando");
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
