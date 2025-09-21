const Employee = require("../models/Employee");
const DetailCompany = require("../models/DetailCompanyModel");
const Role = require("../models/RoleModel");
const jwt = require('jsonwebtoken')



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

const GetMyData = async (req, res) => {
  try {
    const id = req.user.id;
    const employee = await Employee.findOne({
      where: { id },
      attributes: {
        exclude: ['face_encoding']
      }
    },
    )
    if (!employee) {
      return res.status(400).json({
        message: "Data Tidak di temukan"
      })
    }
    res.status(200).json({
      success: true,
      message: "my data employee",
      employee
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}


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

const LoginEmployee = async (req, res) => {
  try {
    const { email, date_of_birth } = req.body
    if (!email || !date_of_birth) {
      return res.status(400).json({
        success: false,
        message: "Harap Lengkapi email dan tanggal lahir"
      })
    }
    const employee = await Employee.findOne({ where: { email } })
    if (!employee) {
      return res.status(400).json({
        success: false,
        message: "Email Tidak Ditemukan"
      })
    }
    const employeeDob = new Date(employee.date_of_birth);
    const inputDob = new Date(date_of_birth);
    if (employeeDob.getTime() !== inputDob.getTime()) {
      return res.status(400).json({
        success: false,
        message: "Tanggal lahir salah"
      });
    }
    const token = jwt.sign(
      {
        id: employee.id,
        username: employee.username,
        role_nam: employee.role_nam,
        employee_id: employee.employee_id,
      },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login Berhasil",
      employee: {
        id: employee.id,
        employee_id: employee.employee_id,
        name: employee.name,
        address: employee.address,
        date_of_birth: employee.date_of_birth,
        email: employee.email,
        phone: employee.phone,
        basic_salary: employee.basic_salary,
        role_name: employee.role_name
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

module.exports = {
  GetEmployee,
  GetEmployeeById,
  DeleteEmployee,
  UpdateEmployee,
  LoginEmployee,
  GetMyData
};
