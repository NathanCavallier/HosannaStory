const express = require("express");
const chapterController = require("../controllers/chapterController");

const router = express.Router();

// Créer un nouveau chapitre
router.post("/", chapterController.createChapter);

// Récupérer tous les chapitres d'une histoire
router.get("/story/:storyId", chapterController.getChaptersByStory);

// Récupérer un chapitre par ID
router.get("/:id", chapterController.getChapterById);

// Mettre à jour un chapitre
router.put("/:id", chapterController.updateChapter);

// Supprimer un chapitre
router.delete("/:id", chapterController.deleteChapter);

module.exports = router;
