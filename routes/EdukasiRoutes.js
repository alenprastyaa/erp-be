const express = require("express");
const router = express.Router();
const {
  GetEdukasies,
  GetEdukasiById,
  CreateEdukasi,
  UpdateEdukasi,
  DeleteEdukasi,
} = require("../controller/EdukasiController");
const { AdminMiddleware } = require("../middleware/auth");

router.get("/", AdminMiddleware, GetEdukasies);
router.get("/:id", AdminMiddleware, GetEdukasiById);
router.post("/", AdminMiddleware, CreateEdukasi);
router.put("/:id", AdminMiddleware, UpdateEdukasi);
router.delete("/:id", AdminMiddleware, DeleteEdukasi);

module.exports = router;
