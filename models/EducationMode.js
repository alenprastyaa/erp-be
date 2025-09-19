const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Employee = require("../models/Employee");
const Edukasi = db.define("edukasi", {
  employee_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  school: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  document: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Employee.hasMany(Edukasi, { foreignKey: "employee_id" });
Edukasi.belongsTo(Employee, { foreignKey: "employee_id" });

module.exports = Edukasi;
