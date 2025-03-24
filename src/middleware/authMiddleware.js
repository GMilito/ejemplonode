const { validarToken } = require("../services/authService");

const autenticar = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const payload = validarToken(token);

  if (!payload) {
    return res.status(401).json({ message: "Token inválido" });
  }

  req.usuario = payload;
  next();
};

module.exports = autenticar;
