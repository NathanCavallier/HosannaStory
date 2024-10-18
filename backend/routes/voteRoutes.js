const express = require("express");
const voteController = require("../controllers/voteController");

const router = express.Router();

// Créer ou mettre à jour un vote
router.post("/", voteController.createOrUpdateVote);

// Récupérer tous les votes liés à une histoire ou un chapitre
router.get("/:storyId/:chapterId", voteController.getVotesByStoryOrChapter);

// Récupérer un vote par ID
router.get("/:id", voteController.getVoteById);

// Supprimer un vote
router.delete("/:id", voteController.deleteVote);

module.exports = router;
