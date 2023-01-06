const { where } = require("sequelize");
const { Attendance } = require("../models/index");

const getAttendances = async (req, res, next) => {
  try {
    const id = 1;
    const attendances = await Attendance.findAll({ where: { profile_id: id } });
  } catch (err) {
    console.log(err);
  }
};

const createAttendance = async (req, res, next) => {
  try {
    const { attendance_type, attachment } = req.body;
    const check_in_time = new Date();
    const profile_id = 1;

    await Attendance.create({
      check_in_time,
      attendance_type,
      attachment,
      profile_id,
    });

    res.status(201).json({ message: "Absen masuk sukses" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const { id } = req.params;
    const check_out_time = new Date();

    await Attendance.update({ check_out_time }, { where: { profile_id: id } });

    res.json({ message: "Absen pulang sukses" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createAttendance, updateAttendance };
