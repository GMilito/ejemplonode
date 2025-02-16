const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Carrera = require("./Carrera");

const Curso = sequelize.define("Curso", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(25), allowNull: false },
  nivel: { type: DataTypes.INTEGER, allowNull: false },
  carrera_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Carrera, key: "id" },
  },
});

module.exports = Curso;
