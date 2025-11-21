const express = require("express");
const Project = require("../models/Project");

const router = express.Router();

// Public: Fetch all featured + all projects
router.get("/", async (req, res) => {
  try {
    const items = await Project.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
