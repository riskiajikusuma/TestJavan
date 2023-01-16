require("dotenv").config();

module.exports = {
  dialect: "mysql",
  seederStorage: "sequelize",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  maxPool: process.env.DB_MAX_POOL,
  minPool: process.env.DB_MIN_POOL,
  idleTime: process.env.DB_IDLE_TIME,
  acquireTime: process.env.DB_ACQUIRE_TIME,
  dbLog: process.env.DB_LOG,
};
