"use strict";

const dataEmployee = require("../data/employee.json");
const { hashPassword } = require("../helpers/bycrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const employees = dataEmployee.map((el) => {
      delete el.id;
      el.birthDate = new Date(el.birthDate);
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
