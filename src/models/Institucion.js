const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Institucion = sequelize.define('Institucion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: { msg: 'El nombre de la institución no puede estar vacío' },
            is: {
                args: [/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/],
                msg: 'El nombre de la institución solo puede contener letras y espacios'
            }
        }
    }
}, {
    tableName: 'instituciones',
    timestamps: true
});

module.exports = {Institucion};
