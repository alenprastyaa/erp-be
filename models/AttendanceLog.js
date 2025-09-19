const DataTypes = require("sequelize");
const db = require("../config/db");
const Employee = require("./Employee");

const AttendanceLog = db.define(
  "AttendanceLog",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employee_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    event_type: {
      type: DataTypes.ENUM("check_in", "check_out"),
      allowNull: false,
    },
    event_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "attendance_log",
    timestamps: false,
  }
);

AttendanceLog.belongsTo(Employee, {
  foreignKey: "employee_id",
  targetKey: "employee_id",
});

Employee.hasMany(AttendanceLog, {
  foreignKey: "employee_id",
  sourceKey: "employee_id",
});

module.exports = AttendanceLog;
