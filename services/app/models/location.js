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
      Location.belongsTo(models.Attendance, { foreignKey: "attendance_id" });
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
      type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["in", "out"],
        defaultValue: "in",
        validate: {
          notNull: { msg: "location type is required" },
          notEmpty: { msg: "location type is required" },
          // isEven(values) {
          //   if (values !== "in") {
          //     if (values !== "out") {
          //       throw new Error("wrong type location");
          //     }
          //   }
          // },
        },
      },
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
      // hooks: {
      //   beforeValidate: (instance, _) => {
      //     instance.type = "in";
      //   },
      // },
      sequelize,
      modelName: "Location",
    }
  );

  return Location;
};
