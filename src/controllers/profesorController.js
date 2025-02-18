const { Profesor } = require('../models/Profesor');
const { validateToken } = require('../middleware/authMiddleware');

const profesorController = {
  async create(req, res) {
    try {
      await validateToken(req, res);
      const { identificacion, tipoIdentificacion, email, nombreCompleto, fechaNacimiento, telefono } = req.body;
      if (!identificacion || !tipoIdentificacion || !email || !nombreCompleto || !fechaNacimiento || !telefono) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      const profesor = await Profesor.create({ identificacion, tipoIdentificacion, email, nombreCompleto, fechaNacimiento, telefono });
      res.status(201).json(profesor);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el profesor', error });
    }
  },

  async update(req, res) {
    try {
      await validateToken(req, res);
      const { id } = req.params;
      const { identificacion, tipoIdentificacion, email, nombreCompleto, fechaNacimiento, telefono } = req.body;
      const profesor = await Profesor.findByPk(id);
      if (!profesor) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
      }
      await profesor.update({ identificacion, tipoIdentificacion, email, nombreCompleto, fechaNacimiento, telefono });
      res.json(profesor);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el profesor', error });
    }
  },

  async delete(req, res) {
    try {
      await validateToken(req, res);
      const { id } = req.params;
      const profesor = await Profesor.findByPk(id);
      if (!profesor) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
      }
      await profesor.destroy();
      res.json({ message: 'Profesor eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el profesor', error });
    }
  },

  async getAll(req, res) {
    try {
      await validateToken(req, res);
      const profesores = await Profesor.findAll();
      res.json(profesores);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los profesores', error });
    }
  },

  async getById(req, res) {
    try {
      await validateToken(req, res);
      const { id } = req.params;
      const profesor = await Profesor.findByPk(id);
      if (!profesor) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
      }
      res.json(profesor);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el profesor', error });
    }
  }
};

module.exports = {profesorController};