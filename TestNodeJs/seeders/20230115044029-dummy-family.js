"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Families", [
      {
        id: 1,
        kepala_keluarga: "Bani",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        kepala_keluarga: "Budi",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        kepala_keluarga: "Nida",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        kepala_keluarga: "Andi",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 5,
        kepala_keluarga: "Sigit",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Families", null, {});
  },
};
