const express = require("express");
const router = express.Router();

const cursoRoutes = require("./cursoRoutes");
const profesorRoutes = require("./profesorRoutes");
const bitacoraRoutes = require("./bitacoraRoutes");
const carreraRoutes = require("./carreraRoutes");

router.use("/curso", cursoRoutes);
router.use("/profesor", profesorRoutes);
router.use("/bitacora", bitacoraRoutes);
router.use("/carrera", carreraRoutes);

module.exports = router;
