const dayjs = require("dayjs");
const { Attendance, Employee, Salary } = require("../models/index");
const { Op } = require("sequelize");

const generateSalary = async () => {
  try {
    const date = dayjs().subtract(1, "month");

    const employee = await Employee.findAll();

    const workHours = [];
    let hour = 0;
    let salary = 0;
    const amount = [];

    for (let index = 0; index < employee.length; index++) {
      const el = employee[index];
      const attendances = await Attendance.findAll({
        where: {
          checkInTime: {
            [Op.between]: [date.startOf("month").toDate(), date.endOf("month").toDate()],
          },
          employeeId: el.id,
        },
      });
      attendances.forEach((el) => {

        let checkin = dayjs(el.checkInTime);
        let checkout = dayjs(el.checkOutTime);
        hour += checkout.diff(checkin, "hour");
      });
      workHours.push(hour);
      if (workHours[index] >= 170 && workHours[index] < 190) {
        salary = (el.baseSalary * 110) / 100;
        amount.push(salary);
        salary = 0;
      } else if (workHours[index] >= 190) {
        salary = (el.baseSalary * 120) / 100;
        amount.push(salary);
        salary = 0;
      } else if (workHours[index] >= 150 && workHours[index] < 170) {
        salary = (el.baseSalary * 90) / 100;
        amount.push(salary);
        salary = 0;
      } else if (workHours[index] < 150) {
        salary = (el.baseSalary * 80) / 100;
        amount.push(salary);
        salary = 0;
      }
      hour = 0;
    }

    const datePeriode = dayjs(date.startOf("month").toDate());
    const periodeSalary = datePeriode.add(1, "day");

    const salaries = employee.map((el, index) => {
      return {
        amount: amount[index],
        employeeId: el.id,
        paymentDate: new Date(),
        periodeSalary: periodeSalary.$d,
      };
    });

    const Salaries = await Salary.bulkCreate(salaries);
  } catch (err) {
    next(err);
  }
};

module.exports = { generateSalary };
