const Bitacora = require("../models/Bitacora");

const obtenerBitacora = async (req, res) => {
  try {
    const bitacora = await Bitacora.findAll();
    res.json(bitacora);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la bitácora" });
  }
};

module.exports = { obtenerBitacora };