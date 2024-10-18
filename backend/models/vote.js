const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:"); // Example for SQLite, change to your database configuration

class Vote extends Model {}

Vote.init(
  {
    storyId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Stories", // Name of the table
        key: "id",
      },
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users", // Name of the table
        key: "id",
      },
      allowNull: false,
    },
    voteType: {
      type: DataTypes.ENUM("like", "dislike"),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Vote",
    tableName: "Votes",
    timestamps: false,
  }
);

Vote.belongsTo(User, { foreignKey: "userId" });
Vote.belongsTo(Story, { foreignKey: "storyId" });

module.exports = Vote;
