"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Family_Assets", {
      family_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "Families",
          key: "id",
        },
      },
      asset_id: {
        primaryKey: true,
        allowNull: true,
        type: Sequelize.INTEGER.UNSIGNED,
        references: {
          model: "Assets",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Family_Assets");
  },
};
