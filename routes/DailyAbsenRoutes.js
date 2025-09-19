const express = require("express");
const { GetDailyAbsen } = require("../controller/DailyAttendanceController");
const router = express.Router();

router.get("/", GetDailyAbsen);

module.exports = router;
