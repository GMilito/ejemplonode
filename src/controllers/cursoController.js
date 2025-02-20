const Curso = require("../models/Curso");
const { registrarBitacora } = require("../services/bitacoraService");
const { Op } = require("sequelize");

const obtenerCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    await registrarBitacora(req.profesor_id, "Consulta", "Obtener todos los cursos");
    res.json(cursos);
  } catch (error) {
    console.error("Error en obtenerCursos:", error);
    res.status(500).json({ error: "Error al obtener cursos" });
  }
};

const obtenerCursoPorId = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
    await registrarBitacora(req.profesor_id, "Consulta", `Obtener curso con ID ${req.params.id}`);
    res.json(curso);
  } catch (error) {
    console.error("Error en obtenerCursoPorId:", error);
    res.status(500).json({ error: "Error al obtener curso" });
  }
};

const obtenerCursosPorCarrera = async (req, res) => {
  try {
    const cursos = await Curso.findAll({ where: { carrera_id: req.params.id } });
    await registrarBitacora(req.profesor_id, "Consulta", `Obtener cursos por carrera ${req.params.id}`);
    res.json(cursos);
  } catch (error) {
    console.error("Error en obtenerCursosPorCarrera:", error);
    res.status(500).json({ error: "Error al obtener cursos por carrera" });
  }
};

const crearCurso = async (req, res) => {
  try {

    const { nombre, nivel, carrera_id } = req.body;
    if (!nombre || !nivel || !carrera_id) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
      return res.status(400).json({ error: "Nombre inválido" });
    }
    if (nivel < 1 || nivel > 12) {
      return res.status(400).json({ error: "Nivel debe ser entre 1 y 12" });
    }

    const curso = await Curso.create({ nombre, nivel, carrera_id });

    if (!req.profesor_id) {
      console.warn("req.profesor_id es undefined. No se registrará en la bitácora.");
    } else {
      await registrarBitacora(req.profesor_id, "Creación", `Curso creado con ID ${curso.id}`);
    }

    res.status(201).json(curso);
  } catch (error) {
    console.error("Error en crearCurso:", error);
    res.status(500).json({ error: "Error al crear curso" });
  }
};

const modificarCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });

    await curso.update(req.body);
    await registrarBitacora(req.profesor_id, "Modificación", `Curso actualizado con ID ${req.params.id}`);
    res.json(curso);
  } catch (error) {
    console.error("Error en modificarCurso:", error);
    res.status(500).json({ error: "Error al modificar curso" });
  }
};

const eliminarCurso = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });

    await curso.destroy();
    await registrarBitacora(req.profesor_id, "Eliminación", `Curso eliminado con ID ${req.params.id}`);
    res.json({ mensaje: "Curso eliminado" });
  } catch (error) {
    console.error("Error en eliminarCurso:", error);
    res.status(500).json({ error: "Error al eliminar curso" });
  }
};

module.exports = { obtenerCursos, obtenerCursoPorId, obtenerCursosPorCarrera, crearCurso, modificarCurso, eliminarCurso };