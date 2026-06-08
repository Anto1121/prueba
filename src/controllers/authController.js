const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const register = async (req, res) => {
  const { nombre, correo, password } = req.body;
  try {
    const existingUser = await User.findByEmail(correo);
    if (existingUser) return res.status(400).json({ mensaje: "Usuario ya existe" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(nombre, correo, hashedPassword);
    res.status(201).json({ mensaje: "Usuario creado", usuario: newUser });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

const login = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const user = await User.findByEmail(correo);
    if (!user) return res.status(400).json({ mensaje: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, correo: user.correo }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ mensaje: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ mensaje: err.message });
  }
};

module.exports = { register, login };