const DatauriParser = require("datauri/parser");
const dayjs = require("dayjs");
const { Op } = require("sequelize");
const cloudinary = require("../middlewares/cloudinary");
const {
  Attendance,
  Location,
  Employee,
  sequelize,
} = require("../models/index");

const createAttendance = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { id: employee_id } = req.employee;

    const { check_in_time, attendance_type, latitude, longitude } = req.body;

    const check_in = dayjs(check_in_time);

    const absent = await Attendance.findOne({
      where: {
        check_in_time: {
          [Op.between]: [
            check_in.startOf("date").toDate(),
            check_in.endOf("date").toDate(),
          ],
        },
        employee_id: employee_id,
      },
    });

    if (!absent) {
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
          latitude,
          longitude,
          type: "in",
          attendance_id: attendance.id,
        };

        const createLocation = await Location.create(payloadLocation, {
          transaction: t,
        });

        await t.commit();

        res.status(201).json({
          message: `${employee.first_name} has been check ${createLocation.type}`,
        });
      } else {
        throw { name: "BAD_REQUEST_ATTENDANCE_TYPE" };
      }
    } else {
      throw { name: "BAD_REQUEST_CHECK_IN" };
    }
  } catch (err) {
    console.log(err);
    await t.rollback();
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: employee_id } = req.employee;
    const { attendance_type, check_out_time, latitude, longitude } = req.body;

    const check_out = dayjs(check_out_time);

    const absent = await Attendance.findOne({
      where: {
        check_out_time: {
          [Op.between]: [
            check_out.startOf("date").toDate(),
            check_out.endOf("date").toDate(),
          ],
        },
        employee_id: employee_id,
      },
    });

    if (!absent) {
      if (attendance_type === "permit") {
        const attendance = await Attendance.findByPk(id);
        if (!attendance) throw { name: "NO_DATA_FOUND" };
        await Attendance.update(
          { attendance_type, check_out_time, latitude, longitude },
          {
            where: {
              id,
            },
          }
        );
        const employee = await Employee.findByPk(attendance.employee_id);
        res.status(201).json({
          message: `${employee.first_name} has been check out with status ${attendance_type}`,
        });
      } else if (attendance_type === "attendance") {
        const attendance = await Attendance.findByPk(id);
        if (!attendance) throw { name: "NO_DATA_FOUND" };
        await Attendance.update(
          { attendance_type, check_out_time, latitude, longitude },
          {
            where: {
              id,
            },
          }
        );
        const employee = await Employee.findByPk(attendance.employee_id);
        res.status(201).json({
          message: `${employee.first_name} has been check out with status ${attendance_type}`,
        });
      } else {
        throw { name: "BAD_REQUEST_ATTENDANCE_TYPE" };
      }
    } else {
      throw { name: "BAD_REQUEST_CHECK_OUT" };
    }
  } catch (err) {
    next(err);
  }
};

const getAttendances = async (req, res, next) => {
  try {
    let { id: employee_id } = req.employee;
    const option = {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Employee,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    };
    if (employee_id) {
      option.where = {
        employee_id: employee_id,
      };
    }
    const attendances = await Attendance.findAll(option);
    res.json(attendances);
  } catch (err) {
    next(err);
  }
};

const getAttendance = async (req, res, next) => {
  try {
    const option = {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Employee,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    };
    const { id } = req.params;
    const attendance = await Attendance.findByPk(id, option);
    res.json(attendance);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createAttendance,
  updateStatus,
  getAttendance,
  getAttendances,
};
