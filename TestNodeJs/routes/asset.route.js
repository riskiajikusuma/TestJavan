const {
  getAssets,
  getAsset,
  createAsset,
  updateAsset,
  deleteAsset,
} = require("../controllers/asset.controller");
const { assetTransform } = require("../transforms/asset.transform");

async function routes(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      description: "Get All Assets",
      tags: ["Asset"],
      response: {
        200: {
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" },
            data: {
              type: "array",
              items: {
                ...assetTransform,
              },
            },
          },
        },
      },
    },
    handler: getAssets,
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: {
      description: "Get Detail Asset",
      tags: ["Asset"],
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
              ...assetTransform,
            },
          },
        },
      },
    },
    handler: getAsset,
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      description: "Create Asset",
      tags: ["Asset"],
      body: {
        type: "object",
        properties: {
          asset: { type: "string" },
          harga: { type: "integer" },
        },
        required: ["asset", "harga"],
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
    handler: createAsset,
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: {
      description: "Update Asset",
      tags: ["Asset"],
      params: {
        type: "object",
        properties: {
          id: { type: "integer" },
        },
        required: ["id"],
      },
      body: {
        type: "object",
        properties: {
          asset: { type: "string" },
          harga: { type: "integer" },
        },
        required: ["asset", "harga"],
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
    handler: updateAsset,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      description: "Delete Asset",
      tags: ["Asset"],
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
          },
        },
      },
    },
    handler: deleteAsset,
  });
}

module.exports = routes;
