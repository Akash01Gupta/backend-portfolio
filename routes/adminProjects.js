const express = require("express");
const router = express.Router();
const Project = require("../models/projects");
const authMiddleware = require("../middleware/authMiddleware");

// Create Project (Admin only)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Project (Admin only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Project (Admin only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
