const {
  createFamilyAssets,
  deleteFamilyAssets,
} = require("../controllers/family.asset.controller");

async function routes(fastify, options) {
  fastify.route({
    method: "POST",
    url: "/:family_id/assets",
    schema: {
      description: "Add Family Asset",
      summary: "Soal 2.d Dapat menambah data aset keluarga",
      tags: ["Family Asset"],
      params: {
        type: "object",
        properties: {
          family_id: { type: "integer" },
        },
        required: ["family_id"],
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
    handler: createFamilyAssets,
  });

  fastify.route({
    method: "DELETE",
    url: "/:family_id/assets",
    schema: {
      description: "Delete Family Asset",
      summary: "Soal 2.f Dapat menghapus data aset keluarga",
      tags: ["Family Asset"],
      params: {
        type: "object",
        properties: {
          family_id: { type: "integer" },
        },
        required: ["family_id"],
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
    handler: deleteFamilyAssets,
  });
}

module.exports = routes;
