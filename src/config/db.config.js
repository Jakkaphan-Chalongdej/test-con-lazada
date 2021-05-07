const env = require("./env.js");
module.exports = {
  host: env.host,
  database: env.database,
  user: env.user,
  password: env.password,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
