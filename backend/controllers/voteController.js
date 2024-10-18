const Vote = require("../models/vote");

// Créer ou mettre à jour un vote
exports.createOrUpdateVote = async (req, res) => {
  try {
    const { userId, storyId, chapterId, type } = req.body;

    let query = { user: userId };
    if (storyId) query.story = storyId;
    if (chapterId) query.chapter = chapterId;

    // Chercher si l'utilisateur a déjà voté
    let vote = await Vote.findOne(query);

    if (vote) {
      // Mettre à jour le vote existant
      vote.type = type;
      await vote.save();
      res.status(200).json(vote);
    } else {
      // Créer un nouveau vote
      vote = new Vote(req.body);
      await vote.save();
      res.status(201).json(vote);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer tous les votes liés à une histoire ou un chapitre
exports.getVotesByStoryOrChapter = async (req, res) => {
  try {
    const { storyId, chapterId } = req.params;
    let query = {};
    if (storyId) query.story = storyId;
    if (chapterId) query.chapter = chapterId;

    const votes = await Vote.find(query).populate("user", "username");
    res.status(200).json(votes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un vote par ID
exports.getVoteById = async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id).populate(
      "user",
      "username"
    );
    if (!vote) return res.status(404).json({ message: "Vote not found" });
    res.status(200).json(vote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un vote
exports.deleteVote = async (req, res) => {
  try {
    const vote = await Vote.findByIdAndDelete(req.params.id);
    if (!vote) return res.status(404).json({ message: "Vote not found" });
    res.status(200).json({ message: "Vote deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
