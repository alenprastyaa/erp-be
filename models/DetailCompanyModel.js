const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Employee = require("./Employee");

const DetailCompany = db.define("detail_company", {
  branch: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_joining: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Employee.hasOne(DetailCompany, { foreignKey: "employee_id" });
DetailCompany.belongsTo(Employee, { foreignKey: "employee_id" });

module.exports = DetailCompany;
