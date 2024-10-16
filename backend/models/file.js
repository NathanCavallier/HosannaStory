const mongoose = require("mongoose");

// Définition du schéma fichier
const fileSchema = new mongoose.Schema({
  story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Story",
    required: true, // Chaque fichier est lié à une histoire
  },
  fileType: {
    type: String,
    enum: ["audio", "video", "pdf"], // Type de fichier
    required: true,
  },
  fileUrl: {
    type: String, // URL ou chemin du fichier
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("File", fileSchema);
