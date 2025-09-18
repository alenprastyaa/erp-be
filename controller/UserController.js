const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const GetAllUser = async (req, res) => {
  try {
    const user = await User.findAll({
      attributes: {
        exclude: "password",
      },
      include: {
        model: Role,
        attributes: ["role_name"],
      },
    });
    res.status(200).json({ message: "Berhasil membuat Data User", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const CreateUser = async (req, res) => {
  try {
    const { email, username, password, telp, role_name } = req.body;
    if (!email || !username || !password || !telp || !role_name) {
      return res.status(400).json({ message: "Harap lengkapi semua data" });
    }
    const RoleCheck = await Role.findByPk(role_name);
    if (!RoleCheck) {
      return res.status(400).json({ message: "Role Tidak Tersedia" });
    }
    const checkEmail = await User.findOne({ where: { email } });
    if (checkEmail) {
      return res.status(400).json({ message: "Email  Sudah terdaftar" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const create = await User.create({
      email,
      username,
      password: hashPassword,
      telp,
      role_name: role_name,
    });
    res.status(200).json({ message: "User Berhasil dibuat", create });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Harap lengkapi email dan password" });
  }
  const ceking = await User.findOne({
    where: { email },
  });
  if (!ceking) {
    return res.status(400).json({ message: "Email tidak terdaftar" });
  }
  const match = await bcrypt.compare(password, ceking.password);
  if (!match) {
    return res.status(400).json({ message: "Password salah" });
  }
  const token = jwt.sign(
    {
      id: ceking.id,
      email: ceking.email,
      role_name: ceking.role_name,
    },
    "34534sdfsdrfwe5wefdsfaeerqr332r43Sds",
    { expiresIn: "1d" }
  );
  res.status(200).json({
    message: "Login Berhasil",
    user: {
      id: ceking.id,
      email: ceking.email,
      role_name: ceking.role_name,
    },
    token,
  });
};
module.exports = { GetAllUser, CreateUser, Login };
