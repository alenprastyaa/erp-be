const AbsencePermission = require('../models/AbsenPermissionModel')
const Employee = require("../models/Employee");

const GetPermissions = async (req, res) => {
    try {
        const permissions = await AbsencePermission.findAll({
            include: [{ model: Employee, attributes: ["id", "name", "email"] }],
            order: [["createdAt", "DESC"]],
        });

        res.status(200).json({
            success: true,
            message: "Data izin absen ditemukan",
            data: permissions,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const GetPermissionById = async (req, res) => {
    try {
        const { id } = req.params;
        const permission = await AbsencePermission.findByPk(id, {
            include: [{ model: Employee, attributes: ["id", "name", "email"] }],
        });

        if (!permission) {
            return res
                .status(404)
                .json({ success: false, message: "Izin absen tidak ditemukan" });
        }

        res.status(200).json({
            success: true,
            message: "Detail izin absen ditemukan",
            data: permission,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const CreatePermission = async (req, res) => {
    try {
        const { employee_id, date_start, date_end, type, reason } = req.body;
        if (!employee_id || !date_start || !type) {
            return res
                .status(400)
                .json({ success: false, message: "employee_id, date_start, dan type wajib diisi" });
        }
        const checkEmployee = await Employee.findByPk(employee_id);
        if (!checkEmployee) {
            return res
                .status(404)
                .json({ success: false, message: "Employee tidak ditemukan" });
        }

        const permission = await AbsencePermission.create({
            employee_id,
            date_start,
            date_end,
            type,
            reason,
            status: "pending",
        });
        res.status(201).json({
            success: true,
            message: "Izin absen berhasil dibuat",
            data: permission,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


const CreateEmployeAbsensi = async (req, res) => {
    try {
        const employeeId = req.user.id;
        const { date_start, date_end, type, reason } = req.body;
        if (!date_start || !date_end || !type || !reason) {
            return res.status(400).json({
                success: false,
                message: "Wajib isi semua field",
            });
        }
        if (new Date(date_start) > new Date(date_end)) {
            return res.status(400).json({
                success: false,
                message: "Tanggal mulai tidak boleh lebih besar dari tanggal selesai",
            });
        }
        const checkEmployee = await Employee.findByPk(employeeId);
        if (!checkEmployee) {
            return res.status(404).json({
                success: false,
                message: "Employee tidak ditemukan",
            });
        }
        const permission = await AbsencePermission.create({
            employee_id: employeeId,
            date_start,
            date_end,
            type,
            reason,
            status: "pending",
        });

        return res.status(201).json({
            success: true,
            message: "Berhasil membuat perijinan untuk diri sendiri",
            data: permission,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const GetMyPermission = async (req, res) => {
    try {
        const employeeId = req.user.employee_id
        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: "Employee tidak ditemukan"
            })
        }
        const employee = await AbsencePermission.findAll({
            employee_id: employeeId
        })
        res.status(200).json({
            success: true,
            message: "Data Permission",
            Data: employee
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

const UpdatePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { date_start, date_end, type, reason, status } = req.body;
        const permission = await AbsencePermission.findByPk(id);
        if (!permission) {
            return res
                .status(404)
                .json({ success: false, message: "Izin absen tidak ditemukan" });
        }
        await permission.update({
            date_start,
            date_end,
            type,
            reason,
            status,
        });
        res.status(200).json({
            success: true,
            message: "Izin absen berhasil diperbarui",
            data: permission,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const DeletePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const permission = await AbsencePermission.findByPk(id);

        if (!permission) {
            return res
                .status(404)
                .json({ success: false, message: "Izin absen tidak ditemukan" });
        }
        await permission.destroy();
        res.status(200).json({
            success: true,
            message: "Izin absen berhasil dihapus",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    GetPermissions,
    GetPermissionById,
    CreatePermission,
    UpdatePermission,
    DeletePermission,
    CreateEmployeAbsensi,
    GetMyPermission
};
