const { appLog, appPort } = require("./configs/common.config");
const {
  host,
  database,
  username,
  password,
  maxPool,
  minPool,
  idleTime,
  acquireTime,
  dbLog,
} = require("./configs/database.config");

const fastify = require("fastify")({ logger: appLog });

// ============================Register Plugins=================================
// Fastify Cors
fastify.register(require("@fastify/cors"));

// Utils Plugin
const language = require("./configs/language.config");
fastify.register(require("./plugins/utils.plugin"), { language });

// Sequelize Plugin
fastify.register(require("./models/index"), {
  instance: "db",
  dialect: "mysql",
  autoConnect: true,
  logging: dbLog === "true" ? (msg) => fastify.log.info(msg) : false,
  host: host,
  database: database,
  username: username,
  password: password,
  pool: {
    max: Number(maxPool),
    min: Number(minPool),
    idle: Number(idleTime),
    acquire: Number(acquireTime),
  },
});

// Swagger Plugin
fastify.register(require("@fastify/swagger"), {
  swagger: {
    info: {
      title: "Test Javan",
      description: "Test Javan API",
      version: "0.1.0",
    },
    contact: {
      name: "Riski Aji Kusuma",
      url: "https://github.com/riskiajikusuma/TestJavan/tree/main/TestNodeJs",
      email: "rajiku.ajik@gmail.com",
    },
    host: `127.0.0.1:${appPort}`,
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

// Swagger UI
fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
});

// API Register
fastify.register(require("./plugins/api.plugin"));

// Repositories
require("fs")
  .readdirSync(__dirname + "/repositories")
  .forEach((file) => {
    fastify.register(require(`./repositories/${file}`));
  });

// =================================Routes=======================================
fastify.register(require("./routes/family.route"), { prefix: "families" });
fastify.register(require("./routes/person.route"), { prefix: "people" });
fastify.register(require("./routes/asset.route"), { prefix: "assets" });
fastify.register(require("./routes/person.asset.route"), {
  prefix: "person-assets",
});
fastify.register(require("./routes/family.asset.route"), {
  prefix: "family-assets",
});

fastify.listen({ host: "0.0.0.0", port: appPort });
