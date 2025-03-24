const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Profesor = require("./Profesor");

const Carrera = sequelize.define('Carrera', {
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
  },
  nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notEmpty: { msg: 'El nombre de la carrera no puede estar vacío' },
          is: {
              args: [/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/],
              msg: 'El nombre de la carrera solo puede contener letras y espacios'
          }
      }
  },
  institucionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: Institucion,
          key: 'id'
      }
  },
  directorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
          notEmpty: { msg: 'El director de la carrera debe estar registrado como un profesor' }
      }
  }
}, {
  tableName: 'carreras',
  timestamps: true
});

module.exports = { Carrera };