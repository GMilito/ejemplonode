const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const TipoIdentificacion = require("./TipoIdentificacion");

const Profesor = sequelize.define("Profesor", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  identificacion: { type: DataTypes.BIGINT, allowNull: false },
  email: { type: DataTypes.STRING(25), allowNull: false, validate: { isEmail: true } },
  nombre_completo: { type: DataTypes.STRING(50), allowNull: false },
  fecha_nacimiento: { type: DataTypes.DATE, allowNull: false },
  tipo_identificacion_id: { type: DataTypes.INTEGER, allowNull: false },
});

// Definir la relación con TipoIdentificacion
Profesor.belongsTo(TipoIdentificacion, {
  foreignKey: "tipo_identificacion_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = Profesor;
