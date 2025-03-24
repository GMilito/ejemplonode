const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bitacora = sequelize.define('Bitacora', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    entidadId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    tableName: 'bitacora'
});

module.exports = Bitacora;