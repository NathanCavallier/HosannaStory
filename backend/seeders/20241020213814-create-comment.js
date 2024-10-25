"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Comments", [
      {
        storyId: 1,
        authorId: 1,
        content: "This is a comment on the first story.",
        createdAt: new Date(),
      },
      {
        storyId: 2,
        authorId: 2,
        content: "This is a comment on the second story.",
        createdAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
