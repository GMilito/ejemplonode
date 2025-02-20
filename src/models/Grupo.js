const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { Curso } = require('./Curso');

const Grupo = sequelize.define('Grupo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El número del grupo no puede estar vacío' }
        }
    },
    cursoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Curso,
            key: 'id'
        }
    },
    profesorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El profesor que imparte el grupo no puede estar vacío' }
        }
    },
    horario: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El horario no puede estar vacío' }
        }
    },
    periodo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El periodo no puede estar vacío' }
        }
    }
}, {
    tableName: 'grupos',
    timestamps: true
});

module.exports = { Grupo };
