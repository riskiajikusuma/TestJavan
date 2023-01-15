"use strict";

const utils = require("../utils/input-array");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Family_Assets",
      [
        ...utils.inputArray("family_id", "asset_id", 1, [6, 28]),
        ...utils.inputArray("family_id", "asset_id", 2, [29, 30]),
        ...utils.inputArray("family_id", "asset_id", 3, [26]),
        ...utils.inputArray("family_id", "asset_id", 4, [27, 28]),
        ...utils.inputArray("family_id", "asset_id", 5, [29, 26]),
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Family_Assets", null, {});
  },
};
