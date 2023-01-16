const {
  getFamilies,
  getFamily,
  createFamily,
  updateFamily,
} = require("../controllers/family.controller");
const { familyTransform } = require("../transforms/family.transform");

async function routes(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      description: "Get All Family",
      tags: ["Family"],
      response: {
        200: {
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" },
            data: {
              type: "array",
              items: {
                ...familyTransform,
              },
            },
          },
        },
      },
    },
    handler: getFamilies,
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: {
      description: "Get Detail Family",
      tags: ["Family"],
      params: {
        type: "object",
        properties: {
          id: { type: "integer" },
        },
        required: ["id"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" },
            data: {
              ...familyTransform,
            },
          },
        },
      },
    },
    handler: getFamily,
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      description: "Create Family",
      tags: ["Family"],
      body: {
        type: "object",
        properties: {
          kepala_keluarga: { type: "string" },
        },
        required: ["kepala_keluarga"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: createFamily,
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: {
      description: "Update Family",
      tags: ["Family"],
      body: {
        type: "object",
        properties: {
          kepala_keluarga: { type: "string" },
        },
        required: ["kepala_keluarga"],
      },
      response: {
        200: {
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: updateFamily,
  });
}

module.exports = routes;
