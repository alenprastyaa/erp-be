const Edukasi = require("../models/EducationMode");
const Employee = require("../models/Employee");

const GetEdukasies = async (req, res) => {
  try {
    const edukasi = await Edukasi.findAll({
      include: [{ model: Employee, attributes: ["id", "name", "email"] }],
    });
    res.status(200).json({
      success: true,
      message: "Data edukasi ditemukan",
      data: edukasi,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const GetEdukasiById = async (req, res) => {
  try {
    const { id } = req.params;
    const edukasi = await Edukasi.findByPk(id, {
      include: [{ model: Employee, attributes: ["id", "name", "email"] }],
    });
    if (!edukasi) {
      return res
        .status(404)
        .json({ success: false, message: "Edukasi tidak ditemukan" });
    }
    res.status(200).json({
      success: true,
      message: "Edukasi ditemukan",
      data: edukasi,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const CreateEdukasi = async (req, res) => {
  try {
    const { employee_id, school, start_date, end_date, document } = req.body;
    if (!employee_id || !school || !start_date || !end_date || !document) {
      return res
        .status(400)
        .json({ success: false, message: "Semua field wajib diisi" });
    }

    const checkEmployee = await Employee.findByPk(employee_id);
    if (!checkEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee tidak ditemukan" });
    }
    const edukasi = await Edukasi.create({
      employee_id,
      school,
      start_date,
      end_date,
      document,
    });

    res.status(201).json({
      success: true,
      message: "Edukasi berhasil dibuat",
      data: edukasi,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const UpdateEdukasi = async (req, res) => {
  try {
    const { id } = req.params;
    const { school, start_date, end_date, document } = req.body;

    const edukasi = await Edukasi.findByPk(id);
    if (!edukasi) {
      return res
        .status(404)
        .json({ success: false, message: "Edukasi tidak ditemukan" });
    }

    await edukasi.update({ school, start_date, end_date, document });

    res.status(200).json({
      success: true,
      message: "Edukasi berhasil diupdate",
      data: edukasi,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const DeleteEdukasi = async (req, res) => {
  try {
    const { id } = req.params;
    const edukasi = await Edukasi.findByPk(id);
    if (!edukasi) {
      return res
        .status(404)
        .json({ success: false, message: "Edukasi tidak ditemukan" });
    }

    await edukasi.destroy();

    res.status(200).json({
      success: true,
      message: "Edukasi berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  GetEdukasies,
  GetEdukasiById,
  CreateEdukasi,
  UpdateEdukasi,
  DeleteEdukasi,
};
