const express = require("express");
const {
  GetEmployeeById,
  UpdateEmployee,
  DeleteEmployee,
  GetEmployee,
  LoginEmployee,
  GetMyData,

} = require("../controller/EmployeController");
const { AuthMiddleare, AdminMiddleware } = require("../middleware/auth");

const router = express.Router();
router.get("/", AdminMiddleware, GetEmployee);
router.get("/:id", AdminMiddleware, GetEmployeeById);
router.put("/:id", AdminMiddleware, UpdateEmployee);
router.delete("/:id", AdminMiddleware, DeleteEmployee);
router.post("/login", LoginEmployee)
router.get("/profil/my", AuthMiddleare, GetMyData)

module.exports = router;
