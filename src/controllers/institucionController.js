const { Institucion } = require('../models/Institucion');
const { validateToken } = require('../middleware/authMiddleware');
const { registrarEvento } = require('../services/bitacoraService');

const crearInstitucion = async (req, res) => {
    //req.user.id = 1; // Comentar esta linea cuando funcione la validacion de usuario
    console.log(req);
    try {
        //await validateToken(req);
        const { nombre } = req.body;

        if (!nombre || !/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(nombre.trim())) {
            return res.status(400).json({ message: 'Nombre inválido' });
        }

        const institucion = await Institucion.create({ nombre: nombre.trim() });
        await registrarEvento(req.user.id, 'Crear', 'Institucion', institucion.id);
        res.status(201).json(institucion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const modificarInstitucion = async (req, res) => {
    try {
        //await validateToken(req);
        const { id } = req.params;
        const { nombre } = req.body;

        const institucion = await Institucion.findByPk(id);
        if (!institucion) return res.status(404).json({ message: 'Institución no encontrada' });

        if (!nombre || !/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(nombre.trim())) {
            return res.status(400).json({ message: 'Nombre inválido' });
        }

        institucion.nombre = nombre.trim();
        await institucion.save();
        await registrarEvento(req.user.id, 'Modificar', 'Institucion', institucion.id);
        res.json(institucion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const eliminarInstitucion = async (req, res) => {
    try {
        //await validateToken(req);
        const { id } = req.params;

        const institucion = await Institucion.findByPk(id);
        if (!institucion) return res.status(404).json({ message: 'Institución no encontrada' });

        const _institucion = institucion;
        await institucion.destroy();
        await logAction(req.user.id, 'Eliminar', 'Institucion', id);
        res.status(204).json({institucion: _institucion});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const obtenerInstituciones = async (req, res) => {
    try {
        //await validateToken(req);
        const instituciones = await Institucion.findAll();
        res.json(instituciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const obtenerInstitucionPorId = async (req, res) => {
    try {
        //await validateToken(req);
        const { id } = req.params;
        //console.log(id);

        const institucion = await Institucion.findByPk(id);
        if (!institucion) return res.status(404).json({ message: 'Institución no encontrada' });

        res.json(institucion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    crearInstitucion,
    modificarInstitucion,
    eliminarInstitucion,
    obtenerInstituciones,
    obtenerInstitucionPorId
};
