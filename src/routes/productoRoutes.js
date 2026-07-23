const express = require("express");
const router = express.Router();

const {
  getAll,
  getOne,
  create,
  update,
  remove
} = require("../controllers/productoController");


// Obtener todos los productos
router.get("/", getAll);


// Obtener producto por ID
router.get("/:id", getOne);


// Crear producto
router.post("/", create);


// Actualizar producto por ID
router.put("/:id", update);


// Eliminar producto por ID
router.delete("/:id", remove);


module.exports = router;