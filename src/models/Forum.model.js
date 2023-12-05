const mongoose = require("mongoose");

const forumPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  // Additional fields for forum posts (e.g., likes, comments, etc.).
});

const ForumPost = mongoose.model("ForumPost", forumPostSchema);

module.exports = ForumPost;
