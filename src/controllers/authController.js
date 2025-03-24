const Usuarios = require("../models/usuario");
const { generarToken, validarToken } = require("../services/authService");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await Usuarios.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const nuevoUsuario = await Usuarios.create({
      username,
      password: hashedPassword,
    });

    // Generar tokens para el nuevo usuario
    const tokens = generarToken(nuevoUsuario);

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      usuarioID: nuevoUsuario.id,
      username: nuevoUsuario.username,
      ...tokens,
    });
  } catch (error) {
    console.error("Error detallado:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
  }

  try {
    const usuario = await Usuarios.findOne({ where: { username } });

    console.log("Usuario encontrado:", usuario); // Verifica si el usuario existe
    console.log("Contraseña proporcionada:", password); // Verifica la contraseña proporcionada
    console.log("Contraseña encriptada en la base de datos:", usuario.password); // Verifica la contraseña encriptada


    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ message: "Usuario y/o contraseña incorrectos" });
    }

    const tokens = generarToken(usuario);
    res.status(201).json({ expires_in: process.env.JWT_EXPIRES_IN, ...tokens, usuarioID: usuario.id });
  } catch (error) {
    console.error("Error detallado:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

const refresh = (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ message: "Refresh token requerido" });
  }

  try {
    const payload = validarToken(refresh_token);

    if (!payload) {
      return res.status(401).json({ message: "No autorizado" });
    }

    const tokens = generarToken({ id: payload.id, username: payload.username });
    res.status(201).json(tokens);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

const validate = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const payload = validarToken(token);

  if (!payload) {
    return res.status(401).json({ message: "Token inválido" });
  }

  res.status(200).json({ valid: true });
};

module.exports = { register, login, refresh, validate };
