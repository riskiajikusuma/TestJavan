function plugin(fastify, options, done) {
  fastify.decorate(
    "getPeople",
    async (params = { selection: {}, includes: [], options: {} }) => {
      return await fastify.db.models.Person.findAll({
        where: params.selection,
        include: params.includes,
        ...params.options,
      });
    }
  );

  fastify.decorate(
    "getPerson",
    async (params = { selection: {}, includes: [], options: {} }) => {
      return await fastify.db.models.Person.findOne({
        where: params.selection,
        include: params.includes,
        ...params.options,
      });
    }
  );

  fastify.decorate("createPerson", async (params = { data, options: {} }) => {
    return await fastify.db.models.Person.create(
      { ...params.data },
      { ...params.options }
    );
  });

  fastify.decorate(
    "updatePerson",
    async (params = { data, selection: {}, options: {} }) => {
      return await fastify.db.models.Person.update(
        {
          // where: params.selection,
          ...params.data,
        },
        { where: params.selection },
        { ...params.options }
      );
    }
  );

  fastify.decorate(
    "deletePerson",
    async (params = { selection, options: {} }) => {
      return await fastify.db.models.Person.destroy(
        { where: params.selection },
        { ...params.options }
      );
    }
  );

  done();
}

module.exports = require("fastify-plugin")(plugin);
