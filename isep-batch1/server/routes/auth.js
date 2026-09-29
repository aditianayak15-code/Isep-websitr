const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'isep_batch1_secret_jwt_key_2024';

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate admin and return JWT token
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check database if connected
    let admin = null;
    try {
      admin = await Admin.findOne({ email: normalizedEmail });
    } catch (dbErr) {
      console.warn('[Auth] Database lookup skipped or unavailable, using fallback check.');
    }

    let isMatch = false;

    if (admin) {
      isMatch = await bcrypt.compare(password, admin.passwordHash);
    } else {
      // Default fallback administrator credentials for initial setup
      if (normalizedEmail === 'admin@isep.org' && (password === 'admin' || password === 'admin123')) {
        isMatch = true;
      }
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Access restricted to ISEP administrators.' });
    }

    // Generate JWT
    const payload = {
      admin: {
        id: admin ? admin._id : 'admin_default_id',
        email: normalizedEmail,
        role: 'admin'
      }
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

    return res.json({
      success: true,
      token,
      admin: {
        email: normalizedEmail,
        role: 'admin'
      },
      message: 'Authentication successful. Welcome to the ISEP Archive Management Portal.'
    });
  } catch (error) {
    console.error('[Auth Error]', error);
    return res.status(500).json({ success: false, message: 'Server error during authentication.' });
  }
});

module.exports = router;
