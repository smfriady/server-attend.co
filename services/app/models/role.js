"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.belongsTo(models.Profile, {
        foreignKey: "role_id",
      });
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "role name is required" },
          notNull: { msg: "role name is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
