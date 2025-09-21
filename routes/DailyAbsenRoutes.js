const express = require("express");
const { GetDailyAbsen, UpdateAbsen, GetMyAbsensi } = require("../controller/DailyAttendanceController");
const { AuthMiddleare, AdminMiddleware } = require("../middleware/auth");
const router = express.Router();

router.get("/", AdminMiddleware, GetDailyAbsen);
router.put("/:id", AdminMiddleware, UpdateAbsen);
router.get("/my/absen", AuthMiddleare, GetMyAbsensi)

module.exports = router;
