const Producto = require("../models/productoModel");

// Obtener todos los productos
const getAll = async (req, res) => {
  try {
    const productos = await Producto.all();
    res.status(200).json(productos);

  } catch (err) {
    res.status(500).json({
      mensaje: err.message
    });
  }
};


// Obtener un producto por ID
const getOne = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        mensaje: "El ID del producto es obligatorio"
      });
    }

    const producto = await Producto.find(id);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.status(200).json(producto);

  } catch (err) {
    res.status(500).json({
      mensaje: err.message
    });
  }
};


// Crear producto
const create = async (req, res) => {
  try {

    const { nombre, precio, stock } = req.body;

    const producto = await Producto.create(
      nombre,
      precio,
      stock
    );

    res.status(201).json(producto);

  } catch (err) {
    res.status(500).json({
      mensaje: err.message
    });
  }
};


// Actualizar producto
const update = async (req, res) => {
  try {

    const { id } = req.params;
    const { nombre, precio, stock } = req.body;

    if (!id) {
      return res.status(400).json({
        mensaje: "El ID del producto es obligatorio"
      });
    }

    const producto = await Producto.update(
      id,
      nombre,
      precio,
      stock
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.status(200).json(producto);

  } catch (err) {
    res.status(500).json({
      mensaje: err.message
    });
  }
};


// Eliminar producto
const remove = async (req, res) => {
  try {

    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        mensaje: "El ID del producto es obligatorio"
      });
    }

    const producto = await Producto.delete(id);

    res.status(200).json({
      mensaje: "Producto eliminado",
      producto
    });

  } catch (err) {
    res.status(500).json({
      mensaje: err.message
    });
  }
};


module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
};