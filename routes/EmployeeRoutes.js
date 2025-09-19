const express = require("express");
const {
  GetEmployeeById,
  UpdateEmployee,
  DeleteEmployee,
  GetEmployee,
} = require("../controller/EmployeController");

const router = express.Router();
router.get("/", GetEmployee);
router.get("/:id", GetEmployeeById);
router.put("/:id", UpdateEmployee);
router.delete("/:id", DeleteEmployee);

module.exports = router;
