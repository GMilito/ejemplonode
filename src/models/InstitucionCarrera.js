const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Institucion = require("./Institucion");
const Carrera = require("./Carrera");

const InstitucionCarrera = sequelize.define("InstitucionCarrera", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  institucion_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Institucion, key: "id" },
  },
  carrera_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Carrera, key: "id" },
  },
});

module.exports = InstitucionCarrera;
