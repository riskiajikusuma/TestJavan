function plugin(fastify, options, done) {
  fastify.decorate("getAssetsAPI", async () => {
    return await fetch("https://dummyjson.com/products");
  });

  fastify.decorate("getAssetAPI", async (id) => {
    return await fetch(`https://dummyjson.com/products/${id}`);
  });

  done();
}

module.exports = require("fastify-plugin")(plugin);
