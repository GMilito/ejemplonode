const express = require("express");
const { obtenerCursos, obtenerCursoPorId, obtenerCursosPorCarrera, crearCurso, modificarCurso, eliminarCurso } = require("../controllers/cursoController");
const verificarToken = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.get("/", verificarToken, obtenerCursos);
router.get("/:id", verificarToken, obtenerCursoPorId);
router.get("/carrera/:id", verificarToken, obtenerCursosPorCarrera);
router.post("/", verificarToken, crearCurso);
router.put("/:id", verificarToken, modificarCurso);
router.delete("/:id", verificarToken, eliminarCurso);

module.exports = router;