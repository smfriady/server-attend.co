const { Employee, Department, Role } = require("../models/index");

const getEmployees = async (_req, res, next) => {
  try {
    const option = {
      attributes: {
        exclude: [
          "password",
          "createdAt",
          "updatedAt",
          "department_id",
          "role_id",
        ],
      },
      include: [
        {
          model: Department,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        {
          model: Role,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
      ],
      order: [["id", "ASC"]],
    };

    const employees = await Employee.findAndCountAll(option);

    res.status(200).json({ total: employees.count, employees: employees.rows });
  } catch (err) {
    next(err);
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const option = {
      attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      include: [
        {
          model: Department,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
        {
          model: Role,
          attributes: { exclude: ["id", "createdAt", "updatedAt"] },
        },
      ],
      where: { id },
    };

    const employee = await Employee.findOne(option);

    res.json({ employee });
  } catch (err) {
    next(err);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      nik,
      education,
      img_profile,
      birth_date,
      email,
      password,
      base_salary,
      department_id,
      role_id,
    } = req.body;

    const employee = await Employee.create({
      first_name,
      last_name,
      nik,
      education,
      img_profile,
      birth_date,
      email,
      password,
      base_salary,
      department_id,
      role_id,
    });

    res.status(201).json({
      message: `Employee with email ${employee.email} created successfully`,
    });
  } catch (err) {
    next(err);
  }
};

const editEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      first_name,
      last_name,
      nik,
      education,
      img_profile,
      birth_date,
      email,
      password,
    } = req.body;

    await Employee.update(
      {
        first_name,
        last_name,
        nik,
        education,
        img_profile,
        birth_date,
        email,
        password,
      },
      { where: { id } }
    );

    res.json({ message: "Updated successfully" });
  } catch (err) {
    next(err);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Employee.destroy({ where: { id } });

    res.json({ message: `Employee with id ${id} is deleted` });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  editEmployee,
  deleteEmployee,
};
