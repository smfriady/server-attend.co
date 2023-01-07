"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Location.init(
    {
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "latitude is required",
          },
          notEmpty: {
            msg: "latitude is required",
          },
        },
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "longitude is required",
          },
          notEmpty: {
            msg: "longitude is required",
          },
        },
      },
      type: DataTypes.ENUM,
      attendance_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Attendances",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
    },
    {
      sequelize,
      modelName: "Location",
    }
  );
  return Location;
};
