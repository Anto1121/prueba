const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productoRoutes = require("./routes/productoRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use("/auth", authRoutes);
app.use("/productos", productoRoutes);

// Ruta pública de prueba
app.get("/", (req, res) => {
  res.json({
    mensaje: "Servidor funcionando correctamente 🚀"
  });
});

// Exportar aplicación
module.exports = app;