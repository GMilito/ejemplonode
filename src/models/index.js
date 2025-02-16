const sequelize = require("../db");
const TipoIdentificacion = require("./TipoIdentificacion");
const Institucion = require("./Institucion");
const Profesor = require("./Profesor");
const ProfesorTelefono = require("./ProfesorTelefono");
const Carrera = require("./Carrera");
const InstitucionCarrera = require("./InstitucionCarrera");
const Curso = require("./Curso");

// 🔹 Relaciones
Profesor.belongsTo(TipoIdentificacion, { foreignKey: "tipo_identificacion_id" });

Profesor.hasMany(ProfesorTelefono, { foreignKey: "profesor_id" });
ProfesorTelefono.belongsTo(Profesor, { foreignKey: "profesor_id" });

Carrera.belongsTo(Profesor, { foreignKey: "profesor_id" });

InstitucionCarrera.belongsTo(Institucion, { foreignKey: "institucion_id" });
InstitucionCarrera.belongsTo(Carrera, { foreignKey: "carrera_id" });

Curso.belongsTo(Carrera, { foreignKey: "carrera_id" });

module.exports = {
  sequelize,
  TipoIdentificacion,
  Institucion,
  Profesor,
  ProfesorTelefono,
  Carrera,
  InstitucionCarrera,
  Curso,
};
