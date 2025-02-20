const { Periodo } = require("../models");
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

// 📌 Obtener todos los Periodos
const obtenerPeriodos = async (req, res) => {
  try {

    const profesores = await Periodo.findAll();
    await registrarBitacora(req.headers["authorization"], "Consulta", "Obtener todos los periodos");
    res.json(profesores);
  } catch (error) {
    console.error("Error en obtenerProfesores:", error);
    res.status(500).json({ error: "Error al obtener profesores", detalle: error.message });
  }
};

// 📌 Obtener Periodo por ID
const obtenerPeriodosPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const profesor = await Periodo.findByPk(id, { include: [TipoIdentificacion, ProfesorTelefono] });

    if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });

    await registrarBitacora(req.headers["authorization"], "Consulta", `Obtener Periodo con ID ${id}`);
    res.json(profesor);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Periodo" });
  }
};

// 📌 Crear Periodo
const crearPeriodo = async (req, res) => {
  try {
    console.log(req.body)
    const { identificacion, tipo_identificacion_id, email, nombre_completo, fecha_nacimiento, telefonos } = req.body;

    if (!identificacion || !tipo_identificacion_id || !email || !nombre_completo || !fecha_nacimiento || !telefonos?.length) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
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

    await registrarBitacora(req.headers["authorization"], "Creación", `Profesor creado con ID ${profesor.id}`);
    res.status(201).json(profesor);
  } catch (error) {
    console.error("Error en crearProfesor:", error);
    res.status(500).json({ error: "Error al crear profesor" });
  }
};

// 📌 Modificar profesor
const modificarProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const { identificacion, tipo_identificacion_id ,email, nombre_completo, fecha_nacimiento, telefonos } = req.body;

    const profesor = await Profesor.findByPk(id);
    if (!profesor) return res.status(404).json({ error: "Profesor no encontrado" });

    // Verificar si la identificación ya está en uso por otro profesor
    const profesorConIdentificacion = await Profesor.findOne({ where: { identificacion } });
    if (profesorConIdentificacion && profesorConIdentificacion.id !== id) {
      return res.status(409).json({ error: "Ya existe un profesor con esa identificación" });
    }
    if (nombre_completo && !validarNombre(nombre_completo)) {
      return res.status(400).json({ error: "Nombre inválido (solo letras y espacios)" });
    }

    if (fecha_nacimiento && !esMayorDeEdad(fecha_nacimiento)) {
      return res.status(400).json({ error: "Debe ser mayor de edad" });
    }

    if (email && !validarEmail(email, DOMINIO_CORREO)) {
      return res.status(400).json({ error: `Email debe ser del dominio ${DOMINIO_CORREO}` });
    }

    await profesor.update({ identificacion, tipo_identificacion_id, email, nombre_completo, fecha_nacimiento });

    if (telefonos) {
      await ProfesorTelefono.destroy({ where: { profesor_id: id } });
      await Promise.all(telefonos.map(tel => ProfesorTelefono.create({ telefono: tel, profesor_id: id })));
    }

    await registrarBitacora(req.headers["authorization"], "Modificación", `Profesor actualizado con ID ${id}`);
    res.json(profesor);
  } catch (error) {
    console.log("Error al modificar profesor " + error)
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
    await registrarBitacora(req.headers["authorization"], "Eliminación", `Profesor eliminado con ID ${id}`);
    res.json({ mensaje: "Profesor eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar profesor" });
  }
};

// Exportar funciones
module.exports = {
  obtenerPeriodos,
  obtenerProfesorPorId,
  crearProfesor,
  modificarProfesor,
  eliminarProfesor,
  verificarToken,
};
