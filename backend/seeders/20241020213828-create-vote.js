"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Votes", [
      {
        userId: 1,
        storyId: 1,
        voteType: "upvote",
        createdAt: new Date(),
      },
      {
        userId: 2,
        storyId: 2,
        voteType: "downvote",
        createdAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Votes", null, {});
  },
};
