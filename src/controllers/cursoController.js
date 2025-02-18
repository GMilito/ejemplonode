const { Curso } = require('../models/Curso');
const { validateToken } = require('../middleware/authMiddleware');

const cursoController = {
  async create(req, res) {
    try {
      await validateToken(req, res);
      const { nombre, nivel, carreraId } = req.body;
      if (!nombre || !nivel || !carreraId) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        return res.status(400).json({ message: 'El nombre solo debe contener letras y espacios' });
      }
      if (nivel < 1 || nivel > 12) {
        return res.status(400).json({ message: 'El nivel debe estar entre 1 y 12' });
      }
      const curso = await Curso.create({ nombre, nivel, carreraId });
      res.status(201).json(curso);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el curso', error });
    }
  },

  async update(req, res) {
    try {
      await validateToken(req, res);
      const { id } = req.params;
      const { nombre, nivel, carreraId } = req.body;
      const curso = await Curso.findByPk(id);
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      await curso.update({ nombre, nivel, carreraId });
      res.json(curso);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el curso', error });
    }
  },

  async delete(req, res) {
    try {
      await validateToken(req, res);
      const { id } = req.params;
      const curso = await Curso.findByPk(id);
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      await curso.destroy();
      res.json({ message: 'Curso eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el curso', error });
    }
  },

  async getAll(req, res) {
    try {
      await validateToken(req, res);
      const cursos = await Curso.findAll();
      res.json(cursos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los cursos', error });
    }
  },

  async getById(req, res) {
    try {
      await validateToken(req, res);
      const { id } = req.params;
      const curso = await Curso.findByPk(id);
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.json(curso);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el curso', error });
    }
  },

  async getByCarrera(req, res) {
    try {
      await validateToken(req, res);
      const { carreraId } = req.params;
      const cursos = await Curso.findAll({ where: { carreraId } });
      res.json(cursos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los cursos por carrera', error });
    }
  }
};

module.exports = cursoController;
