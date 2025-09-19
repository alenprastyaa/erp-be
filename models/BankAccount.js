const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Employee = require("../models/Employee");
const BankAccount = db.define("bank_account", {
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  account_holder_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bank_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  branch_location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  account_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bank_identifier_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Employee.hasMany(BankAccount, { foreignKey: "employee_id" });
BankAccount.belongsTo(Employee, { foreignKey: "employee_id" });

module.exports = BankAccount;
