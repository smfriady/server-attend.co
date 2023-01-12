const { Op } = require("sequelize");
const { Salary, Employee } = require("../models/index");

const getSalaries = async (req, res, next) => {
  try {
    let { id: employeeId } = req.employee;
    const option = {
      attributes: { exclude: ["createdAt"] },
      order: [["id", "DESC"]],
      where: {
        employeeId: employeeId,
      },
    };
    const Salaries = await Salary.findAll(option);
    res.json(Salaries);
  } catch (err) {
    next(err);
  }
};

const getSalariesWeb = async (_req, res, next) => {
  try {
    const { page = "", limit = 10, firstName = "" } = req.query;

    const option = {
      attributes: { exclude: ["createdAt"] },
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

    if (firstName !== "") {
      option.include.where = {
        firstName: { [Op.iLike]: `%${firstName}%` },
      };
    }

    const salaries = await Salary.findAndCountAll(option);
    res.json({ total: salaries.count, salaries: salaries.rows, page: +page });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSalaries, getSalariesWeb };
