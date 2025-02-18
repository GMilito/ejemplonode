const express = require('express');
const router = express.Router();
const {crearInstitucion, eliminarInstitucion, modificarInstitucion, obtenerInstitucionPorId, obtenerInstituciones} = require('../controllers/institucionController');
const { validateToken } = require('../middleware/authMiddleware');

router.post('/', validateToken, crearInstitucion);
router.put('/:id', validateToken, modificarInstitucion);
router.delete('/:id', validateToken, eliminarInstitucion);
router.get('/', validateToken, obtenerInstituciones);
router.get('/:id', validateToken, obtenerInstitucionPorId);

module.exports = router;
