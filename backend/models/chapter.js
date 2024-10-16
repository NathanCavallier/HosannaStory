// models/Chapter.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChapterSchema = new Schema(
  {
    story: {
      type: Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    contentText: {
      type: String, // For text-based stories
      required: true,
    },
    audioFile: String, // URL/path for audio version of the chapter
    videoFile: String, // URL/path for video version of the chapter
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chapter", ChapterSchema);
