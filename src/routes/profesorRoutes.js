const express = require('express');
const router = express.Router();
const { profesorController  } = require('../controllers/profesorController');
const { validateToken } = require('../middleware/authMiddleware');


/**
 * @swagger
 * tags:
 *   name: Profesores
 *   description: Operaciones relacionadas con los profesores
 */

/**
 * @swagger
 * /profesor:
 *   post:
 *     summary: Crea un nuevo profesor
 *     tags: [Profesores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroIdentificacion:
 *                 type: string
 *                 description: Número de identificación del profesor
 *               tipoIdentificacion:
 *                 type: string
 *                 description: |  # <-- ¡Aquí el cambio importante!
 *                   Tipo de identificación (ej: Cédula, Pasaporte)
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del profesor
 *               nombreCompleto:
 *                 type: string
 *                 description: Nombre completo del profesor
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del profesor (YYYY-MM-DD)
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono del profesor
 *             required:
 *               - numeroIdentificacion
 *               - tipoIdentificacion
 *               - email
 *               - nombreCompleto
 *               - fechaNacimiento
 *               - telefono
 *     responses:
 *       201:
 *         description: Profesor creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post('/', validateToken, profesorController.create);
/**
 * @swagger
 * /profesor/{id}:
 *   put:
 *     summary: Modifica un profesor existente
 *     tags: [Profesores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del profesor a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroIdentificacion:
 *                 type: string
 *                 description: Número de identificación del profesor
 *               tipoIdentificacion:
 *                 type: string
 *                 description: |  # <-- ¡Aquí el cambio importante!
 *                   Tipo de identificación (ej: Cédula, Pasaporte)
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del profesor
 *               nombreCompleto:
 *                 type: string
 *                 description: Nombre completo del profesor
 *               fechaNacimiento:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento del profesor (YYYY-MM-DD)
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono del profesor
 *             required:
 *               - numeroIdentificacion
 *               - tipoIdentificacion
 *               - email
 *               - nombreCompleto
 *               - fechaNacimiento
 *               - telefono
 *     responses:
 *       200:
 *         description: Profesor modificado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put('/:id', validateToken, profesorController.update);
/**
 * @swagger
 * /profesor/{id}:
 *   delete:
 *     summary: Elimina un profesor
 *     tags: [Profesores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del profesor a eliminar
 *     responses:
 *       204: # Código correcto para DELETE sin contenido
 *         description: Profesor eliminado exitosamente
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', validateToken, profesorController.delete);
/**
 * @swagger
 * /profesor:
 *   get:
 *     summary: Obtiene todos los profesores
 *     tags: [Profesores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de profesores
 *       500:
 *         description: Error del servidor
 */
router.get('/', validateToken, profesorController.getAll);
/**
 * @swagger
 * /profesor/{id}:
 *   get:
 *     summary: Obtiene un profesor por ID
 *     tags: [Profesores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del profesor
 *     responses:
 *       200:
 *         description: Datos del profesor
 *       404:
 *         description: Profesor no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', validateToken, profesorController.getById);

module.exports = router;