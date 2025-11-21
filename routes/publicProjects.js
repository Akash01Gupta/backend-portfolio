const express = require("express");
const router = express.Router();
const Project = require("../models/projects");

// Public → Fetch All Projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public → Fetch Single Project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
