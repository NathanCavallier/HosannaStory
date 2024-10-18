const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assurez-vous que le chemin est correct

const File = sequelize.define(
  "File",
  {
    storyId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Stories", // Nom de la table référencée
        key: "id",
      },
      allowNull: false,
    },
    fileType: {
      type: DataTypes.ENUM("audio", "video", "pdf"),
      allowNull: false,
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uploadedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Files", // Nom de la table
    timestamps: false, // Désactive les timestamps automatiques (createdAt, updatedAt)
  }
);

File.associate = function (models) {
  File.belongsTo(models.Story, { as: "story", foreignKey: "storyId" });
};

module.exports = File;
