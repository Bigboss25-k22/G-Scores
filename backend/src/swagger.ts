import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'G-Scores API',
      version: '1.0.0',
      description: 'API documentation for G-Scores backend',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Đường dẫn tới file có comment swagger
};

export const swaggerSpec = swaggerJSDoc(options); 