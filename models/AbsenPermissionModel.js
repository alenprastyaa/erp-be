const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Employee = require('./Employee')

const AbsencePermission = db.define("absence_permission", {
    employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date_start: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    date_end: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    type: {
        type: DataTypes.ENUM("sick", "leave", "wfh", "other"),
        allowNull: false,
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM("pending", "approved", "rejected"),
        defaultValue: "pending",
    },

});

Employee.hasMany(AbsencePermission, { foreignKey: "employee_id" });
AbsencePermission.belongsTo(Employee, { foreignKey: "employee_id" });

module.exports = AbsencePermission;
