const express = require("express");
const router = express.Router();
const {
  GetBankAccounts,
  GetBankAccountById,
  CreateBankAccount,
  UpdateBankAccount,
  DeleteBankAccount,
} = require("../controller/BankAccountController");

router.get("/", GetBankAccounts);
router.get("/:id", GetBankAccountById);
router.post("/", CreateBankAccount);
router.put("/:id", UpdateBankAccount);
router.delete("/:id", DeleteBankAccount);

module.exports = router;
