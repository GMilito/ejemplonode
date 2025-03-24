const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0', // Especifica la versión de OpenAPI
    info: {
      title: 'Módulo de Oferta académica',
      version: '1.0.0',
      description: 'Documentación de los requerimientos ACD1, ACD2, ACD3, ACD4, ACD5, ACD6',
    },
    components: { // <-- Añade esta sección
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
  },
  apis: ['./src/routes/*.js'], // Rutas donde se encuentran tus archivos de rutas
};

const specs = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};