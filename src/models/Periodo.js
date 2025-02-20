const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Periodo = sequelize.define("Periodo", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  año: { type: DataTypes.DATE, allowNull: false },
  numeroPeriodo: { type: DataTypes.INTEGER, allowNull: false },
  fechaInicio: { type: DataTypes.DATE, allowNull: false },
  fechaFinal: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Periodo;