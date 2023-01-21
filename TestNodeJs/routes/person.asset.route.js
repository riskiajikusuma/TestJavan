const {
  createPersonAssets,
  deletePersonAssets,
} = require("../controllers/person.asset.controller");

async function routes(fastify, options) {
  fastify.route({
    method: "POST",
    url: "/:person_id/assets",
    schema: {
      description: "Add Person Asset",
      summary:
        "Soal 2.g Dapat menambahkan aset yang dimiliki oleh suatu orang dalam keluarga",
      tags: ["Person Asset"],
      params: {
        type: "object",
        properties: {
          person_id: { type: "integer" },
        },
        required: ["person_id"],
      },
      body: {
        type: "object",
        properties: {
          asset_id: {
            type: "array",
            items: {
              type: "integer",
            },
          },
        },
        required: ["asset_id"],
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
    handler: createPersonAssets,
  });

  fastify.route({
    method: "DELETE",
    url: "/:person_id/assets",
    schema: {
      description: "Delete Person Asset",
      summary:
        "Soal 2.h Dapat mengurangi asset yang dimiliki oleh suatu orang dalam keluarga",
      tags: ["Person Asset"],
      params: {
        type: "object",
        properties: {
          person_id: { type: "integer" },
        },
        required: ["person_id"],
      },
      body: {
        type: "object",
        properties: {
          asset_id: {
            type: "array",
            items: {
              type: "integer",
            },
          },
        },
        required: ["asset_id"],
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
    handler: deletePersonAssets,
  });
}

module.exports = routes;
