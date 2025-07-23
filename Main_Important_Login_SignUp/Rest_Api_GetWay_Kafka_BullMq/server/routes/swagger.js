const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Name",
      version: "1.0.0",
      description: "Your API documentation",
    },
    servers: [
      {
       url: "http://localhost:9000/getuser",// Change to your API server URL
      },
    ],
  },
apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
