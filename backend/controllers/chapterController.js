const Chapter = require("../models/chapter");

// Créer un nouveau chapitre
exports.createChapter = async (req, res) => {
  try {
    const chapter = new Chapter(req.body);
    await chapter.save();
    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer tous les chapitres d'une histoire
exports.getChaptersByStory = async (req, res) => {
  try {
    const chapters = await Chapter.find({ story: req.params.storyId });
    res.status(200).json(chapters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un chapitre par ID
exports.getChapterById = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });
    res.status(200).json(chapter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un chapitre
exports.updateChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });
    res.status(200).json(chapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un chapitre
exports.deleteChapter = async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });
    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
