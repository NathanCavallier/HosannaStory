"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password123", 10);
    return queryInterface.bulkInsert("Users", [
      {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: hashedPassword,
        avatar: "https://i.imgur.com/2dJf1Uz.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@example.com",
        password: hashedPassword,
        avatar: "https://i.imgur.com/2dJf1Uz.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: "Michael",
        last_name: "Smith",
        email: "michael.smith@example.com",
        password: hashedPassword,
        avatar: "https://i.imgur.com/2dJf1Uz.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
