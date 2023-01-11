const { Employee, Department, Role } = require("../../models/index");

const getProfileEmployee = async (req, res, next) => {
  try {
    const { id } = req.employee;

    let option = {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: Department,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Role,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      where: { id },
    };

    const employee = await Employee.findOne(option);
    // if (!employee) throw { name: "NO_DATA_FOUND" };

    res.status(200).json(employee);
  } catch (err) {
    next(err);
  }
};

module.exports = { getProfileEmployee };
