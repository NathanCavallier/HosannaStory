"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Files", [
      {
        storyId: 1,
        fileType: "audio",
        fileUrl: "https://example.com/audio1.mp3",
        uploadedAt: new Date(),
      },
      {
        storyId: 2,
        fileType: "video",
        fileUrl: "https://example.com/video1.mp4",
        uploadedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Files", null, {});
  },
};
