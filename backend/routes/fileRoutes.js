const express = require("express");
const fileController = require("../controllers/fileController");

const router = express.Router();

// Créer un nouveau fichier
router.post("/", fileController.createFile);

// Obtenir tous les fichiers
router.get("/", fileController.getAllFiles);

// Obtenir un fichier par ID
router.get("/:id", fileController.getFile);

// Mettre à jour un fichier
router.put("/:id", fileController.updateFile);

// Supprimer un fichier
router.delete("/:id", fileController.deleteFile);

module.exports = router;
