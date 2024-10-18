const express = require("express");
const commentController = require("../controllers/commentController");

const router = express.Router();

// Créer un nouveau commentaire
router.post("/", commentController.createComment);

// Récupérer tous les commentaires liés à une histoire ou à un chapitre
router.get(
  "/:storyId/:chapterId",
  commentController.getCommentsByStoryOrChapter
);

// Récupérer un commentaire par ID
router.get("/:id", commentController.getCommentById);

// Mettre à jour un commentaire
router.put("/:id", commentController.updateComment);

// Supprimer un commentaire
router.delete("/:id", commentController.deleteComment);

module.exports = router;
