const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Carrera } = require('./Carrera');

const Curso = sequelize.define('Curso', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  carreraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: Carrera,
          key: 'id'
      }
  },
  nivel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          min: { args: [1], msg: 'El nivel debe ser al menos 1' },
          max: { args: [12], msg: 'El nivel no puede ser mayor a 12' }
      }
  },
  nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: { msg: 'El nombre del curso no puede estar vacío' },
          is: {
              args: [/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/],
              msg: 'El nombre del curso solo puede contener letras y espacios'
          }
      }
  }
}, {
  tableName: 'cursos',
  timestamps: true
});

module.exports = { Curso };