const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  recipientName: { type: String, required: true, trim: true },
  issueDate: { type: Date, default: Date.now },
  fileUrl: { type: String, required: true },
  category: { type: String, default: 'Completion' }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
