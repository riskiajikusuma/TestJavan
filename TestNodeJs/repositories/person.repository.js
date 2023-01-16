const fp = require("fastify-plugin");

function plugin(fastify, options, done) {
  //   fastify.decorate(
  //     "getFamilies",
  //     async (params = { selection: {}, includes: [], options: {} }) => {
  //       return await fastify.db.Family.findAll({
  //         where: params.selection,
  //         include: params.includes,
  //         ...params.options,
  //       });
  //     }
  //   );

  //   fastify.decorate(
  //     "getFamily",
  //     async (params = { selection: {}, includes: [], options: {} }) => {
  //       return await fastify.db.Family.findOne({
  //         where: params.selection,
  //         include: params.includes,
  //         ...params.options,
  //       });
  //     }
  //   );
  /*
  fastify.decorate("createFamily", async (params = { data, options: {} }) => {
    return await fastify.db.Family.create(
      { ...params.data },
      { ...params.options }
    );
  });

  fastify.decorate("updateFamily", async (params = { data, selection }) => {
    return await fastify.db.Family.update(
      {
        ...params.data,
      },
      { where: params.selection },
      { ...params.options }
    );
  });

  fastify.decorate("deleteFamily", async (params = { selection }) => {
    return await fastify.db.Family.delete({ where: params.selection });
  });
  */
  done();
}

module.exports = fp(plugin);
