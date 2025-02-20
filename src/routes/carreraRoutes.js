const express = require('express');
const router = express.Router();
const { crearCarrera, eliminarCarrera, modificarCarrera, obtenerCarreraPorId, obtenerCarreras, obtenerCarrerasPorInstitucion } = require('../controllers/carreraController');
const { validateToken } = require('../middleware/authMiddleware');


/**
 * @swagger
 * tags:
 *   name: Carreras
 *   description: Operaciones relacionadas con las carreras
 */

/**
 * @swagger
 * /carrera:
 *   post:
 *     summary: Crea una nueva carrera
 *     tags: [Carreras]
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
 *                 description: Nombre de la carrera
 *               institucionId:
 *                 type: integer
 *                 description: ID de la institución
 *               directorId:
 *                 type: integer
 *                 description: ID del director (profesor)
 *             required:
 *               - nombre
 *               - institucionId
 *               - directorId
 *     responses:
 *       201:
 *         description: Carrera creada exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Institución o director no encontrado
 *       500:
 *         description: Error del servidor
 */
router.post('/', validateToken, crearCarrera);
/**
 * @swagger
 * /carrera/{id}:
 *   put:
 *     summary: Modifica una carrera existente
 *     tags: [Carreras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la carrera a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nuevo nombre de la carrera
 *               institucionId:
 *                 type: integer
 *                 description: Nuevo ID de la institución
 *               directorId:
 *                 type: integer
 *                 description: Nuevo ID del director (profesor)
 *             required:
 *               - nombre
 *               - institucionId
 *               - directorId
 *     responses:
 *       200:
 *         description: Carrera modificada exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Carrera, institución o director no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', validateToken, modificarCarrera);
/**
 * @swagger
 * /carrera/{id}:
 *   delete:
 *     summary: Elimina una carrera
 *     tags: [Carreras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la carrera a eliminar
 *     responses:
 *       204:
 *         description: Carrera eliminada exitosamente
 *       404:
 *         description: Carrera no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', validateToken, eliminarCarrera);
/**
 * @swagger
 * /carrera:
 *   get:
 *     summary: Obtiene todas las carreras
 *     tags: [Carreras]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de carreras
 *       500:
 *         description: Error del servidor
 */
router.get('/',validateToken, obtenerCarreras);
/**
 * @swagger
 * /carrera/{id}:
 *   get:
 *     summary: Obtiene una carrera por ID
 *     tags: [Carreras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la carrera
 *     responses:
 *       200:
 *         description: Datos de la carrera
 *       404:
 *         description: Carrera no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', validateToken ,obtenerCarreraPorId);
/**
 * @swagger
 * /carrera/institucion/{institucionId}:
 *   get:
 *     summary: Obtiene carreras por ID de institución
 *     tags: [Carreras]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: institucionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la institución
 *     responses:
 *       200:
 *         description: Lista de carreras por institución
 *       500:
 *         description: Error del servidor
 */
router.get('/institucion/:institucionId', validateToken, obtenerCarrerasPorInstitucion);

module.exports = router;