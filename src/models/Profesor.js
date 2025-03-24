const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const TipoIdentificacion = require("./TipoIdentificacion");

const Profesor = sequelize.define('Profesor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numeroIdentificacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoIdentificacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            isCucEmail(value) {
                const domain = process.env.EMAIL_DOMAIN || 'cuc.ac.cr';
                if (!value.endsWith(`@${domain}`)) {
                    throw new Error(`El email debe pertenecer al dominio ${domain}`);
                }
            }
        }
    },
    nombreCompleto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
        }
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isAdult(value) {
                const ageDifMs = Date.now() - new Date(value).getTime();
                const ageDate = new Date(ageDifMs);
                if (Math.abs(ageDate.getUTCFullYear() - 1970) < 18) {
                    throw new Error('El profesor debe ser mayor de edad');
                }
            }
        }
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Definir la relación con TipoIdentificacion
Profesor.belongsTo(TipoIdentificacion, {
  foreignKey: "tipo_identificacion_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = Profesor;
