"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserProfile.init(
    {
      nik: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "NIK must be unique" },
        validate: {
          notEmpty: { msg: "NIK is required" },
          notNull: { msg: "NIK is required" },
        },
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Full Name is required" },
          notNull: { msg: "Full Name is required" },
        },
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Age is required" },
          notNull: { msg: "Age is required" },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Date Of Birth is required" },
          notNull: { msg: "Date Of Birth is required" },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Address is required" },
          notNull: { msg: "Address is required" },
        },
      },
      education: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Education is required" },
          notNull: { msg: "Education is required" },
        },
      },
      imageProfile: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Image Profile is required" },
          notNull: { msg: "Image Profile is required" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      hooks: {
        beforeCreate: (instance, option) => {
          const uuid = uuidv4();
          instance.nik = uuid;
        },
      },
      sequelize,
      modelName: "UserProfile",
    }
  );
  return UserProfile;
};
