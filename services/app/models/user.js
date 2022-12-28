"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../middlewares/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email is required" },
          notNull: { msg: "Email is required" },
          len: {
            args: [6, 10],
            msg: "The password length should be between 6 and 10 characters",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (instace, option) => {
          instace.password = hashPassword(instace.password);
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
