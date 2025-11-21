const express = require('express');
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');
const router = express.Router();

// NOTE: contact form on public site should POST to /api/messages (no protect)
router.post('/', async (req, res) => {
  const msg = await Message.create(req.body);
  res.status(201).json({ message: 'Sent' });
});

// protected list
router.get('/', protect, async (req, res) => {
  const items = await Message.find().sort({ createdAt: -1 });
  res.json(items);
});

// mark read
router.put('/:id/read', protect, async (req, res) => {
  const m = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(m);
});

module.exports = router;
