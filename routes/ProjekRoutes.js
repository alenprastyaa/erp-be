const express = require("express");
const {
  GetProjects,
  GetProjectById,
  CreateProjek,
  AddEmployeToProject,
} = require("../controller/ProjekController");
const router = express.Router();

router.get("/", GetProjects);
router.get("/:id", GetProjectById);
router.post("/", CreateProjek);
router.post("/add/employee", AddEmployeToProject);

module.exports = router;
