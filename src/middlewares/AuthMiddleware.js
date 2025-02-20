const axios = require("axios");

// URL del servicio de autenticación (Mock Server de Postman o servicio real)
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "https://9de2448c-919b-4cb5-a8f6-6b26cf925ebb.mock.pstmn.io/validate";

const verificarToken = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Token requerido" });
  }

  try {
    const response = await axios.post(AUTH_SERVICE_URL, { token });

    if (response.status === 200 && response.data.valid === true) {
      req.profesor_id = response.data.profesor_id || null;
      console.log("✅ Token válido. Profesor ID:", req.profesor_id);
      next();
    } else {
      return res.status(401).json({ error: "Token inválido" });
    }
  } catch (error) {
    console.error("Error en la validación del token:", error.response ? error.response.data : error.message);
    return res.status(500).json({ error: "Error al validar el token" });
  }
};

module.exports = verificarToken;





