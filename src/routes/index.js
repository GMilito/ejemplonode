const express = require("express");
const router = express.Router();

const cursoRoutes = require("./cursoRoutes");
const profesorRoutes = require("./profesorRoutes");
const bitacoraRoutes = require("./bitacoraRoutes");

router.use("/curso", cursoRoutes);
router.use("/profesor", profesorRoutes);
router.use("/bitacora", bitacoraRoutes);

module.exports = router;