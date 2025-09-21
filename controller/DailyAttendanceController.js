const DailyAttendance = require("../models/DailyAttendance");

const GetDailyAbsen = async (req, res) => {
  try {
    const daily = await DailyAttendance.findAll();
    res.status(200).json({ message: "Data Absensi", daily });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const UpdateAbsen = async (req, res) => {
  try {
    const { id } = req.params
    const { check_in_time, check_out_time } = req.body
    const absen = await DailyAttendance.findByPk(id)
    if (!absen) {
      return res.status(400).json({
        success: false,
        message: "Data absen tidak ditemukan"
      })
    }
    await DailyAttendance.update({
      check_in_time, check_out_time
    }, {
      where: { id }
    })
    res.status(200).json({
      success: true,
      message: "Data Berhasil di update"
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }

}

const GetMyAbsensi = async (req, res) => {
  try {
    const employeeId = req.user.employee_id;
    const absen = await DailyAttendance.findAll({
      where: { employee_id: employeeId }
    });
    if (!absen) {
      return res.status({
        success: false,
        message: "Data absen tidak ditemukan"
      })
    }
    res.status(200).json({
      success: true,
      message: "my data absen", absen
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }

}

module.exports = { GetDailyAbsen, UpdateAbsen, GetMyAbsensi };
