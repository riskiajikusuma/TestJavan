function plugin(fastify, options, done) {
  fastify.decorate(
    "getAssets",
    async (params = { selection: {}, includes: [], options: {} }) => {
      return await fastify.db.models.Asset.findAll({
        where: params.selection,
        include: params.includes,
        ...params.options,
      });
    }
  );

  fastify.decorate(
    "getAsset",
    async (params = { selection: {}, includes: [], options: {} }) => {
      return await fastify.db.models.Asset.findOne({
        where: params.selection,
        include: params.includes,
        ...params.options,
      });
    }
  );

  fastify.decorate("createAsset", async (params = { data, options: {} }) => {
    return await fastify.db.models.Asset.create(
      { ...params.data },
      { ...params.options }
    );
  });

  fastify.decorate(
    "updateAsset",
    async (params = { data, selection, options: {} }) => {
      return await fastify.db.models.Asset.update(
        {
          ...params.data,
        },
        { where: params.selection },
        { ...params.options }
      );
    }
  );

  fastify.decorate(
    "deleteAsset",
    async (params = { selection, options: {} }) => {
      return await fastify.db.models.Asset.destroy(
        { where: params.selection },
        { ...params.options }
      );
    }
  );

  done();
}

module.exports = require("fastify-plugin")(plugin);
