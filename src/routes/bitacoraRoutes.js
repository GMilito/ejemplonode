const express = require("express");
const { obtenerBitacora } = require("../controllers/bitacoraController");
const verificarToken = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.get("/", verificarToken, obtenerBitacora);

module.exports = router;