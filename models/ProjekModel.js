const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Employee = require("./Employee");

const Project = db.define("project", {
  project_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Project.belongsToMany(Employee, { through: "EmployeeProjects" });
Employee.belongsToMany(Project, { through: "EmployeeProjects" });

module.exports = Project;
