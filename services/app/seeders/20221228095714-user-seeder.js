"use strict";

const userData = require("../data/user.json");
const { hashPassword } = require("../middlewares/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = userData.map((user) => {
      user.createdAt = new Date();
      user.updatedAt = new Date();
      user.password = hashPassword(user.password);
      return user;
    });
    await queryInterface.bulkInsert("Users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
