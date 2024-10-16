const express = require("express");
const storyController = require("../controllers/storyController");

const router = express.Router();

// Créer une nouvelle histoire
router.post("/", storyController.createStory);

// Récupérer toutes les histoires
router.get("/", storyController.getAllStories);

// Récupérer une histoire par ID
router.get("/:id", storyController.getStoryById);

// Mettre à jour une histoire
router.put("/:id", storyController.updateStory);

// Supprimer une histoire
router.delete("/:id", storyController.deleteStory);

module.exports = router;
