const axios = require("axios");

// URL del servicio de autenticación (Mock Server de Postman o servicio real)
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "https://d233b47a-31e6-4f2b-90a9-c65c454fe3ca.mock.pstmn.io/validate";

const verificarToken = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ error: "Token requerido" });
  }

  try {
    const response = await axios.get(AUTH_SERVICE_URL, { token });

    if (response.status === 200) {
      next(); // Token válido, continuar con la solicitud
    } else {
      console.log(response.status);
      return res.status(401).json({ error: "Token inválido" });
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return res.status(401).json({ error: "Token inválido" });
    }
    return res.status(500).json({ error: "Error al validar el token" });
  }
};

module.exports = verificarToken;

