"use strict";

const dataEmployee = require("../data/profiles.json");
const { hashPassword } = require("../middlewares/bycrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const employees = dataEmployee.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      el.password = hashPassword(el.password);
      return el;
    });
    await queryInterface.bulkInsert("Employees", employees, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Employees", null, {});
  },
};
