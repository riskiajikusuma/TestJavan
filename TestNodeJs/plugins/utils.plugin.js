const fp = require("fastify-plugin");

function plugin(fastify, options, done) {
  fastify.decorate("lang", (string, lang) => {
    if (!lang) lang = "en-US";
    return options.language[lang][string];
  });
  done();
}

module.exports = fp(plugin);
