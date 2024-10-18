const { Sequelize, DataTypes, Model } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = new Sequelize("database", "username", "password", {
  host: "localhost",
  dialect: "sqlite", // or 'mysql', 'sqlite', 'mariadb', 'mssql'
});

class User extends Model {
  async comparePassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "https://i.imgur.com/2dJf1Uz.png",
    },
    likedStories: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Assuming Story IDs are integers
      references: {
        model: "Stories", // Name of the referenced model
        key: "id",
      },
    },
    bookmarkedStories: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Assuming Story IDs are integers
      references: {
        model: "Stories", // Name of the referenced model
        key: "id",
      },
    },
    progress: {
      type: DataTypes.JSONB, // Storing progress as JSON
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: "User",
    timestamps: true,
    hooks: {
      beforeSave: async (user, options) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

User.associate = function (models) {
  User.hasMany(models.Story, { as: "author", foreignKey: "authorId" });
  User.belongsToMany(models.Story, {
    through: "StoryLikes",
    as: "likedStories",
    foreignKey: "userId",
  });
  User.belongsToMany(models.Story, {
    through: "StoryBookmarks",
    as: "bookmarkedStories",
    foreignKey: "userId",
  });
  User.hasMany(models.Progress, { as: "progress", foreignKey: "userId" });
};

module.exports = User;
