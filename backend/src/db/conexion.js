//Conexión con la base de datos
const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const conexion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

conexion.connect((err) => {
  if (err) {
    console.error("Error en la conexión:", err);
  } else {
    console.log("Conectado a la base de datos MySQL");
  }
});

module.exports = conexion;
