const { Periodo } = require('../models/Periodo');
const { validateToken } = require('../middleware/authMiddleware');

const periodoController = {
  async create(req, res) {
    try {
      await validateToken(req, res);
      const { anio, numeroPeriodo, fechaInicio, fechaFin } = req.body;
      if (!anio || !numeroPeriodo || !fechaInicio || !fechaFin) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
      }
      const periodo = await Periodo.create({ anio, numeroPeriodo, fechaInicio, fechaFin });
      res.status(201).json(periodo);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el periodo', error });
    }
  },

  async update(req, res) {
    try {
      await validateToken(req, res);
      const { id } = req.params;
      const { anio, numeroPeriodo, fechaInicio, fechaFin } = req.body;
      const periodo = await Periodo.findByPk(id);
      if (!periodo) {
        return res.status(404).json({ message: 'Periodo no encontrado' });
      }
      await periodo.update({ anio, numeroPeriodo, fechaInicio, fechaFin });
      res.json(periodo);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el periodo', error });
    }
  },

  async delete(req, res) {
    try {
      await validateToken(req, res);
      const { id } = req.params;
      const periodo = await Periodo.findByPk(id);
      if (!periodo) {
        return res.status(404).json({ message: 'Periodo no encontrado' });
      }
      await periodo.destroy();
      res.json({ message: 'Periodo eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el periodo', error });
    }
  },

  async getAll(req, res) {
    try {
      await validateToken(req, res);
      const periodos = await Periodo.findAll();
      res.json(periodos);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los periodos', error });
    }
  },

  async getById(req, res) {
    try {
      await validateToken(req, res);
      const { id } = req.params;
      const periodo = await Periodo.findByPk(id);
      if (!periodo) {
        return res.status(404).json({ message: 'Periodo no encontrado' });
      }
      res.json(periodo);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el periodo', error });
    }
  }
};

module.exports = {periodoController};
