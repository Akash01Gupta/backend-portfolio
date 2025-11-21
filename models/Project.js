const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  homepage: String,
  repo: String,
  image: String,
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Project", ProjectSchema);
