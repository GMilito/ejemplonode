const Institucion = require("../models/Institucion");

// Crear institución
const crear = async (req, res) => {
  const { nombre } = req.body;
  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ message: "El nombre es obligatorio y no puede estar vacío" });
  }
  try {
    const nuevaInstitucion = await Institucion.create({ nombre });
    res.status(201).json(nuevaInstitucion);
  } catch (err) {
    res.status(500).json({ message: "Error al crear la institución", error: err.message });
  }
};

// Obtener todas las instituciones
const obtenerTodas = async (req, res) => {
  try {
    const instituciones = await Institucion.findAll();


    const institucionesData = instituciones.map(institucion => institucion.dataValues);
    if (institucionesData.length === 0) {
      return res.status(200).json({ message: "No hay instituciones disponibles." });
    }
    res.status(200).json(institucionesData);
    //res.status(200).json(instituciones);
  } catch (err) {
    console.error("Error al obtener instituciones:", error);
    res.status(500).json({ message: "Error al obtener las instituciones", error: err.message });
  }
};

// Obtener institución por ID
const obtenerPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const institucion = await Institucion.findByPk(id);
    if (!institucion) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }
    res.status(200).json(institucion);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener la institución", error: err.message });
  }
};

// Actualizar institución
const actualizar = async (req, res) => {
  let { id } = req.params;
  const { nombre } = req.body;

  id = parseInt(id.trim(), 10);

  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ message: "El nombre es obligatorio y no puede estar vacío" });
  }

  try {
    const institucion = await Institucion.findByPk(id);
    if (!institucion) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }

    institucion.nombre = nombre;
    await institucion.save();
    res.status(200).json(institucion);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar la institución", error: err.message });
  }
};

// Eliminar institución
const eliminar = async (req, res) => {
  const { id } = req.params;

  try {
    const institucion = await Institucion.findByPk(id);
    if (!institucion) {
      return res.status(404).json({ message: "Institución no encontrada" });
    }

    await institucion.destroy();
    res.status(200).json({ message: "Institución eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar la institución", error: err.message });
  }
};

module.exports = { crear, obtenerTodas, obtenerPorId, actualizar, eliminar };
