const DatauriParser = require("datauri/parser");
const cloudinary = require("../middlewares/cloudinary");
const { Attendance, Location, Employee, sequelize } = require("../models/index");

const createAttendance = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const employee_id = 1;
    const { check_in_time = new Date(), attendance_type } = req.body;

    const employee = await Employee.findByPk(employee_id);
    if (!employee) throw { name: "NO_DATA_FOUND" };

    if (attendance_type === "absent" || attendance_type === "sick") {
      if (!req.file) throw { name: "BAD_REQUEST_ATTACHMENT" };

      const parser = new DatauriParser();
      const pathImage = parser.format(req.file.originalname, req.file.buffer);
      const image = await cloudinary.uploader.upload(pathImage.content);
      const attachment = image.secure_url;

      const payload = {
        check_in_time,
        attachment,
        attendance_type,
        employee_id: employee.id,
      };

      const attendance = await Attendance.create(payload, { transaction: t });

      const payloadLocation = {
        latitude: 1.222,
        longitude: 2.222,
        type: "in",
        attendance_id: attendance.id,
      };

      const createLocation = await Location.create(payloadLocation, { transaction: t });

      await t.commit();

      res.status(201).json({
        message: `${employee.first_name} has been check ${createLocation.type}`,
      });
    } else {
      throw { name: "BAD_REQUEST_ATTENDANCE_TYPE" };
    }
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const employee_id = 1;

    const { status } = req.params;
    const { check_out_time = new Date() } = req.body;

    if (status === "permit") {
      const employee = await Employee.findByPk(employee_id);
      if (!employee) throw { name: "NO_DATA_FOUND" };

      const attendance = await Attendance.findOne(payload, { transaction: t });
    } else if (status === "attendance") {
    } else {
      throw { name: "BAD_REQUEST_ATTENDANCE_TYPE" };
    }
  } catch (err) {
    next(err);
  }
};
module.exports = { createAttendance, updateStatus };
