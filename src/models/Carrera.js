const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Profesor = require("./Profesor");

const Carrera = sequelize.define("Carrera", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(25), allowNull: false },
  profesor_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Profesor, key: "id" },
  },
});

module.exports = Carrera;
