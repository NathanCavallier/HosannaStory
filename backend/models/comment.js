const mongoose = require("mongoose");

// Définition du schéma commentaire
const commentSchema = new mongoose.Schema({
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true, // Le commentaire est lié à une histoire
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // L'auteur du commentaire est un utilisateur
  },
  content: {
    type: String,
    required: true, // Le texte du commentaire
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
