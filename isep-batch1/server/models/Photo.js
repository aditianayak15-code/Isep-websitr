const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  caption: { type: String, default: '' },
  album: { 
    type: String, 
    required: true, 
    enum: ['Events', 'Sessions', 'Team Activities', 'General'],
    default: 'Events'
  },
  imageUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Photo', PhotoSchema);
