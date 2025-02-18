const express = require('express');
const router = express.Router();
const { crearCarrera, eliminarCarrera, modificarCarrera, obtenerCarreraPorId, obtenerCarreras, obtenerCarrerasPorInstitucion } = require('../controllers/carreraController');
const { validateToken } = require('../middleware/authMiddleware');

router.post('/', validateToken, crearCarrera);
router.put('/:id', validateToken, modificarCarrera);
router.delete('/:id', validateToken, eliminarCarrera);
router.get('/', validateToken, obtenerCarreras);
router.get('/:id', validateToken, obtenerCarreraPorId);
router.get('/institucion/:institucionId', validateToken, obtenerCarrerasPorInstitucion);

module.exports = router;