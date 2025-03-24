const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Curso = require("./Curso");
const Profesor = require("./Profesor");
const Periodo = require("./Periodo");

const Grupo = sequelize.define("Grupo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  curso_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Curso, key: "id" },
  },
  profesor_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Profesor, key: "id" },
  },
  periodo_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Periodo, key: "id" },
  },
});

module.exports = Grupo;
