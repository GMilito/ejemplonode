const express = require('express');
const router = express.Router();
const {crearInstitucion, eliminarInstitucion, modificarInstitucion, obtenerInstitucionPorId, obtenerInstituciones} = require('../controllers/institucionController');
const { validateToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Instituciones
 *   description: Operaciones relacionadas con las instituciones
 */

/**
 * @swagger
 * /institucion:
 *   post:
 *     summary: Crea una nueva institución
 *     tags: [Instituciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la institución
 *             required:
 *               - nombre
 *     responses:
 *       201:
 *         description: Institución creada exitosamente
 *       400:
 *         description: Nombre inválido
 *       500:
 *         description: Error del servidor
 */
router.post('/', validateToken, crearInstitucion);
/**
 * @swagger
 * /institucion/{id}:
 *   put:
 *     summary: Modifica una institución existente
 *     tags: [Instituciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la institución a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre de la institución
 *             required:
 *               - nombre
 *     responses:
 *       200:
 *         description: Institución modificada exitosamente
 *       400:
 *         description: Nombre inválido
 *       404:
 *         description: Institución no encontrada
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', validateToken, modificarInstitucion);
/**
 * @swagger
 * /institucion/{id}:
 *   delete:
 *     summary: Elimina una institución
 *     tags: [Instituciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la institución a eliminar
 *     responses:
 *       204:  # Código correcto para DELETE sin contenido
 *         description: Institución eliminada exitosamente
 *       404:
 *         description: Institución no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', validateToken, eliminarInstitucion);
/**
 * @swagger
 * /institucion:
 *   get:
 *     summary: Obtiene todas las instituciones
 *     tags: [Instituciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de instituciones
 *       500:
 *         description: Error del servidor
 */
router.get('/', validateToken, obtenerInstituciones);
/**
 * @swagger
 * /institucion/{id}:
 *   get:
 *     summary: Obtiene una institución por ID
 *     tags: [Instituciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la institución
 *     responses:
 *       200:
 *         description: Datos de la institución
 *       404:
 *         description: Institución no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', validateToken, obtenerInstitucionPorId);

module.exports = router;
