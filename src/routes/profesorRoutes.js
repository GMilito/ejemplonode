const express = require('express');
const router = express.Router();
const { profesorController  } = require('../controllers/profesorController');
const { validateToken } = require('../middleware/authMiddleware');


router.post('/', validateToken, profesorController.create);
router.put('/:id', validateToken, profesorController.update);
router.delete('/:id', validateToken, profesorController.delete);
router.get('/', validateToken, profesorController.getAll);
router.get('/:id', validateToken, profesorController.getById);

module.exports = router;