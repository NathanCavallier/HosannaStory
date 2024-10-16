const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Définition du schéma utilisateur
const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      unique: true,
    },
    last_name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://i.imgur.com/2dJf1Uz.png",
    },
    likedStories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    bookmarkedStories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story",
      },
    ],
    progress: [
      {
        story: {
          type: Schema.Types.ObjectId,
          ref: "Story",
        },
        chapter: {
          type: Schema.Types.ObjectId,
          ref: "Chapter",
        },
        progressInSeconds: Number,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Middleware pour hacher le mot de passe avant de sauvegarder
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer les mots de passe
UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
