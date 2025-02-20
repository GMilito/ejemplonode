const express = require("express");
const { obtenerCarreras, obtenerCarreraPorId, obtenerCarrerasPorInstitucion, crearCarrera, modificarCarrera, eliminarCarrera } = require("../controllers/carreraController");
const verificarToken = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.get("/", verificarToken, obtenerCarreras);
router.get("/:id", verificarToken, obtenerCarreraPorId);
router.get("/institucion/:id", verificarToken, obtenerCarrerasPorInstitucion);
router.post("/", verificarToken, crearCarrera);
router.put("/:id", verificarToken, modificarCarrera);
router.delete("/:id", verificarToken, eliminarCarrera);

module.exports = router;