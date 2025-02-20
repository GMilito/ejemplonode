const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Periodo = sequelize.define('Periodo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    anio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El año no puede estar vacío' }
        }
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El número del periodo no puede estar vacío' }
        }
    },
    fechaInicio: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'La fecha de inicio no puede estar vacía' },
            isDate: { msg: 'Debe ser una fecha válida' }
        }
    },
    fechaFin: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'La fecha de fin no puede estar vacía' },
            isDate: { msg: 'Debe ser una fecha válida' }
        }
    }
}, {
    tableName: 'periodos',
    timestamps: true
});

module.exports = { Periodo };
