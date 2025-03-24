function validarNombre(nombre) {
    return /^[a-zA-Z\s]+$/.test(nombre);
  }
  
  function esMayorDeEdad(fechaNacimiento) {
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNac.getFullYear();
    return edad >= 18;
  }
  
  function validarEmail(email, dominio) {
    const regex = new RegExp(`^[a-zA-Z0-9._%+-]+@${dominio}$`);
    return regex.test(email);
  }
  
  module.exports = { validarNombre, esMayorDeEdad, validarEmail };
