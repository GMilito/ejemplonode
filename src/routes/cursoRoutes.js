const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const { validateToken } = require('../middleware/authMiddleware'); // authMiddleware

router.post('/', validateToken, cursoController.create);
router.put('/:id', validateToken, cursoController.update);
router.delete('/:id', validateToken, cursoController.delete);
router.get('/', validateToken, cursoController.getAll);
router.get('/:id', validateToken, cursoController.getById);
router.get('/institucion/:institucionId', validateToken, cursoController.getByCarrera);

module.exports = router;