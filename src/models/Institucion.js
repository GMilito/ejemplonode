const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Institucion = sequelize.define("Institucion", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false },
},
{
  tableName: "Institucion",
timestamps: false
});

module.exports = Institucion;
