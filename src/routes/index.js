const express = require('express');
const profesorRoutes = require('./profesorRoutes');

const router = express.Router();
router.use('/profesor', profesorRoutes);

module.exports = router;