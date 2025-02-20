const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Profesor = require("./Profesor");

const Carrera = sequelize.define("Carrera", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false, validate: { is: /^[a-zA-Z\s]+$/ } },
  profesor_id: {
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Profesor, key: "id" },
  }
}, {
  timestamps: true,
});

module.exports = Carrera;