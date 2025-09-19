const DailyAttendance = require("../models/DailyAttendance");

const GetDailyAbsen = async (req, res) => {
  try {
    const daily = await DailyAttendance.findAll();
    res.status(200).json({ message: "Data Absensi", daily });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { GetDailyAbsen };
