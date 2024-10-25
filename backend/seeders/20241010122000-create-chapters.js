"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Chapters", [
      {
        storyId: 1,
        title: "Chapter 1",
        illustration: "https://via.placeholder.com/150",
        picture: "https://via.placeholder.com/150",
        listeningTime: 10,
        position: 1,
        contentText: "This is the content of chapter 1.",
        audioFile: "https://example.com/audio1.mp3",
        videoFile: "https://example.com/video1.mp4",
        likes: JSON.stringify([1, 2]),
        bookmarks: JSON.stringify([1]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        storyId: 2,
        title: "Chapter 2",
        illustration: "https://via.placeholder.com/150",
        picture: "https://via.placeholder.com/150",
        listeningTime: 15,
        position: 2,
        contentText: "This is the content of chapter 2.",
        audioFile: "https://example.com/audio2.mp3",
        videoFile: "https://example.com/video2.mp4",
        likes: JSON.stringify([2]),
        bookmarks: JSON.stringify([1, 2]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Chapters", null, {});
  },
};
