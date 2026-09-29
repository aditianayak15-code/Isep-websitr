const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  imageUrl: { type: String, default: '' }
});

module.exports = mongoose.model('Achievement', AchievementSchema);
