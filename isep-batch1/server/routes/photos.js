const express = require('express');
const router = express.Router();
const Photo = require('../models/Photo');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Seed / Initial data for fallback
let fallbackPhotos = [
  {
    _id: "photo_01",
    title: "Batch 1 Orientation & Inaugural Assembly",
    caption: "The inaugural cohort of ISEP interns seated in the central auditorium during the program introduction and welcome address.",
    album: "Events",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnGFsxuUEgPMT-1nTjkr8ecDrLhMzrkOXj5BdfpAJZyGZLJsQwxEzk9_-7IWePygDk7YFNa6upKyYRQnYwtsfRQ_uSbZ9nmRjCylLphJgQMkejf3pwPV44740DeIvauemfz4l6PsrGWMT5LtdDy8Be1sbfereD9ATAB24w80bCrUiNwBRdWtx2t0q9ZYB8l-Eccx2Wq9c0PtorLtTPYtoxIBlADl1f-3XjV8kU885dZNEWdE8S3-kAlg",
    uploadedAt: new Date("2026-02-01")
  },
  {
    _id: "photo_02",
    title: "Advanced System Architecture Masterclass",
    caption: "Technical mentors walking interns through scalable microservices and database clustering during an intensive workshop.",
    album: "Sessions",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiBS25tPuj9i3_t-KenHJ5EgI8Yh9EgEXuD0nY0nG4shH8dUrah2yvlof8d101LE09fteuiYoB3NDm50yYd9fzGPzKAvXwfRsiWzVEeYEOevLgSHuEjNdzzNPIDunFBmz2drv3ZSZgX2LyYlfqUII6YoEFmecn6ke5-Syzhx99UfSG981cH8J9RNrOlZDQjZKjuAZQUKe2sRsGfejRZOzi0W1qSVpLzoB5Ozplrls-Cb5jExoix_drIw",
    uploadedAt: new Date("2026-03-15")
  },
  {
    _id: "photo_03",
    title: "Collaborative Sprint: Team 'Delta Zero'",
    caption: "Interns pair-programming in the open lab spaces to deliver their mid-term project milestones.",
    album: "Team Activities",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC1vMY8n2bw1Qw7HNBjUVHpq9P9fg6VsIbzgusRUW6jwt5qJXBOhASO1hD2IIHeS5_2_NPKH1ucpGv-MbcYXlFiqNM6unDXCXl9HQEbxo-CJmxmN_FLWs55xUcqry0IpRsKqPmWolN0p9X-YXBDxyT4LzDsC77F9T3vdGBS4ePz-RdBj8YQ_bs8zC2ra_Zc89fKywG9ZoR1qhQJxQ_24sHhs-_p4juUAb3wsmda4DA_bvN8teqpWNIRw",
    uploadedAt: new Date("2026-04-10")
  },
  {
    _id: "photo_04",
    title: "ISEP 48-Hour Innovation Hackathon",
    caption: "High-energy coding round as Batch 1 teams formulate and build solutions for community challenges.",
    album: "Events",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVgIvn4O92N1RlfavwDm0nN4hKjai98xDvpzOYWd4g2pBkU44XMwM4LLGstw5JBov2_P-s0V0ht8gHTQE2IbyZZO_BlzOkh8oz9Ik0h2Ctm7iIdQpEsf0NBlf86u6RIMXVxKk8kcSoMpsz9og2VcX_JLgQF-HinCG7f-00oLPJgwj8N42KxGRISZEGG9yCmnZWOCOQebuTuNY6jZbuQipKl1J0b6033Q4CZscpOzEotQLJkVeqzzxVaw",
    uploadedAt: new Date("2026-05-02")
  },
  {
    _id: "photo_05",
    title: "Inter-Team Synthesis & Peer Review",
    caption: "Batch 1 interns and coordinators gathering in the quadrangle for a peer-review and cross-track retrospective.",
    album: "Team Activities",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-KxKT73pA8yGKM4XBTMDvT_uD3zGxPedZ_-FaZimEv3GbTc8mfQLUTE_pRHRvnMDTYvIy1vP99rWnE4q8cKar0N34ty31hD9hDcFFTQPmRtW7zG7qteTEbAajas5Jhf8Sx2FUa-oEa1pU_Chy9rPg4tqFi3Ueb2-5179q8Mf2S0wlTl9jNjN-QuYrdKOBzJwO9wPIlfBU2r1DQV3BTlYs5vxnCN-TFd4quFyvG1JRTKjiTi5H0GbJEg",
    uploadedAt: new Date("2026-05-12")
  },
  {
    _id: "photo_06",
    title: "Final Capstone Exhibitions & Valedictory Ceremony",
    caption: "The graduation and certificate awarding ceremony celebrating the successful completion of the ISEP Batch 1 residency.",
    album: "Events",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjyx46zzN-Ans78h04_TYwlCp7ynTyoVJJWFBs3S7M1AxCtIQfUVpsyHn2_nR7Z-yWBrJqWMWIdulYTDn9smHH_2GxIoAHTyDWIJKN-Ct8jOdpbv1WD09VIBEGRtAlj8zxiB__zSUTAryd_hWRc2699pQUdY4tDQe4qzF1rGG6B-XJD3XEvJ4KrU2M198uG6-1vHtHEEVK9Q1_9TX5vCxFMjD3j_2JcRVhRzOO6ZNaka03kfbncbiimQ",
    uploadedAt: new Date("2026-06-28")
  }
];

/**
 * @route   GET /api/photos
 * @desc    Get all photos (optional filter by album)
 * @access  Public (View-only protection)
 */
router.get('/', async (req, res) => {
  try {
    const { album } = req.query;
    let query = {};
    if (album && album !== 'All') {
      query.album = album;
    }

    try {
      const photos = await Photo.find(query).sort({ uploadedAt: -1 });
      if (photos && photos.length > 0) {
        return res.json({ success: true, count: photos.length, data: photos });
      }
    } catch (e) {
      // Fallback
    }

    let filtered = [...fallbackPhotos];
    if (album && album !== 'All') {
      filtered = filtered.filter(p => p.album.toLowerCase() === album.toLowerCase());
    }

    return res.json({ success: true, count: filtered.length, data: filtered });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/photos
 * @desc    Upload single or bulk photo
 * @access  Admin
 */
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { title, caption, album, imageUrl } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Photo title is required.' });
    }

    // In a production setup, req.file would be uploaded to Cloudinary
    const finalImageUrl = imageUrl || (req.file ? `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}` : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnGFsxuUEgPMT-1nTjkr8ecDrLhMzrkOXj5BdfpAJZyGZLJsQwxEzk9_-7IWePygDk7YFNa6upKyYRQnYwtsfRQ_uSbZ9nmRjCylLphJgQMkejf3pwPV44740DeIvauemfz4l6PsrGWMT5LtdDy8Be1sbfereD9ATAB24w80bCrUiNwBRdWtx2t0q9ZYB8l-Eccx2Wq9c0PtorLtTPYtoxIBlADl1f-3XjV8kU885dZNEWdE8S3-kAlg');

    const newPhotoData = {
      title: title.trim(),
      caption: caption || '',
      album: album || 'Events',
      imageUrl: finalImageUrl,
      uploadedAt: new Date()
    };

    try {
      const created = await Photo.create(newPhotoData);
      return res.status(201).json({ success: true, data: created });
    } catch (dbErr) {
      const mockCreated = { _id: 'photo_' + Date.now(), ...newPhotoData };
      fallbackPhotos.unshift(mockCreated);
      return res.status(201).json({ success: true, data: mockCreated });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   DELETE /api/photos/:id
 * @desc    Delete photo
 * @access  Admin
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Photo.findByIdAndDelete(id);
    } catch (e) {
      // Fallback in-memory
      fallbackPhotos = fallbackPhotos.filter(p => p._id !== id);
    }
    return res.json({ success: true, message: 'Photo removed from archive.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
