const mongoose = require("mongoose");

// Définition du schéma pour les réactions ou votes
const voteSchema = new mongoose.Schema({
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  voteType: {
    type: String,
    enum: ["like", "dislike"], // Types de vote supportés
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Vote", voteSchema);
