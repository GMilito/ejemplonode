const express = require("express");
const router = express.Router();
const institucionController = require("../controllers/institucionController");
//const autenticar = require("../middleware/authMiddleware");

router.post("/", institucionController.crear);
router.get("/", institucionController.obtenerTodas);
router.get("/:id", institucionController.obtenerPorId);
router.put("/:id", institucionController.actualizar);
router.delete("/:id", institucionController.eliminar);

module.exports = router;