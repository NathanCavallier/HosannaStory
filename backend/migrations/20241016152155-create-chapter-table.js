"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Chapters", {
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
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      illustration: {
        type: Sequelize.STRING,
      },
      picture: {
        type: Sequelize.STRING,
      },
      listeningTime: {
        type: Sequelize.INTEGER,
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      contentText: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      audioFile: {
        type: Sequelize.STRING,
      },
      videoFile: {
        type: Sequelize.STRING,
      },
      likes: {
        type: Sequelize.JSON,
      },
      bookmarks: {
        type: Sequelize.JSON,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Chapters");
  },
};
