const express = require("express");
const router = express.Router();
const {
  GetBankAccounts,
  GetBankAccountById,
  CreateBankAccount,
  UpdateBankAccount,
  DeleteBankAccount,
} = require("../controller/BankAccountController");
const { AdminMiddleware } = require("../middleware/auth");

router.get("/", AdminMiddleware, GetBankAccounts);
router.get("/:id", AdminMiddleware, GetBankAccountById);
router.post("/", AdminMiddleware, CreateBankAccount);
router.put("/:id", AdminMiddleware, UpdateBankAccount);
router.delete("/:id", AdminMiddleware, DeleteBankAccount);

module.exports = router;
