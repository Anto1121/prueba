const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

require("dotenv").config();

// Registrar usuario
const register = async (req, res) => {

  console.log("===== REGISTER =====");
  console.log("Body recibido:", req.body);

  const { nombre, correo, password } = req.body;

  console.log("Nombre:", nombre);
  console.log("Correo:", correo);
  console.log("Password:", password);

  try {

    // Validar datos
    if (!nombre || !correo || !password) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios",
        bodyRecibido: req.body
      });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findByEmail(correo);

    if (existingUser) {
      return res.status(400).json({
        mensaje: "Usuario ya existe"
      });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create(
      nombre,
      correo,
      hashedPassword
    );

    res.status(201).json({
      mensaje: "Usuario creado correctamente",
      usuario: newUser
    });

  } catch (err) {
    console.error("ERROR REGISTER:", err);

    res.status(500).json({
      mensaje: err.message
    });
  }
};

// Iniciar sesión
const login = async (req, res) => {

  console.log("===== LOGIN =====");
  console.log("Body recibido:", req.body);

  const { correo, password } = req.body;

  try {

    if (!correo || !password) {
      return res.status(400).json({
        mensaje: "Correo y contraseña son obligatorios"
      });
    }

    // Buscar usuario
    const user = await User.findByEmail(correo);

    if (!user) {
      return res.status(400).json({
        mensaje: "Usuario no encontrado"
      });
    }

    // Comparar contraseña
    const passwordCorrecta = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordCorrecta) {
      return res.status(400).json({
        mensaje: "Contraseña incorrecta"
      });
    }

    // Generar token
    const token = jwt.sign(
      {
        id: user.id,
        correo: user.correo
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      mensaje: "Login exitoso",
      token
    });

  } catch (err) {
    console.error("ERROR LOGIN:", err);

    res.status(500).json({
      mensaje: err.message
    });
  }
};

module.exports = {
  register,
  login
};