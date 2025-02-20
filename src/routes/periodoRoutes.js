const express = require('express');
const router = express.Router();
const { periodoController } = require('../controllers/periodoController');
const { validateToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Periodos
 *   description: Operaciones relacionadas con los periodos
 */

/**
 * @swagger
 * /periodo:
 *   post:
 *     summary: Crea un nuevo periodo
 *     tags: [Periodos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               anio:
 *                 type: integer
 *                 description: Año del periodo
 *               numero:
 *                 type: integer
 *                 description: |  # <--  ¡Aquí el cambio importante!
 *                   Número del periodo (ej: 1, 2, 3...)
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio del periodo (YYYY-MM-DD)
 *               fechaFin:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin del periodo (YYYY-MM-DD)
 *             required:
 *               - anio
 *               - numeroPeriodo
 *               - fechaInicio
 *               - fechaFin
 *     responses:
 *       201:
 *         description: Periodo creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', validateToken, periodoController.create);
/**
 * @swagger
 * /periodo:
 *   put:
 *     summary: Modifica un periodo existente
 *     tags: [Periodos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del periodo a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               anio:
 *                 type: integer
 *                 description: Año del periodo
 *               numero:
 *                 type: integer
 *                 description: |  # <-- ¡Aquí también faltaba el | !
 *                   Número del periodo (ej: 1, 2, 3...)
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 description: Fecha de inicio del periodo (YYYY-MM-DD)
 *               fechaFin:
 *                 type: string
 *                 format: date
 *                 description: Fecha de fin del periodo (YYYY-MM-DD)
 *             required:
 *               - anio
 *               - numeroPeriodo
 *               - fechaInicio
 *               - fechaFin
 *     responses:
 *       200:
 *         description: Periodo modificado exitosamente
 *       404:
 *         description: Periodo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', validateToken, periodoController.update);
/**
 * @swagger
 * /periodo/{id}:
 *   delete:
 *     summary: Elimina un periodo
 *     tags: [Periodos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del periodo a eliminar
 *     responses:
 *       204: # Código correcto para DELETE sin contenido
 *         description: Periodo eliminado exitosamente
 *       404:
 *         description: Periodo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', validateToken, periodoController.delete);
/**
 * @swagger
 * /periodo:
 *   get:
 *     summary: Obtiene todos los periodos
 *     tags: [Periodos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de periodos
 *       500:
 *         description: Error del servidor
 */
router.get('/', validateToken, periodoController.getAll);
/**
 * @swagger
 * /periodo/{id}:
 *   get:
 *     summary: Obtiene un periodo por ID
 *     tags: [Periodos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del periodo
 *     responses:
 *       200:
 *         description: Datos del periodo
 *       404:
 *         description: Periodo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', validateToken, periodoController.getById);


module.exports = router;