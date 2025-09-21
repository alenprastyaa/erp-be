const express = require("express");
const {
  GetDetailCompanies,
  GetDetailCompanyById,
  CreateDetailCompany,
  UpdateDetailCompany,
  DeleteDetailCompany,
} = require("../controller/DetailCompanyController");
const { AdminMiddleware } = require("../middleware/auth");

const router = express.Router();
router.get("/", AdminMiddleware, GetDetailCompanies);
router.get("/:id", AdminMiddleware, GetDetailCompanyById);
router.post("/", AdminMiddleware, CreateDetailCompany);
router.put("/:id", AdminMiddleware, UpdateDetailCompany);
router.delete("/:id", AdminMiddleware, DeleteDetailCompany);

module.exports = router;
