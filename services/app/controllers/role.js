const { Role } = require("../models/index");

const getRoles = async (_req, res, next) => {
  try {
    const option = {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    };
    const roles = await Role.findAll(option);

    res.json(roles);
  } catch (err) {
    next(err);
  }
};

module.exports = { getRoles };
