const mongoose = require('mongoose');

const ThoughtSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'hidden'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Thought', ThoughtSchema);
