function plugin(fastify, options, done) {
  fastify.decorate(
    "getFamilies",
    async (params = { selection: {}, includes: [], options: {} }) => {
      return await fastify.db.models.Family.findAll({
        where: params.selection,
        include: params.includes,
        ...params.options,
      });
    }
  );

  fastify.decorate(
    "getFamily",
    async (params = { selection: {}, includes: [], options: {} }) => {
      return await fastify.db.models.Family.findOne({
        where: params.selection,
        include: params.includes,
        ...params.options,
      });
    }
  );

  fastify.decorate("createFamily", async (params = { data, options: {} }) => {
    return await fastify.db.models.Family.create(
      { ...params.data },
      { ...params.options }
    );
  });

  fastify.decorate(
    "updateFamily",
    async (params = { data, selection, options: {} }) => {
      return await fastify.db.models.Family.update(
        { where: params.selection },
        {
          ...params.data,
        },
        { ...params.options }
      );
    }
  );

  fastify.decorate(
    "deleteFamily",
    async (params = { selection, options: {} }) => {
      return await fastify.db.models.Family.delete(
        { where: params.selection },
        { ...params.options }
      );
    }
  );

  done();
}

module.exports = require("fastify-plugin")(plugin);
