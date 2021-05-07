const config = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.product = require("../model/product.mode")(sequelize, Sequelize);

module.exports = db;
