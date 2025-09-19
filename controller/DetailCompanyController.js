const DetailCompany = require("../models/DetailCompanyModel");
const Employee = require("../models/Employee");

const GetDetailCompanies = async (req, res) => {
  try {
    const details = await DetailCompany.findAll({
      include: [{ model: Employee, attributes: ["id", "name", "email"] }],
    });
    res.status(200).json({ message: "Data Detail Company", details });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const GetDetailCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await DetailCompany.findByPk(id, {
      include: [{ model: Employee, attributes: ["id", "name", "email"] }],
    });
    if (!detail) {
      return res
        .status(404)
        .json({ message: "Detail Company tidak ditemukan" });
    }
    res.status(200).json({ message: "Detail Company ditemukan", detail });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const CreateDetailCompany = async (req, res) => {
  try {
    const { branch, designation, date_of_joining, department, employee_id } =
      req.body;

    if (
      !branch ||
      !designation ||
      !date_of_joining ||
      !department ||
      !employee_id
    ) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }
    const checkEmployee = await Employee.findByPk(employee_id);
    if (!checkEmployee) {
      return res.status(400).json({ message: "Employee tidak ditemukan" });
    }
    const detail = await DetailCompany.create({
      branch,
      designation,
      date_of_joining,
      department,
      employee_id: checkEmployee.id,
    });
    res.status(201).json({ message: "DetailCompany berhasil dibuat", detail });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const UpdateDetailCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { branch, designation, date_of_joining, department } = req.body;
    const detail = await DetailCompany.findByPk(id);
    if (!detail) {
      return res
        .status(404)
        .json({ message: "Detail Company tidak ditemukan" });
    }
    await DetailCompany.update(
      { branch, designation, date_of_joining, department },
      { where: { id } }
    );
    res.status(200).json({ message: "DetailCompany berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const DeleteDetailCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await DetailCompany.findByPk(id);
    if (!detail) {
      return res
        .status(404)
        .json({ message: "Detail Company tidak ditemukan" });
    }
    await DetailCompany.destroy({ where: { id } });
    res.status(200).json({ message: "Detail Company berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  GetDetailCompanies,
  GetDetailCompanyById,
  CreateDetailCompany,
  UpdateDetailCompany,
  DeleteDetailCompany,
};
