const { InstitucionCarrera } = require('../models');
const { validateToken } = require('../middleware/authMiddleware');

const institucionCarreraController = {
  async create(req, res) {
    try {
      //await validateToken(req, res);
      const { institucionId, carreraId } = req.body;
      if (!institucionId || !carreraId) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      const institucionCarrera = await InstitucionCarrera.create({ institucionId, carreraId });
      res.status(201).json(institucionCarrera);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear la relación InstitucionCarrera', error });
    }
  },

  async update(req, res) {
    try {
      //await validateToken(req, res);
      const { id } = req.params;
      const { institucionId, carreraId } = req.body;
      const institucionCarrera = await InstitucionCarrera.findByPk(id);
      if (!institucionCarrera) {
        return res.status(404).json({ message: 'Relación InstitucionCarrera no encontrada' });
      }
      await institucionCarrera.update({ institucionId, carreraId });
      res.json(institucionCarrera);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar la relación InstitucionCarrera', error });
    }
  },

  async delete(req, res) {
    try {
      //await validateToken(req, res);
      const { id } = req.params;
      const institucionCarrera = await InstitucionCarrera.findByPk(id);
      if (!institucionCarrera) {
        return res.status(404).json({ message: 'Relación InstitucionCarrera no encontrada' });
      }
      await institucionCarrera.destroy();
      res.json({ message: 'Relación InstitucionCarrera eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la relación InstitucionCarrera', error });
    }
  },

  async getAll(req, res) {
    try {
      //await validateToken(req, res);
      const relaciones = await InstitucionCarrera.findAll();
      res.json(relaciones);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las relaciones InstitucionCarrera', error });
    }
  },

  async getById(req, res) {
    try {
      //await validateToken(req, res);
      const { id } = req.params;
      const institucionCarrera = await InstitucionCarrera.findByPk(id);
      if (!institucionCarrera) {
        return res.status(404).json({ message: 'Relación InstitucionCarrera no encontrada' });
      }
      res.json(institucionCarrera);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la relación InstitucionCarrera', error });
    }
  }
};

module.exports = institucionCarreraController;
