const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const Usuarios = sequelize.define("Usuarios", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
},

{
  timestamps: false,
});

// Hash automático antes de guardar
Usuarios.beforeCreate(async (usuario) => {
  usuario.password = await bcrypt.hash(usuario.password, 10);
});

module.exports = Usuarios;
