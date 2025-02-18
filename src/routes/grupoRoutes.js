const express = require('express');
const router = express.Router();
const {grupoController} = require('../controllers/grupoController');
const { validateToken } = require('../middleware/authMiddleware');

router.post('/', validateToken, grupoController.create);
router.put('/:id', validateToken, grupoController.update);
router.delete('/:id', validateToken, grupoController.delete);
router.get('/', validateToken, grupoController.getAll);
router.get('/:id', validateToken, grupoController.getById);


module.exports = router;