const Persona = require('../models/Persona');


const getAllPersonas = async (req, res) => {
    try {
        const personas = await Persona.findAll();
        res.json(personas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getPersonaById = async (req, res) => {
    try {
        const persona = await Persona.findByPk(req.params.id);
        if (!persona) return res.status(404).json({ message: "Persona no encontrada" });
        res.json(persona);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const createPersona = async (req, res) => {
    try {
        const nuevaPersona = await Persona.create(req.body);
        res.status(201).json(nuevaPersona);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const updatePersona = async (req, res) => {
    try {
        const persona = await Persona.findByPk(req.params.id);
        if (!persona) return res.status(404).json({ message: "Persona no encontrada" });

        await persona.update(req.body);
        res.json(persona);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const deletePersona = async (req, res) => {
    try {
        const persona = await Persona.findByPk(req.params.id);
        if (!persona) return res.status(404).json({ message: "Persona no encontrada" });

        await persona.destroy();
        res.json({ message: "Persona eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllPersonas, getPersonaById, createPersona, updatePersona, deletePersona };
