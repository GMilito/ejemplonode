const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Profesor = require("./Profesor");

const Bitacora = sequelize.define("Bitacora", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  profesor_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Profesor, key: "id" },
  },
  accion: { type: DataTypes.STRING(50), allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: false },
  fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

Bitacora.belongsTo(Profesor, { foreignKey: "profesor_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = Bitacora;