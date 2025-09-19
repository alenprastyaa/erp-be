const express = require("express");
const {
  GetDetailCompanies,
  GetDetailCompanyById,
  CreateDetailCompany,
  UpdateDetailCompany,
  DeleteDetailCompany,
} = require("../controller/DetailCompanyController");

const router = express.Router();
router.get("/", GetDetailCompanies);
router.get("/:id", GetDetailCompanyById);
router.post("/", CreateDetailCompany);
router.put("/:id", UpdateDetailCompany);
router.delete("/:id", DeleteDetailCompany);

module.exports = router;
