const express = require('express');
const router = express.Router();
const cursoController = require('../controllers/cursoController');
const { validateToken } = require('../middleware/authMiddleware'); // authMiddleware

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Operaciones relacionadas con los cursos
 */

/**
 * @swagger
 * /curso:
 *   post:
 *     summary: Crea un nuevo curso
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carreraId:
 *                 type: integer
 *                 description: ID de la carrera a la que pertenece el curso
 *               nivel:
 *                 type: integer
 *                 description: Nivel del curso (1-12)
 *               nombre:
 *                 type: string
 *                 description: Nombre del curso
 *             required:
 *               - carreraId
 *               - nivel
 *               - nombre
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', validateToken, cursoController.create);
/**
 * @swagger
 * /curso/{id}:
 *   put:
 *     summary: Modifica un curso existente
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carreraId:
 *                 type: integer
 *                 description: ID de la carrera a la que pertenece el curso
 *               nivel:
 *                 type: integer
 *                 description: Nivel del curso (1-12)
 *               nombre:
 *                 type: string
 *                 description: Nombre del curso
 *             required:
 *               - carreraId
 *               - nivel
 *               - nombre
 *     responses:
 *       200:
 *         description: Curso modificado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', validateToken, cursoController.update);
/**
 * @swagger
 * /curso/{id}:
 *   delete:
 *     summary: Elimina un curso
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso a eliminar
 *     responses:
 *       204: # Código de respuesta correcto para DELETE sin contenido
 *         description: Curso eliminado exitosamente
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', validateToken, cursoController.delete);
/**
 * @swagger
 * /curso:
 *   get:
 *     summary: Obtiene todos los cursos
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de cursos
 *       500:
 *         description: Error del servidor
 */
router.get('/', validateToken, cursoController.getAll);
/**
 * @swagger
 * /curso/{id}:
 *   get:
 *     summary: Obtiene un curso por ID
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Datos del curso
 *       404:
 *         description: Curso no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', validateToken, cursoController.getById);
/**
 * @swagger
 * /curso/institucion/{institucionId}:
 *   get:
 *     summary: Obtiene cursos por ID de carrera
 *     tags: [Cursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: institucionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la carrera
 *     responses:
 *       200:
 *         description: Lista de cursos por carrera
 *       500:
 *         description: Error del servidor
 */
router.get('/institucion/:institucionId', validateToken, cursoController.getByCarrera);

module.exports = router;