const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Role = db.define(
  "role",
  {
    role_name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expected_check_in_time: {
      type: DataTypes.TIME,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Role;
