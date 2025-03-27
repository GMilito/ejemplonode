function validarNombre(nombre) {
    return /^[a-zA-Z\s]+$/.test(nombre);
  }
  
  function esMayorDeEdad(fechaNacimiento) {
    console.log('fechaNacimiento ', fechaNacimiento);

    // Convertir la fecha al formato ISO (YYYY-MM-DD)
    const partesFecha = fechaNacimiento.split('/');
    const fechaFormateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;

    // Crear objeto Date con el formato correcto
    const fechaNac = new Date(fechaFormateada);
    console.log('fechaNac ', fechaNac);

    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    console.log(edad);
    
    // Si la fecha de cumpleaños no ha pasado este año, restar un año
    const mes = hoy.getMonth();
    const dia = hoy.getDate();
    if (mes < fechaNac.getMonth() || (mes === fechaNac.getMonth() && dia < fechaNac.getDate())) {
        edad--;
    }

    return edad >= 18;
}

function returnFecha(fechaNacimiento) {
  console.log('fechaNacimiento ', fechaNacimiento);

  // Convertir la fecha al formato ISO (YYYY-MM-DD)
  const partesFecha = fechaNacimiento.split('/');
  const fechaFormateada = `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;

  // Crear objeto Date con el formato correcto
  const fechaNac = new Date(fechaFormateada);
  console.log('fechaNac ', fechaNac);


  return fechaNac;
}
  
  function validarEmail(email, dominio) {
    const regex = new RegExp(`^[a-zA-Z0-9._%+-]+@${dominio}$`);
    return regex.test(email);
  }
  
  module.exports = { validarNombre, esMayorDeEdad, validarEmail, returnFecha };
  