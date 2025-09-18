const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Role = require("./RoleModel");

const User = db.define("user", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Role.hasMany(User, { foreignKey: "role_name" });
User.belongsTo(Role, { foreignKey: "role_name" });

module.exports = User;
