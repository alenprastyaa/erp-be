const BankAccount = require("../models/BankAccount");
const Employee = require("../models/Employee");

const GetBankAccounts = async (req, res) => {
  try {
    const accounts = await BankAccount.findAll({
      include: [{ model: Employee, attributes: ["id", "name", "email"] }],
    });
    res.status(200).json({
      success: true,
      message: "Data Bank Account ditemukan",
      data: accounts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const GetBankAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await BankAccount.findByPk(id, {
      include: [{ model: Employee, attributes: ["id", "name", "email"] }],
    });
    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Bank Account tidak ditemukan" });
    }
    res.status(200).json({
      success: true,
      message: "Bank Account ditemukan",
      data: account,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const CreateBankAccount = async (req, res) => {
  try {
    const {
      employee_id,
      account_holder_name,
      bank_name,
      branch_location,
      account_number,
      bank_identifier_code,
    } = req.body;

    if (
      !employee_id ||
      !account_holder_name ||
      !bank_name ||
      !branch_location ||
      !account_number ||
      !bank_identifier_code
    ) {
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

    const account = await BankAccount.create({
      employee_id,
      account_holder_name,
      bank_name,
      branch_location,
      account_number,
      bank_identifier_code,
    });

    res.status(201).json({
      success: true,
      message: "Bank Account berhasil dibuat",
      data: account,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const UpdateBankAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      account_holder_name,
      bank_name,
      branch_location,
      account_number,
      bank_identifier_code,
    } = req.body;

    const account = await BankAccount.findByPk(id);
    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Bank Account tidak ditemukan" });
    }

    await account.update({
      account_holder_name,
      bank_name,
      branch_location,
      account_number,
      bank_identifier_code,
    });

    res.status(200).json({
      success: true,
      message: "Bank Account berhasil diupdate",
      data: account,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const DeleteBankAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await BankAccount.findByPk(id);
    if (!account) {
      return res
        .status(404)
        .json({ success: false, message: "Bank Account tidak ditemukan" });
    }

    await account.destroy();

    res.status(200).json({
      success: true,
      message: "Bank Account berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  GetBankAccounts,
  GetBankAccountById,
  CreateBankAccount,
  UpdateBankAccount,
  DeleteBankAccount,
};
