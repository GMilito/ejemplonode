const express = require('express');
const router = express.Router();
const { periodoController } = require('../controllers/periodoController');
const { validateToken } = require('../middleware/authMiddleware');

router.post('/', validateToken, periodoController.create);
router.put('/:id', validateToken, periodoController.update);
router.delete('/:id', validateToken, periodoController.delete);
router.get('/', validateToken, periodoController.getAll);
router.get('/:id', validateToken, periodoController.getById);


module.exports = router;