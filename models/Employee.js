const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Role = require("./RoleModel");
const Employee = db.define(
  "Employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    basic_salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    face_encoding: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    role_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "employees",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["employee_id"],
      },
      {
        fields: ["email"],
      },
      {
        fields: ["name"],
      },
    ],
  }
);
Employee.belongsTo(Role, {
  foreignKey: "role_name",
  targetKey: "role_name",
});
module.exports = Employee;
