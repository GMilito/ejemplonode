const express = require('express');
const router = express.Router();
const {grupoController} = require('../controllers/grupoController');
const { validateToken } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Grupos
 *   description: Operaciones relacionadas con los grupos
 */

/**
 * @swagger
 * /grupo:
 *   post:
 *     summary: Crea un nuevo grupo
 *     tags: [Grupos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: integer
 *                 description: Número del grupo
 *               cursoId:
 *                 type: integer
 *                 description: ID del curso
 *               profesorId:
 *                 type: integer
 *                 description: ID del profesor
 *               horario:
 *                 type: string
 *                 description: Horario del grupo
 *               periodoId:
 *                 type: integer
 *                 description: ID del periodo
 *             required:
 *               - numero
 *               - cursoId
 *               - profesorId
 *               - horario
 *               - periodoId
 *     responses:
 *       201:
 *         description: Grupo creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', validateToken, grupoController.create);
/**
 * @swagger
 * /grupo/{id}:
 *   put:
 *     summary: Modifica un grupo existente
 *     tags: [Grupos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del grupo a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: integer
 *                 description: Nuevo número del grupo
 *               cursoId:
 *                 type: integer
 *                 description: Nuevo ID del curso
 *               profesorId:
 *                 type: integer
 *                 description: Nuevo ID del profesor
 *               horario:
 *                 type: string
 *                 description: Nuevo horario del grupo
 *               periodoId:
 *                 type: integer
 *                 description: Nuevo ID del periodo
 *             required:
 *               - numero
 *               - cursoId
 *               - profesorId
 *               - horario
 *               - periodoId
 *     responses:
 *       200:
 *         description: Grupo modificado exitosamente
 *       404:
 *         description: Grupo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', validateToken, grupoController.update);
/**
 * @swagger
 * /grupo/{id}:
 *   delete:
 *     summary: Elimina un grupo
 *     tags: [Grupos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del grupo a eliminar
 *     responses:
 *       200:  # Aunque tu controlador usa 200, Swagger recomienda 204 para DELETE
 *         description: Grupo eliminado exitosamente
 *       404:
 *         description: Grupo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', validateToken, grupoController.delete);
/**
 * @swagger
 * /grupo:
 *   get:
 *     summary: Obtiene todos los grupos
 *     tags: [Grupos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de grupos
 *       500:
 *         description: Error del servidor
 */
router.get('/', validateToken, grupoController.getAll);
/**
 * @swagger
 * /grupo/{id}:
 *   get:
 *     summary: Obtiene un grupo por ID
 *     tags: [Grupos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del grupo
 *     responses:
 *       200:
 *         description: Datos del grupo
 *       404:
 *         description: Grupo no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', validateToken, grupoController.getById);


module.exports = router;