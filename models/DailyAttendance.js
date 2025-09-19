const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Employee = require("./Employee");

const DailyAttendance = db.define(
  "DailyAttendance",
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
    attendance_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    check_in_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    check_out_time: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    check_in_timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    check_out_timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    total_hours: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    status: {
      type: DataTypes.ENUM("present", "partial", "absent", "on_time", "late"),
      allowNull: false,
      defaultValue: "absent",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "daily_attendance",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        unique: true,
        fields: ["employee_id", "attendance_date"],
      },
    ],
  }
);

DailyAttendance.belongsTo(Employee, {
  foreignKey: "employee_id",
  targetKey: "employee_id",
  onDelete: "CASCADE",
});

Employee.hasMany(DailyAttendance, {
  foreignKey: "employee_id",
  sourceKey: "employee_id",
  onDelete: "CASCADE",
});

module.exports = DailyAttendance;
