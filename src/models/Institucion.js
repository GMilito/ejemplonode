const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Institucion = sequelize.define("Institucion", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false },
});

module.exports = Institucion;
