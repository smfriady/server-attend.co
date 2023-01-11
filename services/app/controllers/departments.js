const { Department } = require("../models/index");

const getDepartments = async (req, res, next) => {
  try {
    const option = {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    };
    const department = await Department.findAll(option);

    res.json(department);
  } catch (err) {
    next(err);
  }
};

module.exports = { getDepartments };
