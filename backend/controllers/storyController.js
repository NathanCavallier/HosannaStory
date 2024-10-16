const Story = require("../models/story");


// Créer une nouvelle histoire
exports.createStory = async (req, res) => {
  try {
    const story = new Story(req.body);
    await story.save();
    res.status(201).json(story);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer toutes les histoires
exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .populate("author", "username")
      .populate("chapters");
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une histoire par ID
exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id)
      .populate("author", "username")
      .populate("chapters");
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour une histoire
exports.updateStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.status(200).json(story);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une histoire
exports.deleteStory = async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ message: "Story not found" });
    res.status(200).json({ message: "Story deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
