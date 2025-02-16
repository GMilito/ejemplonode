const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const TipoIdentificacion = sequelize.define("TipoIdentificacion", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(20), allowNull: false },
});

module.exports = TipoIdentificacion;
