const {
  getPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson,
} = require("../controllers/person.controller");
const { personTransform } = require("../transforms/person.transform");

async function routes(fastify, options) {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      description: "Get All People",
      tags: ["Person"],
      response: {
        200: {
          type: "object",
          properties: {
            statusCode: { type: "integer" },
            message: { type: "string" },
            data: {
              type: "array",
              items: {
                ...personTransform,
              },
            },
          },
        },
      },
    },
    handler: getPeople,
  });

  fastify.route({
    method: "GET",
    url: "/:id",
    schema: {
      description: "Get Detail Person",
      summary:
        "Soal 2.i Dapat menampilkan total nilai (price) aset yang dimiliki oleh masing-masing orang dalam suatu keluarga",
      tags: ["Person"],
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
              ...personTransform,
              assets_price: { type: "integer" },
            },
          },
        },
      },
    },
    handler: getPerson,
  });

  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      description: "Create Person",
      summary: "Soal 2.a Dapat menambahkan data orang baru ke keluarga",
      tags: ["Person"],
      body: {
        type: "object",
        properties: {
          nama: { type: "string" },
          jenis_kelamin: { type: "string" },
          family_id: { type: "integer" },
        },
        required: ["nama", "jenis_kelamin", "family_id"],
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
    handler: createPerson,
  });

  fastify.route({
    method: "PUT",
    url: "/:id",
    schema: {
      description: "Update Person",
      summary: "Soal 2.b Dapat mengedit data orang dalam keluarga",
      tags: ["Person"],
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
          nama: { type: "string" },
          jenis_kelamin: { type: "string" },
          family_id: { type: "integer" },
        },
        required: ["nama", "jenis_kelamin"],
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
    handler: updatePerson,
  });

  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      description: "Delete Person",
      summary: "Soal 2.c Dapat menghapus data orang dalam keluarga",
      tags: ["Person"],
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
    handler: deletePerson,
  });
}

module.exports = routes;
