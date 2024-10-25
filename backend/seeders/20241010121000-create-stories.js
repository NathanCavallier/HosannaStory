"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Stories", [
      {
        title: "First Story",
        description: "This is the first story.",
        picture: "https://via.placeholder.com/150",
        authorId: 1,
        isPublished: true,
        categories: JSON.stringify(["Adventure", "Fantasy"]),
        coverImage: "https://via.placeholder.com/500",
        isFavorite: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Second Story",
        description: "This is the second story.",
        picture: "https://via.placeholder.com/150",
        authorId: 2,
        isPublished: false,
        categories: JSON.stringify(["Sci-Fi", "Thriller"]),
        coverImage: "https://via.placeholder.com/500",
        isFavorite: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Stories", null, {});
  },
};
