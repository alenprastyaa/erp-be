const express = require("express");
const {
  GetProjects,
  GetProjectById,
  CreateProjek,
  AddEmployeToProject,
} = require("../controller/ProjekController");
const { AdminMiddleware } = require("../middleware/auth");
const router = express.Router();

router.get("/", AdminMiddleware, GetProjects);
router.get("/:id", AdminMiddleware, GetProjectById);
router.post("/", AdminMiddleware, CreateProjek);
router.post("/add/employee", AdminMiddleware, AddEmployeToProject);

module.exports = router;
