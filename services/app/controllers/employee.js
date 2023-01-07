const { Employee, Department, Role } = require("../models/index");
const DatauriParser = require("datauri/parser");
const cloudinary = require("../middlewares/cloudinary");
const { Op } = require("sequelize");

const getEmployees = async (req, res, next) => {
  try {
    const { page = "", firstName = "", filter = "" } = req.query;

    const limit = 5;

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
      limit,
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

    if (firstName !== "") {
      if (firstName !== undefined) {
        option.where = {
          first_name: { [Op.iLike]: `%${firstName}%` },
        };
      }
    }

    if (page !== "") {
      if (page !== undefined) {
        option.offset = Number((page - 1) * limit);
      }
    }

    if (filter !== "") {
      if (filter !== "undefined") {
        option.include = [
          {
            model: Department,
            where: { id: filter },
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
          {
            model: Role,
            attributes: { exclude: ["id", "createdAt", "updatedAt"] },
          },
        ];
      }
    }

    const employees = await Employee.findAndCountAll(option);

    res
      .status(200)
      .json({ total: employees.count, employees: employees.rows, page: +page });
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

    res.json(employee);
  } catch (err) {
    next(err);
  }
};

const createEmployee = async (req, res, next) => {
  try {
    if (!req.file) throw { name: "BAD_REQUEST_IMG_PROFILE" };
    const {
      first_name,
      last_name,
      nik,
      education,
      birth_date,
      email,
      password,
      base_salary,
      department_id,
      role_id,
    } = req.body;

    const parser = new DatauriParser();
    const pathImage = parser.format(req.file.originalname, req.file.buffer);
    const image = await cloudinary.uploader.upload(pathImage.content);
    const imgProfile = image.secure_url;

    const payload = {
      first_name,
      last_name,
      nik,
      education,
      birth_date,
      email,
      password,
      base_salary,
      department_id,
      role_id,
      img_profile: imgProfile,
    };

    const employee = await Employee.create(payload);

    res.status(201).json({
      message: `Employee with email ${employee.email} created successfully`,
    });
  } catch (err) {
    console.log(err);
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
      base_salary,
      department_id,
      role_id,
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
        base_salary,
        department_id,
        role_id,
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
