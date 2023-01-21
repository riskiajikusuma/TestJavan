"use strict";

const Sequelize = require("sequelize");
const path = require("path");
const basename = path.basename(__filename);
const db = {};

function plugin(fastify, options) {
  const instance = options.instance || "sequelize";
  const autoConnect = options.autoConnect || true;

  delete options.instance;
  delete options.autoConnect;

  const sequelize = new Sequelize(options);

  if (autoConnect) return sequelize.authenticate().then(decorate());

  decorate();

  return Promise.resolve();

  function decorate() {
    // Initialize All Models
    require("fs")
      .readdirSync(__dirname)
      .filter((file) => {
        return (
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js"
        );
      })
      .forEach((file) => {
        const model = require(path.join(__dirname, file))(
          sequelize,
          Sequelize.DataTypes
        );
        db[model.name] = model;
      });

    // Initialize Associate
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    fastify.decorate(instance, sequelize);
    fastify.decorate("Op", Sequelize);
    fastify.addHook("onClose", (fastify, done) => {
      sequelize.close().then(done).catch(done);
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
  }
}

module.exports = require("fastify-plugin")(plugin);
