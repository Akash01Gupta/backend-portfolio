const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], required: true },
    github: { type: String },
    live: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
