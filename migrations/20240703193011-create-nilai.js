"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Nilais", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_siswa: {
        type: Sequelize.INTEGER,
      },
      id_kelas: {
        type: Sequelize.INTEGER,
      },
      id_tahun_ajar: {
        type: Sequelize.INTEGER,
      },
      id_mapel: {
        type: Sequelize.INTEGER,
      },
      credit_ganjil: {
        type: Sequelize.INTEGER,
      },
      credit_genap: {
        type: Sequelize.INTEGER,
      },
      debet_ganjil: {
        type: Sequelize.INTEGER,
      },
      debet_genap: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Nilais");
  },
};
