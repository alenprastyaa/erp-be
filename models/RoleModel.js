const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Role = db.define("role", {
  role_name: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
});

module.exports = Role;
