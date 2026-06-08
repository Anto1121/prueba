const Producto = require("../models/productoModel");

const getAll = async (req, res) => {
  try {
    const productos = await Producto.all();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const producto = await Producto.find(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;
    const producto = await Producto.create(nombre, precio, stock);
    res.status(201).json(producto);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;
    const producto = await Producto.update(req.params.id, nombre, precio, stock);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await Producto.delete(req.params.id);
    res.json({ mensaje: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };