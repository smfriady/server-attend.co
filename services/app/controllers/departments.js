const { Department } = require("../models/index");

const getDepartments = async (req, res, next) => {
  try {
    const option = {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    };
    const departmens = await Department.findAll(option);

    res.json({ departmens });
  } catch (err) {
    next(err);
  }
};

module.exports = { getDepartments };
