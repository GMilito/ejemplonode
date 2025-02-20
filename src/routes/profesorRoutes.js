const express = require("express");
const router = express.Router();
const profesorController = require("../controllers/profesorController");
const verificarToken = require("../middlewares/AuthMiddleware");

// Aplicar la validación de token en todas las rutas
router.get("/", verificarToken, profesorController.obtenerProfesores);
router.get("/:id", verificarToken, profesorController.obtenerProfesorPorId);
router.post("/", verificarToken, profesorController.crearProfesor);
router.patch("/:id", verificarToken, profesorController.modificarProfesor);
router.delete("/:id", verificarToken, profesorController.eliminarProfesor);

module.exports = router;
