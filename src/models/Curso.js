const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Carrera = require("./Carrera");

const Curso = sequelize.define("Curso", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(25), allowNull: false },
  nivel: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 12 } },
  carrera_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false, 
    references: { model: Carrera, key: "id" },
  },
}, {
  timestamps: true,
});

Curso.belongsTo(Carrera, { foreignKey: "carrera_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = Curso;