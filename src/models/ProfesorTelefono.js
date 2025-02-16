const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Profesor = require("./Profesor");

const ProfesorTelefono = sequelize.define("ProfesorTelefono", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  telefono: { type: DataTypes.STRING(10), allowNull: false },
  profesor_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Profesor, key: "id" },
  },
});

module.exports = ProfesorTelefono;
