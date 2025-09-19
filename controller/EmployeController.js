const Employee = require("../models/Employee");
const DetailCompany = require("../models/DetailCompanyModel");
const Role = require("../models/RoleModel");
const GetEmployee = async (req, res) => {
  try {
    const employee = await Employee.findAll({
      attributes: {
        exclude: ["face_encoding"],
      },
      include: {
        model: DetailCompany,
      },
    });
    res.status(200).json({ message: "Data Employee", employee });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const GetEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({
      where: { id },
      attributes: { exclude: ["face_encoding"] },
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee tidak ditemukan" });
    }
    res.status(200).json({ message: "Employee ditemukan", employee });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const UpdateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      address,
      date_of_birth,
      email,
      phone,
      basic_salary,
      face_encoding,
      role_name,
    } = req.body;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee tidak ditemukan" });
    }
    if (role_name) {
      const role = await Role.findOne({ where: { role_name } });
      if (!role) {
        return res.status(404).json({ message: "Role tidak ditemukan" });
      }
    }
    await Employee.update(
      {
        name,
        address,
        date_of_birth,
        email,
        phone,
        basic_salary,
        face_encoding,
        role_name,
      },
      { where: { id } }
    );

    res.status(200).json({ message: "Employee berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const DeleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee tidak ditemukan" });
    }

    await Employee.destroy({ where: { id } });
    res.status(200).json({ message: "Employee berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  GetEmployee,
  GetEmployeeById,
  DeleteEmployee,
  UpdateEmployee,
};
