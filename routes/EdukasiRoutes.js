const express = require("express");
const router = express.Router();
const {
  GetEdukasies,
  GetEdukasiById,
  CreateEdukasi,
  UpdateEdukasi,
  DeleteEdukasi,
} = require("../controller/EdukasiController");

router.get("/", GetEdukasies);
router.get("/:id", GetEdukasiById);
router.post("/", CreateEdukasi);
router.put("/:id", UpdateEdukasi);
router.delete("/:id", DeleteEdukasi);

module.exports = router;
