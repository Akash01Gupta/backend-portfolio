const express = require('express');
const About = require('../models/About');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.use(protect);

// get latest about (single doc)
router.get('/', async (req, res) => {
  const about = await About.findOne().sort({ updatedAt: -1 });
  res.json(about || {});
});

// upsert
router.post('/', async (req, res) => {
  const data = req.body;
  let about = await About.findOne();
  if (!about) about = await About.create(data);
  else {
    about.set(data);
    await about.save();
  }
  res.json(about);
});

module.exports = router;
