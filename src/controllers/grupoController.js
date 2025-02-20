const { Grupo } = require('../models/Grupo');
const { validateToken } = require('../middleware/authMiddleware');

const grupoController = {
  async create(req, res) {
    try {
      //await validateToken(req, res);
      const { numero, cursoId, profesorId, horario, periodo } = req.body;
      if (!numero || !cursoId || !profesorId || !horario || !periodo) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      const grupo = await Grupo.create({ numero, cursoId, profesorId, horario, periodo });
      res.status(201).json(grupo);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el grupo', error });
    }
  },

  async update(req, res) {
    try {
      await validateToken(req, res);
      const { id } = req.params;
      const { numero, cursoId, profesorId, horario, periodoId } = req.body;
      const grupo = await Grupo.findByPk(id);
      if (!grupo) {
        return res.status(404).json({ message: 'Grupo no encontrado' });
      }
      await grupo.update({ numero, cursoId, profesorId, horario, periodoId });
      res.json(grupo);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el grupo', error });
    }
  },

  async delete(req, res) {
    try {
      await validateToken(req, res);
      const { id } = req.params;
      const grupo = await Grupo.findByPk(id);
      if (!grupo) {
        return res.status(404).json({ message: 'Grupo no encontrado' });
      }
      await grupo.destroy();
      res.json({ message: 'Grupo eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el grupo', error });
    }
  },

  async getAll(req, res) {
    try {
      await validateToken(req, res);
      const grupos = await Grupo.findAll();
      res.json(grupos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los grupos', error });
    }
  },

  async getById(req, res) {
    try {
      await validateToken(req, res);
      const { id } = req.params;
      const grupo = await Grupo.findByPk(id);
      if (!grupo) {
        return res.status(404).json({ message: 'Grupo no encontrado' });
      }
      res.json(grupo);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el grupo', error });
    }
  }
};

module.exports = { grupoController };