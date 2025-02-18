const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const validateToken = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
    req.user = decoded;
    //next(); // descomentar este next cuando la validación del otro grupo funcione
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
};

module.exports = { validateToken };
