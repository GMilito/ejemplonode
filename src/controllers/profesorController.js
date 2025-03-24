const { Profesor, ProfesorTelefono, TipoIdentificacion } = require("../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { registrarBitacora } = require("../services/bitacoraService");
const { validarEmail, esMayorDeEdad, validarNombre } = require("../utils/validaciones");

// Dominio parametrizable
const DOMINIO_CORREO = process.env.DOMINIO_CORREO || "cuc.ac.cr";

// Middleware para verificar token
const verificarToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

// 📌 Obtener todos los profesores
const obtenerProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.findAll({ include: [TipoIdentificacion, ProfesorTelefono] });
    await registrarBitacora(req.usuario, "Consulta", "Obtener todos los profesores");
    res.json(profesores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener profesores" });
  }
};

// 📌 Obtener profesor por ID
const obtenerProfesorPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const profesor = await Profesor.findByPk(id, { include: [TipoIdentificacion, ProfesorTelefono] });

    if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });

    await registrarBitacora(req.usuario, "Consulta", `Obtener profesor con ID ${id}`);
    res.json(profesor);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el profesor" });
  }
};

// 📌 Crear profesor
const crearProfesor = async (req, res) => {
  try {
    const { identificacion, tipo_identificacion_id, email, nombre_completo, fecha_nacimiento, telefonos } = req.body;

    if (!identificacion || !tipo_identificacion_id || !email || !nombre_completo || !fecha_nacimiento || !telefonos?.length) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    if (
      String(identificacion).trim() === "" ||
      String(tipo_identificacion_id).trim() === "" ||
      String(email).trim() === "" ||
      String(nombre_completo).trim() === "" ||
      String(fecha_nacimiento).trim() === "" ||
      telefonos.some(tel => String(tel).trim() === "")
    ) {
      return res.status(400).json({ error: "No puedes enviar vacíos" });
    }

    if (!validarNombre(nombre_completo)) {
      return res.status(400).json({ error: "Nombre inválido (solo letras y espacios)" });
    }

    if (!esMayorDeEdad(fecha_nacimiento)) {
      return res.status(400).json({ error: "Debe ser mayor de edad" });
    }

    if (!validarEmail(email, DOMINIO_CORREO)) {
      return res.status(400).json({ error: `Email debe ser del dominio ${DOMINIO_CORREO}` });
    }

    const profesor = await Profesor.create({ identificacion, tipo_identificacion_id, email, nombre_completo, fecha_nacimiento });

    await Promise.all(telefonos.map(tel => ProfesorTelefono.create({ telefono: tel, profesor_id: profesor.id })));

    await registrarBitacora(req.usuario, "Creación", `Profesor creado con ID ${profesor.id}`);
    res.status(201).json(profesor);
  } catch (error) {
    res.status(500).json({ error: "Error al crear profesor" });
  }
};

// 📌 Modificar profesor
const modificarProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, nombre_completo, fecha_nacimiento, telefonos } = req.body;

    const profesor = await Profesor.findByPk(id);
    if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });

    if (nombre_completo && !validarNombre(nombre_completo)) {
      return res.status(400).json({ error: "Nombre inválido (solo letras y espacios)" });
    }

    if (fecha_nacimiento && !esMayorDeEdad(fecha_nacimiento)) {
      return res.status(400).json({ error: "Debe ser mayor de edad" });
    }

    if (email && !validarEmail(email, DOMINIO_CORREO)) {
      return res.status(400).json({ error: `Email debe ser del dominio ${DOMINIO_CORREO}` });
    }

    await profesor.update({ email, nombre_completo, fecha_nacimiento });

    if (telefonos) {
      await ProfesorTelefono.destroy({ where: { profesor_id: id } });
      await Promise.all(telefonos.map(tel => ProfesorTelefono.create({ telefono: tel, profesor_id: id })));
    }

    await registrarBitacora(req.usuario, "Modificación", `Profesor actualizado con ID ${id}`);
    res.json(profesor);
  } catch (error) {
    res.status(500).json({ error: "Error al modificar profesor" });
  }
};

// 📌 Eliminar profesor
const eliminarProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const profesor = await Profesor.findByPk(id);
    if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });

    await profesor.destroy();
    await registrarBitacora(req.usuario, "Eliminación", `Profesor eliminado con ID ${id}`);
    res.json({ mensaje: "Profesor eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar profesor" });
  }
};

// Exportar funciones
module.exports = {
  obtenerProfesores,
  obtenerProfesorPorId,
  crearProfesor,
  modificarProfesor,
  eliminarProfesor,
  verificarToken,
};
