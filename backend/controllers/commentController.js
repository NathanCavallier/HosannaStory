const Comment = require("../models/comment");

// Créer un nouveau commentaire
exports.createComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer tous les commentaires liés à une histoire ou à un chapitre
exports.getCommentsByStoryOrChapter = async (req, res) => {
  try {
    const { storyId, chapterId } = req.params;
    let query = {};
    if (storyId) query.story = storyId;
    if (chapterId) query.chapter = chapterId;

    const comments = await Comment.find(query).populate("user", "username");
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un commentaire par ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate(
      "user",
      "username"
    );
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mettre à jour un commentaire
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un commentaire
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
