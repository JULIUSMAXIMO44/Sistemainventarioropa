const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const productoRoutes = require("./src/routes/productoRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", productoRoutes);

// Conexión a MySQL usando variables de entorno
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
