const { Role } = require("../models/index");

const insertRole = async (req, res, next) => {
  try {
    const { name } = req.body;

    const role = await Role.create({ name });

    res.status(201).json({
      message: `Role with name ${role.name} created successfully`,
    });
  } catch (err) {
    next(err);
  }
};

const getRoles = async (req, res, next) => {
  try {
    const options = {
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    };

    const roles = await Role.findAll(options);

    res.status(200).json(roles);
  } catch (err) {
    next(err);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const id = +req.params.id;

    const { name } = req.body;

    const payload = { name };

    await Role.update(payload, { where: { id } });

    res.status(200).json({
      message: `Role with name ${payload.name} updated successfully`,
    });
  } catch (err) {
    next(err);
  }
};

const destroyRole = async (req, res, next) => {
  try {
    const id = +req.params.id;

    const role = await Role.findByPk(id);

    if (!role) throw { name: "NOT_FOUND" };

    await Role.destroy({ where: { id: role.id } });

    res.status(200).json({
      message: `Role with name ${role.name} deleted successfully`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  insertRole,
  getRoles,
  updateRole,
  destroyRole,
};
