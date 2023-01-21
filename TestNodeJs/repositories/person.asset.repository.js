function plugin(fastify, options, done) {
  fastify.decorate(
    "createPersonAssets",
    async (params = { data: [], includes: [], options: {} }) => {
      return await fastify.db.models.Person_Assets.bulkCreate(params.data, {
        ...params.options,
      });
    }
  );

  fastify.decorate(
    "deletePersonAssets",
    async (params = { selection, options: {} }) => {
      return await fastify.db.models.Person_Assets.destroy(
        { where: params.selection },
        {
          ...params.options,
        }
      );
    }
  );

  done();
}

module.exports = require("fastify-plugin")(plugin);
