const DatauriParser = require("datauri/parser");
const cloudinary = require("../middlewares/cloudinary");
const { Attendance, Location, Employee } = require("../models/index");

const createAttendance = async (req, res, next) => {
  try {
    let { attendance_type, latitude, longitude } = req.body;

    if (req.file) {
      if (attendance_type === "absent" || attendance_type === "sick") {
        const parser = new DatauriParser();
        const pathImage = parser.format(req.file.originalname, req.file.buffer);
        const image = await cloudinary.uploader.upload(pathImage.content);
        const attachment = image.secure_url;

        const attendance = await Attendance.create({
          check_in_time: new Date(),
          attachment: attachment,
          attendance_type,
          employee_id: 3,
        });

        await Location.create({
          latitude,
          longitude,
          type: "in",
          attendance_id: attendance.id,
        });
        const employee = await Employee.findByPk(attendance.employee_id);
        res.status(201).json({
          message: `${employee.first_name} has been check in with status ${attendance_type}`,
        });
      } else {
        throw { name: "BAD_REQUEST_ATTENDANCE_TYPE" };
      }
    } else {
      throw { name: "BAD_REQUEST_ATTACHMENT" };
    }
  } catch (err) {
    next(err);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    let { id } = req.params;
    const attend = await Attendance.findByPk(id);
    console.log(attend);
    /**
     * Eroor please resolve
     */
    // let checkOutTime = new Date().getHours();
    // console.log(checkOutTime, "<<<<<<<");

    // if (checkOutTime < 17) {
    //   await Attendance.update(
    //     {
    //       check_out_time: new Date(),
    //       attendance_type: "permit",
    //     },
    //     {
    //       where: {
    //         id,
    //       },
    //     }
    //   );
    //   const employee = await Employee.findByPk(attend.employee_id);
    //   res.status(201).json({
    //     message: `${employee.first_name} has been check in with status permit`,
    //   });
    // } else {
    //   Attendance.update(
    //     {
    //       check_out_time: new Date(),
    //       attendance_type: "attendance",
    //     },
    //     {
    //       where: {
    //         id,
    //       },
    //     }
    //   );
    //   const employee = await Employee.findByPk(attend.employee_id);
    //   res.status(201).json({
    //     message: `${employee.first_name} has been check in with status attendance`,
    //   });
    // }
  } catch (err) {
    next(err);
  }
};

module.exports = { createAttendance, updateAttendance };
