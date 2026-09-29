const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const auth = require('../middleware/auth');

let fallbackCertificates = [
  {
    _id: "cert_01",
    title: "Certificate of Internship Completion",
    recipientName: "Aditi Sharma",
    issueDate: new Date("2026-06-28"),
    category: "Completion",
    fileUrl: "cert_preview_01"
  },
  {
    _id: "cert_02",
    title: "Certificate of Technical Excellence",
    recipientName: "Rahul Verma",
    issueDate: new Date("2026-06-28"),
    category: "Excellence",
    fileUrl: "cert_preview_02"
  },
  {
    _id: "cert_03",
    title: "Certificate of Internship Completion",
    recipientName: "Kavya Nair",
    issueDate: new Date("2026-06-28"),
    category: "Completion",
    fileUrl: "cert_preview_03"
  },
  {
    _id: "cert_04",
    title: "Outstanding Project Innovation Award",
    recipientName: "Mohammad Tariq",
    issueDate: new Date("2026-06-28"),
    category: "Award",
    fileUrl: "cert_preview_04"
  },
  {
    _id: "cert_05",
    title: "Certificate of Internship Completion",
    recipientName: "Ananya Iyer",
    issueDate: new Date("2026-06-28"),
    category: "Completion",
    fileUrl: "cert_preview_05"
  },
  {
    _id: "cert_06",
    title: "Excellence in Collaborative Leadership",
    recipientName: "Vikram Sengupta",
    issueDate: new Date("2026-06-28"),
    category: "Leadership",
    fileUrl: "cert_preview_06"
  }
];

/**
 * @route   GET /api/certificates
 * @desc    List all certificates (view-only public access)
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }

    try {
      let certs = await Certificate.find(query).sort({ recipientName: 1 });
      if (certs && certs.length > 0) {
        if (search) {
          const s = search.toLowerCase();
          certs = certs.filter(c => 
            c.recipientName.toLowerCase().includes(s) || 
            c.title.toLowerCase().includes(s)
          );
        }
        return res.json({ success: true, count: certs.length, data: certs });
      }
    } catch (e) {}

    let filtered = [...fallbackCertificates];
    if (category && category !== 'All') {
      filtered = filtered.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(c => 
        c.recipientName.toLowerCase().includes(s) || 
        c.title.toLowerCase().includes(s)
      );
    }

    return res.json({ success: true, count: filtered.length, data: filtered });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/certificates
 * @desc    Add certificate record
 * @access  Admin
 */
router.post('/', auth, async (req, res) => {
  try {
    const { title, recipientName, issueDate, fileUrl, category } = req.body;

    if (!title || !recipientName) {
      return res.status(400).json({ success: false, message: 'Title and Recipient Name are required.' });
    }

    const certData = {
      title: title.trim(),
      recipientName: recipientName.trim(),
      issueDate: issueDate ? new Date(issueDate) : new Date("2026-06-28"),
      fileUrl: fileUrl || `cert_preview_${Date.now()}`,
      category: category || 'Completion'
    };

    try {
      const created = await Certificate.create(certData);
      return res.status(201).json({ success: true, data: created });
    } catch (dbErr) {
      const mockCreated = { _id: 'cert_' + Date.now(), ...certData };
      fallbackCertificates.unshift(mockCreated);
      return res.status(201).json({ success: true, data: mockCreated });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   DELETE /api/certificates/:id
 * @desc    Delete certificate
 * @access  Admin
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Certificate.findByIdAndDelete(id);
    } catch (e) {
      fallbackCertificates = fallbackCertificates.filter(c => c._id !== id);
    }
    return res.json({ success: true, message: 'Certificate removed.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
