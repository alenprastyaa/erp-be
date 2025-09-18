const { Sequelize } = require("sequelize");

const Db = new Sequelize("erp", "postgres", "alen", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});

module.exports = Db;
