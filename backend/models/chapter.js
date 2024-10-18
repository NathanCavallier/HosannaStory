// models/chapter.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assurez-vous que ce chemin est correct

const Chapter = sequelize.define(
  "Chapter",
  {
    storyId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Stories", // Nom de la table des histoires
        key: "id",
      },
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    illustration: {
      type: DataTypes.STRING,
    },
    picture: {
      type: DataTypes.STRING,
    },
    listeningTime: {
      type: DataTypes.INTEGER,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contentText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    audioFile: {
      type: DataTypes.STRING,
    },
    videoFile: {
      type: DataTypes.STRING,
    },
    likes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Assuming likes are stored as an array of user IDs
    },
    bookmarks: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Assuming bookmarks are stored as an array of user IDs
    },
  },
  {
    timestamps: true,
  }
);

Chapter.associate = function (models) {
  Chapter.belongsTo(models.Story, { as: "story", foreignKey: "storyId" });
  Chapter.hasMany(models.Comment, { as: "comments", foreignKey: "chapterId" });
};

module.exports = Chapter;
