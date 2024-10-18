const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Assurez-vous que le chemin est correct

const Comment = sequelize.define(
  "Comment",
  {
    storyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Stories", // Nom de la table des histoires
        key: "id",
      },
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Nom de la table des utilisateurs
        key: "id",
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Comments", // Nom de la table des commentaires
    timestamps: false, // Si vous n'utilisez pas les champs createdAt et updatedAt par défaut de Sequelize
  }
);

Comment.associate = function (models) {
  Comment.belongsTo(models.Story, { as: "story", foreignKey: "storyId" });
  Comment.belongsTo(models.User, { as: "author", foreignKey: "authorId" });
};

module.exports = Comment;
