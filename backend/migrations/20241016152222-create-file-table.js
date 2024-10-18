"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Files", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      storyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Stories",
          key: "id",
        },
        allowNull: false,
      },
      fileType: {
        type: Sequelize.ENUM("audio", "video", "pdf"),
        allowNull: false,
      },
      fileUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      uploadedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Files");
  },
};
