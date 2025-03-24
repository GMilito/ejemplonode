const Bitacora = require("../models/Bitacora");

async function registrarBitacora(profesorId, accion, descripcion) {
  try {

    if (!profesorId) {
      console.warn("No se registrará la bitácora porque `profesorId` es undefined o null.");
      return;
    }

    await Bitacora.create({ profesor_id: profesorId, accion, descripcion });
    console.log(`[✅ Bitácora] Profesor: ${profesorId}, Acción: ${accion}, Descripción: ${descripcion}`);
  } catch (error) {
    console.error("Error al registrar en la bitácora:", error);
  }
}

module.exports = { registrarBitacora };
