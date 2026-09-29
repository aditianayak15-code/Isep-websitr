const multer = require('multer');
const path = require('path');

// Storage configuration - memory storage for forwarding to Cloudinary or disk
const storage = multer.memoryStorage();

// File filter: only permit valid images and documents (PDF)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/pdf'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and PDF files are allowed.'), false);
  }
};

// Size limit: 10MB per Section 10
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  },
  fileFilter
});

module.exports = upload;
