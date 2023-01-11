const DatauriParser = require("datauri/parser");
const dayjs = require("dayjs");
const { Op } = require("sequelize");
const cloudinary = require("../middlewares/cloudinary");
const { Attendance, Location, Employee, sequelize } = require("../models/index");

const createAttendance = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { id: employeeId } = req.employee;

    const { checkInTime, attendanceType, latitude, longitude } = req.body;

    const checkIn = dayjs(checkInTime);

    const absent = await Attendance.findOne({
      where: {
        checkInTime: {
          [Op.between]: [checkIn.startOf("date").toDate(), checkIn.endOf("date").toDate()],
        },
        employeeId: employeeId,
      },
    });

    if (!absent) {
      const employee = await Employee.findOne({ where: { id: employeeId } });
      if (!employee) throw { name: "NO_DATA_FOUND" };

      if (attendanceType === "absent" || attendanceType === "sick") {
        if (!req.file) throw { name: "BAD_REQUEST_ATTACHMENT" };

        const parser = new DatauriParser();
        const pathImage = parser.format(req.file.originalname, req.file.buffer);
        const image = await cloudinary.uploader.upload(pathImage.content);
        const attachment = image.secure_url;
        const payload = {
          checkInTime,
          attachment,
          attendanceType,
          employeeId: employee.id,
        };

        const attendance = await Attendance.create(payload, { transaction: t });

        const payloadLocation = {
          latitude,
          longitude,
          type: "in",
          attendanceId: attendance.id,
        };

        const createLocation = await Location.create(payloadLocation, {
          transaction: t,
        });

        await t.commit();

        res.status(201).json({
          message: `${employee.firstName} has been check ${createLocation.type}`,
        });
      } else {
        throw { name: "BAD_REQUEST_ATTENDANCE_TYPE" };
      }
    } else {
      throw { name: "BAD_REQUEST_CHECK_IN" };
    }
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  const t = await sequelize.transaction();

  try {
    const { id: employeeId } = req.employee;
    const { checkOutTime, attendanceType, latitude, longitude } = req.body;

    const checkOut = dayjs(checkOutTime);

    const absent = await Attendance.findOne({
      where: {
        checkOutTime: {
          [Op.between]: [checkOut.startOf("date").toDate(), checkOut.endOf("date").toDate()],
        },
        employeeId: employeeId,
      },
    });

    if (!absent) {
      if (attendanceType === "permit") {
        const attendance = await Attendance.findOne({
          where: {
            [Op.and]: [
              {
                employeeId: employeeId,
              },
              {
                checkOutTime: null,
              },
              {
                attendanceType: "absent",
              },
            ],
          },
        });

        if (!attendance) throw { name: "NO_DATA_FOUND" };

        await Attendance.update(
          { checkOutTime, attendanceType },
          {
            where: {
              id: attendance.id,
            },
          },
          { transaction: t }
        );

        await Location.update(
          {
            latitude,
            longitude,
            type: "out",
          },
          {
            where: {
              attendanceId: attendance.id,
            },
          },
          { transaction: t }
        );
        await t.commit();

        res.status(200).json({
          message: `Success check out with status ${attendanceType}`,
        });
      } else if (attendanceType === "attendance") {
        const attendance = await Attendance.findOne({
          where: {
            [Op.and]: [
              {
                employeeId: employeeId,
              },
              {
                checkOutTime: null,
              },
              {
                attendanceType: "absent",
              },
            ],
          },
        });

        if (!attendance) throw { name: "NO_DATA_FOUND" };

        await Attendance.update(
          { checkOutTime, attendanceType },
          {
            where: {
              id: attendance.id,
            },
          },
          { transaction: t }
        );
        await Location.update(
          {
            latitude,
            longitude,
            type: "out",
          },
          {
            where: {
              attendanceId: attendance.id,
            },
          },
          { transaction: t }
        );

        await t.commit();

        res.status(200).json({
          message: `Success check out with status ${attendanceType}`,
        });
      } else {
        throw { name: "BAD_REQUEST_ATTENDANCE_TYPE" };
      }
    } else {
      throw { name: "BAD_REQUEST_CHECK_OUT" };
    }
  } catch (err) {
    await t.rollback();
    next(err);
  }
};

const getAttendances = async (req, res, next) => {
  try {
    let { id: employeeId } = req.employee;
    const option = {
      attributes: { exclude: ["createdAt"] },
      order: [["updatedAt", "DESC"]],
      where: {
        employeeId: employeeId,
      },
    };
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
    };
    const { id } = req.params;
    const attendance = await Attendance.findByPk(id, option);
    res.json(attendance);
  } catch (err) {
    next(err);
  }
};

const getAttendancesWeb = async (req, res, next) => {
  try {
    const { page = "", limit = 30, filter = "attendance" } = req.query;

    const option = {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: Employee,
        attributes: { exclude: ["password"] },
      },
      limit,
      order: [["id", "DESC"]],
    };

    if (page !== "") {
      option.offset = Number((page - 1) * limit);
    }

    if (filter !== "") {
      option.where = {
        attendanceType: filter,
      };
    }

    const attendance = await Attendance.findAndCountAll(option);
    res.json({ total: attendance.count, attendances: attendance.rows, page: +page });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createAttendance,
  updateStatus,
  getAttendance,
  getAttendances,
  getAttendancesWeb,
};
