function plugin(fastify, options, done) {
  fastify.decorate(
    "createFamilyAssets",
    async (params = { data: [], includes: [], options: {} }) => {
      return await fastify.db.models.Family_Assets.bulkCreate(params.data, {
        ...params.options,
      });
    }
  );

  fastify.decorate(
    "deleteFamilyAssets",
    async (params = { selection, options: {} }) => {
      return await fastify.db.models.Family_Assets.destroy(
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
