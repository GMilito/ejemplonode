const Carrera = require("../models/Carrera");
const Profesor = require("../models/Profesor");
const Institucion = require("../models/Institucion");
const InstitucionCarrera = require("../models/InstitucionCarrera");
const { registrarBitacora } = require("../services/bitacoraService");
const { Op } = require("sequelize");

const obtenerCarreras = async (req, res) => {
  try {
    const carreras = await Carrera.findAll();
    await registrarBitacora(req.profesor_id, "Consulta", "Obtener todas las carreras");
    res.json(carreras);
  } catch (error) {
    console.error("Error en obtenerCarreras:", error);
    res.status(500).json({ error: "Error al obtener carreras" });
  }
};

const obtenerCarreraPorId = async (req, res) => {
  try {
    const carrera = await Carrera.findByPk(req.params.id);
    if (!carrera) return res.status(404).json({ error: "Carrera no encontrada" });

    await registrarBitacora(req.profesor_id, "Consulta", `Obtener carrera con ID ${req.params.id}`);
    res.json(carrera);
  } catch (error) {
    console.error("Error en obtenerCarreraPorId:", error);
    res.status(500).json({ error: "Error al obtener carrera" });
  }
};

const obtenerCarrerasPorInstitucion = async (req, res) => {
  try {

    const carreras = await Carrera.findAll({
      include: {
        model: Institucion,
        through: { attributes: [] },
        where: { id: req.params.id },
      }
    });

    await registrarBitacora(req.profesor_id, "Consulta", `Obtener carreras por institución ${req.params.id}`);
    
    res.json(carreras);
  } catch (error) {
    console.error("Error en obtenerCarrerasPorInstitucion:", error);
    res.status(500).json({ error: "Error al obtener carreras por institución" });
  }
};

const crearCarrera = async (req, res) => {
  try {
    const { nombre, profesor_id } = req.body;

    if (!nombre || !profesor_id) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      return res.status(400).json({ error: "Nombre inválido" });
    }

    const profesor = await Profesor.findByPk(profesor_id);
    if (!profesor) {
      return res.status(400).json({ error: "El director no existe en el sistema" });
    }

    const carrera = await Carrera.create({ nombre, profesor_id });
    await registrarBitacora(req.profesor_id, "Creación", `Carrera creada con ID ${carrera.id}`);
    res.status(201).json(carrera);
  } catch (error) {
    console.error("Error en crearCarrera:", error);
    res.status(500).json({ error: "Error al crear carrera" });
  }
};

const modificarCarrera = async (req, res) => {
  try {
    const carrera = await Carrera.findByPk(req.params.id);
    if (!carrera) return res.status(404).json({ error: "Carrera no encontrada" });

    await carrera.update(req.body);
    await registrarBitacora(req.profesor_id, "Modificación", `Carrera actualizada con ID ${req.params.id}`);
    res.json(carrera);
  } catch (error) {
    console.error("Error en modificarCarrera:", error);
    res.status(500).json({ error: "Error al modificar carrera" });
  }
};

const eliminarCarrera = async (req, res) => {
  try {
    const carrera = await Carrera.findByPk(req.params.id);
    if (!carrera) return res.status(404).json({ error: "Carrera no encontrada" });

    await carrera.destroy();
    await registrarBitacora(req.profesor_id, "Eliminación", `Carrera eliminada con ID ${req.params.id}`);
    res.json({ mensaje: "Carrera eliminada" });
  } catch (error) {
    console.error("Error en eliminarCarrera:", error);
    res.status(500).json({ error: "Error al eliminar carrera" });
  }
};

module.exports = { obtenerCarreras, obtenerCarreraPorId, obtenerCarrerasPorInstitucion, crearCarrera, modificarCarrera, eliminarCarrera };