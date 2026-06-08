const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const productoRoutes = require("./routes/productoRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/productos", productoRoutes);

app.get("/", (req, res) => {
  res.json({ mensaje: "Servidor funcionando correctamente 🚀" });
});

module.exports = app;