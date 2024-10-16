// models/Story.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categories: [String], // For different genres of stories
    coverImage: String, // URL or path to the cover image
    chapters: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chapter", // Refer to the Chapter model
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Users who liked the story
      },
    ],
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "User", // Users who bookmarked the story
      },
    ],
    progress: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        chapter: {
          type: Schema.Types.ObjectId,
          ref: "Chapter",
        },
        progressInSeconds: Number, // For audio/video or text-based reading progress
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Story", StorySchema);
