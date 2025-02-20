const { Bitacora } = require('../models/Bitacora');

/**
 * Registra un evento en la bitácora.
 * @param {string} usuario - Usuario que realiza la acción.
 * @param {string} accion - Acción realizada (ej. "CREAR", "MODIFICAR", "ELIMINAR").
 * @param {string} entidad - Nombre de la entidad afectada (ej. "Institucion", "Profesor").
 * @param {number} entidadId - ID de la entidad afectada.
 */
const registrarEvento = async (usuario, accion, entidad, entidadId) => {
    try {
        await Bitacora.create({
            usuario,
            accion,
            entidad,
            entidadId,
            fecha: new Date()
        });
    } catch (error) {
        console.error('Error al registrar en bitácora:', error);
    }
};

module.exports = { registrarEvento };
