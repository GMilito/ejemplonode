const { Carrera } = require('../models/Carrera');
const { Institucion } = require('../models/Institucion');
const { Profesor } = require('../models/Profesor');
const { validateToken } = require('../middleware/authMiddleware');
const { logAction } = require('../services/bitacoraService');

const crearCarrera = async (req, res) => {
    try {
        //await validateToken(req);
        const { nombre, institucionId, directorId } = req.body;

        if (!nombre || !/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(nombre.trim())) {
            return res.status(400).json({ message: 'Nombre inválido' });
        }

        const institucion = await Institucion.findByPk(institucionId);
        if (!institucion) return res.status(404).json({ message: 'Institución no encontrada' });

        const profesor = await Profesor.findByPk(directorId);
        if (!profesor) return res.status(404).json({ message: 'Director no registrado como profesor' });

        const carrera = await Carrera.create({ nombre: nombre.trim(), institucionId, directorId });
        await logAction(req.user.id, 'Crear', 'Carrera', carrera.id);
        res.status(201).json(carrera);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const modificarCarrera = async (req, res) => {
    try {
        await validateToken(req);
        const { id } = req.params;
        const { nombre, institucionId, directorId } = req.body;

        const carrera = await Carrera.findByPk(id);
        if (!carrera) return res.status(404).json({ message: 'Carrera no encontrada' });

        if (!nombre || !/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(nombre.trim())) {
            return res.status(400).json({ message: 'Nombre inválido' });
        }

        const institucion = await Institucion.findByPk(institucionId);
        if (!institucion) return res.status(404).json({ message: 'Institución no encontrada' });

        const profesor = await Profesor.findByPk(directorId);
        if (!profesor) return res.status(404).json({ message: 'Director no registrado como profesor' });

        carrera.nombre = nombre.trim();
        carrera.institucionId = institucionId;
        carrera.directorId = directorId;
        await carrera.save();

        await logAction(req.user.id, 'Modificar', 'Carrera', carrera.id);
        res.json(carrera);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const eliminarCarrera = async (req, res) => {
    try {
        await validateToken(req);
        const { id } = req.params;

        const carrera = await Carrera.findByPk(id);
        if (!carrera) return res.status(404).json({ message: 'Carrera no encontrada' });

        await carrera.destroy();
        await logAction(req.user.id, 'Eliminar', 'Carrera', id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const obtenerCarreras = async (req, res) => {
    try {
        //await validateToken(req);
        const carreras = await Carrera.findAll();
        res.json(carreras);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const obtenerCarreraPorId = async (req, res) => {
    try {
        await validateToken(req);
        const { id } = req.params;

        const carrera = await Carrera.findByPk(id);
        if (!carrera) return res.status(404).json({ message: 'Carrera no encontrada' });

        res.json(carrera);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const obtenerCarrerasPorInstitucion = async (req, res) => {
    try {
        await validateToken(req);
        const { institucionId } = req.params;

        const carreras = await Carrera.findAll({ where: { institucionId } });
        res.json(carreras);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    crearCarrera,
    modificarCarrera,
    eliminarCarrera,
    obtenerCarreras,
    obtenerCarreraPorId,
    obtenerCarrerasPorInstitucion
};
