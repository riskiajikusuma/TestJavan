"use strict";

const utils = require("../utils/input-array");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Person_Assets",
      [
        ...utils.inputArray("person_id", "asset_id", 1, [null]),
        ...utils.inputArray("person_id", "asset_id", 2, [3, 7]),
        ...utils.inputArray("person_id", "asset_id", 3, [5]),
        ...utils.inputArray("person_id", "asset_id", 4, [3]),
        ...utils.inputArray("person_id", "asset_id", 5, [5]),
        ...utils.inputArray("person_id", "asset_id", 6, [1]),
        ...utils.inputArray("person_id", "asset_id", 7, [2]),
        ...utils.inputArray("person_id", "asset_id", 8, [3]),
        ...utils.inputArray("person_id", "asset_id", 9, [5, 2]),
        ...utils.inputArray("person_id", "asset_id", 10, [7]),
        ...utils.inputArray("person_id", "asset_id", 11, [2]),
        ...utils.inputArray("person_id", "asset_id", 12, [null]),
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Person_Assets", null, {});
  },
};
