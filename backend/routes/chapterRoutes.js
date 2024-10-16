const express = require("express");
const Chapter = require("../models/chapter");

const router = express.Router();

// Get all chapters
router.get("/", async (req, res) => {
  try {
    const chapters = await Chapter.find()
      .populate("story")
      .populate("likes")
      .populate("bookmarks");
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific chapter
router.get("/:id", getChapter, (req, res) => {
  res.json(res.chapter);
});

// Create a new chapter
router.post("/", async (req, res) => {
  const chapter = new Chapter({
    story: req.body.story,
    title: req.body.title,
    contentText: req.body.contentText,
    audioFile: req.body.audioFile,
    videoFile: req.body.videoFile,
  });

  try {
    const newChapter = await chapter.save();
    res.status(201).json(newChapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a chapter
router.patch("/:id", getChapter, async (req, res) => {
  if (req.body.story != null) {
    res.chapter.story = req.body.story;
  }
  if (req.body.title != null) {
    res.chapter.title = req.body.title;
  }
  if (req.body.contentText != null) {
    res.chapter.contentText = req.body.contentText;
  }
  if (req.body.audioFile != null) {
    res.chapter.audioFile = req.body.audioFile;
  }
  if (req.body.videoFile != null) {
    res.chapter.videoFile = req.body.videoFile;
  }

  try {
    const updatedChapter = await res.chapter.save();
    res.json(updatedChapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a chapter
router.delete("/:id", getChapter, async (req, res) => {
  try {
    await res.chapter.remove();
    res.json({ message: "Deleted Chapter" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get chapter by ID
async function getChapter(req, res, next) {
  let chapter;
  try {
    chapter = await Chapter.findById(req.params.id)
      .populate("story")
      .populate("likes")
      .populate("bookmarks");
    if (chapter == null) {
      return res.status(404).json({ message: "Cannot find chapter" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.chapter = chapter;
  next();
}

module.exports = router;
