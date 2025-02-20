const sequelize = require("../config/database");
const TipoIdentificacion = require("./TipoIdentificacion");
const Institucion = require("./Institucion");
const Profesor = require("./Profesor");
const ProfesorTelefono = require("./ProfesorTelefono");
const Carrera = require("./Carrera");
const InstitucionCarrera = require("./InstitucionCarrera");
const Curso = require("./Curso");
const Bitacora = require("./Bitacora"); // Agregar Bitacora

Profesor.belongsTo(TipoIdentificacion, { foreignKey: "tipo_identificacion_id" });

Profesor.hasMany(ProfesorTelefono, { foreignKey: "profesor_id" });
ProfesorTelefono.belongsTo(Profesor, { foreignKey: "profesor_id" });

Carrera.belongsTo(Profesor, { foreignKey: "profesor_id" });

InstitucionCarrera.belongsTo(Institucion, { foreignKey: "institucion_id" });
InstitucionCarrera.belongsTo(Carrera, { foreignKey: "carrera_id" });

Curso.belongsTo(Carrera, { foreignKey: "carrera_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Bitacora.belongsTo(Profesor, { foreignKey: "profesor_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = {
  sequelize,
  TipoIdentificacion,
  Institucion,
  Profesor,
  ProfesorTelefono,
  Carrera,
  InstitucionCarrera,
  Curso,
  Bitacora,
};