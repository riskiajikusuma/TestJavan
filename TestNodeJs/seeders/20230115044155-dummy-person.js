"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "People",
      [
        {
          id: 1,
          nama: "Bani",
          jenis_kelamin: "Laki-laki",
          created_at: new Date(),
          updated_at: new Date(),
          family_id: 1,
        },
        {
          id: 2,
          nama: "Budi",
          jenis_kelamin: "Laki-laki",
          created_at: new Date(),
          updated_at: new Date(),
          family_id: 1,
        },
        {
          id: 3,
          nama: "Nida",
          jenis_kelamin: "Perempuan",
          created_at: new Date(),
          updated_at: new Date(),
          family_id: 1,
        },
        {
          id: 4,
          nama: "Andi",
          jenis_kelamin: "Laki-laki",
          created_at: new Date(),
          updated_at: new Date(),
          family_id: 1,
        },
        {
          id: 5,
          nama: "Sigit",
          jenis_kelamin: "Laki-laki",
          created_at: new Date(),
          updated_at: new Date(),
          family_id: 1,
        },
        {
          id: 6,
          nama: "Hari",
          jenis_kelamin: "Laki-laki",
          created_at: new Date(),
          updated_at: new Date(),
          family_id: 2,
        },
        {
          id: 7,
          nama: "Siti",
          jenis_kelamin: "Perempuan",
          created_at: new Date(),
          updated_at: new Date(),
          family_id: 2,
        },
        {
          id: 8,
          nama: "Bila",
          jenis_kelamin: "Perempuan",
          created_at: new Date(),
          updated_at: new Date(),
          family_id: 3,
        },
        {
          id: 9,
          nama: "Lesti",
          jenis_kelamin: "Perempuan",
          created_at: new Date(),
          updated_at: new Date(),
          family_id: 3,
        },
        {
          id: 10,
          nama: "Diki",
          jenis_kelamin: "Laki-laki",
          created_at: new Date(),
          updated_at: new Date(),
          family_id: 4,
        },
        {
          id: 11,
          nama: "Doni",
          jenis_kelamin: "Laki-laki",
          created_at: new Date(),
          updated_at: new Date(),
          family_id: 5,
        },
        {
          id: 12,
          nama: "Toni",
          jenis_kelamin: "Laki-laki",
          created_at: new Date(),
          updated_at: new Date(),
          family_id: 5,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("People", null, {});
  },
};
