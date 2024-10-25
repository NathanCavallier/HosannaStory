// models/Story.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assurez-vous que le chemin est correct

const Story = sequelize.define(
  "Story",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    story_type: {
      type: DataTypes.STRING, // "Sleep Story", "Short Story", "Poem", "Fable" etc.
      allowNull: false,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "https://via.placeholder.com/150",
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Nom du modèle User
        key: "id",
      },
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Pour PostgreSQL, utilisez JSON pour MySQL
    },
    coverImage: {
      type: DataTypes.STRING,
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

Story.associate = function (models) {
  Story.belongsTo(models.User, { as: "author", foreignKey: "authorId" });
  Story.hasMany(models.Chapter, { as: "chapters", foreignKey: "storyId" });
  Story.belongsToMany(models.User, {
    through: "StoryLikes",
    as: "likes",
    foreignKey: "storyId",
  });
  Story.belongsToMany(models.User, {
    through: "StoryBookmarks",
    as: "bookmarks",
    foreignKey: "storyId",
  });
  Story.hasMany(models.Progress, { as: "progress", foreignKey: "storyId" });
};

module.exports = Story;
