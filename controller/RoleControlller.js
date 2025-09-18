const Role = require("../models/RoleModel");

const GetRole = async (req, res) => {
  try {
    const role = await Role.findAll();
    res.status(200).json({ message: "Data Role", role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const CreateRole = async (req, res) => {
  try {
    const { role_name } = req.body;
    if (!role_name) {
      return res.status(400).json({ message: "Wajib isi Role_name" });
    }
    const roleCheck = await Role.findOne({ where: { role_name } });
    if (roleCheck) {
      return res.status(400).json({ message: "nama role sudah tersedia" });
    }
    const role = await Role.create({
      role_name,
    });
    res.status(200).json({ message: "Role berhasil dibuat", role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { GetRole, CreateRole };
