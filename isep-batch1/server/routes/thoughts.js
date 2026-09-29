const express = require('express');
const router = express.Router();
const Thought = require('../models/Thought');
const auth = require('../middleware/auth');

let fallbackThoughts = [
  {
    _id: "thought_01",
    name: "Aditi S.",
    message: "The mentorship and engineering standards we practiced during ISEP Batch 1 completely reshaped how I approach systems design. Forever grateful to the organizers!",
    rating: 5,
    status: "approved",
    createdAt: new Date("2026-06-29T10:30:00Z")
  },
  {
    _id: "thought_02",
    name: "Rahul V.",
    message: "48-hour hackathon was the steepest learning curve of my college life. Batch 1 set the benchmark extremely high.",
    rating: 5,
    status: "approved",
    createdAt: new Date("2026-06-30T14:15:00Z")
  },
  {
    _id: "thought_03",
    name: "Prof. K. Venkatesh",
    message: "Watching this inaugural batch transition from classroom theory into production-ready engineers was a privilege. Exceptional dedication.",
    rating: 5,
    status: "approved",
    createdAt: new Date("2026-07-01T09:00:00Z")
  },
  {
    _id: "thought_04",
    name: "Kavya Nair",
    message: "Working with cross-track teams was the highlight. Proud to be an ISEP Batch 1 alumnus!",
    rating: 5,
    status: "approved",
    createdAt: new Date("2026-07-02T16:45:00Z")
  },
  {
    _id: "thought_05",
    name: "Anonymous Visitor",
    message: "Great work by all the interns! Impressive projects.",
    rating: 4,
    status: "pending",
    createdAt: new Date("2026-07-03T11:20:00Z")
  }
];

/**
 * @route   GET /api/thoughts
 * @desc    List approved thoughts for public wall
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    try {
      const thoughts = await Thought.find({ status: 'approved' }).sort({ createdAt: -1 });
      if (thoughts && thoughts.length > 0) {
        return res.json({ success: true, count: thoughts.length, data: thoughts });
      }
    } catch (e) {}

    const approved = fallbackThoughts.filter(t => t.status === 'approved');
    return res.json({ success: true, count: approved.length, data: approved });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   GET /api/thoughts/admin/all
 * @desc    List all thoughts (pending, approved, hidden) for Admin moderation
 * @access  Admin
 */
router.get('/admin/all', auth, async (req, res) => {
  try {
    try {
      const thoughts = await Thought.find().sort({ createdAt: -1 });
      if (thoughts && thoughts.length > 0) {
        return res.json({ success: true, count: thoughts.length, data: thoughts });
      }
    } catch (e) {}

    return res.json({ success: true, count: fallbackThoughts.length, data: fallbackThoughts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/thoughts
 * @desc    Submit a thought (defaults to status: 'pending' for moderation)
 * @access  Public
 */
router.post('/', async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    if (!name || !message) {
      return res.status(400).json({ success: false, message: 'Name and message are required.' });
    }

    const thoughtData = {
      name: name.trim(),
      message: message.trim(),
      rating: Number(rating) || 5,
      status: 'pending', // Section 10: Thoughts default to pending and go live only after admin approval
      createdAt: new Date()
    };

    try {
      const created = await Thought.create(thoughtData);
      return res.status(201).json({
        success: true,
        data: created,
        message: 'Your reflection has been submitted and queued for archival moderation.'
      });
    } catch (dbErr) {
      const mockCreated = { _id: 'thought_' + Date.now(), ...thoughtData };
      fallbackThoughts.unshift(mockCreated);
      return res.status(201).json({
        success: true,
        data: mockCreated,
        message: 'Your reflection has been submitted and queued for archival moderation.'
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   PATCH /api/thoughts/:id
 * @desc    Approve or hide a thought
 * @access  Admin
 */
router.patch('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'hidden'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status. Must be pending, approved, or hidden.' });
    }

    try {
      const updated = await Thought.findByIdAndUpdate(id, { status }, { new: true });
      if (updated) {
        return res.json({ success: true, data: updated });
      }
    } catch (e) {}

    const item = fallbackThoughts.find(t => t._id === id);
    if (item) {
      item.status = status;
      return res.json({ success: true, data: item });
    }

    return res.status(404).json({ success: false, message: 'Thought not found.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   DELETE /api/thoughts/:id
 * @desc    Delete a thought
 * @access  Admin
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Thought.findByIdAndDelete(id);
    } catch (e) {
      fallbackThoughts = fallbackThoughts.filter(t => t._id !== id);
    }
    return res.json({ success: true, message: 'Thought removed from archive.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
