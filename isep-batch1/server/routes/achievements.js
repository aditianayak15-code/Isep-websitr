const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const auth = require('../middleware/auth');

let fallbackAchievements = [
  {
    _id: "ach_01",
    title: "Cohort Induction & Program Kickoff",
    description: "Orientation of the first batch of ISEP interns, laying down technical tracks, project standards, and mentorship alignments.",
    date: new Date("2026-02-01"),
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC1vMY8n2bw1Qw7HNBjUVHpq9P9fg6VsIbzgusRUW6jwt5qJXBOhASO1hD2IIHeS5_2_NPKH1ucpGv-MbcYXlFiqNM6unDXCXl9HQEbxo-CJmxmN_FLWs55xUcqry0IpRsKqPmWolN0p9X-YXBDxyT4LzDsC77F9T3vdGBS4ePz-RdBj8YQ_bs8zC2ra_Zc89fKywG9ZoR1qhQJxQ_24sHhs-_p4juUAb3wsmda4DA_bvN8teqpWNIRw"
  },
  {
    _id: "ach_02",
    title: "Technical Mastery Sprints",
    description: "Completion of intensive workshops spanning modern web systems, database design, and cloud architecture with 100% participation.",
    date: new Date("2026-03-15"),
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVgIvn4O92N1RlfavwDm0nN4hKjai98xDvpzOYWd4g2pBkU44XMwM4LLGstw5JBov2_P-s0V0ht8gHTQE2IbyZZO_BlzOkh8oz9Ik0h2Ctm7iIdQpEsf0NBlf86u6RIMXVxKk8kcSoMpsz9og2VcX_JLgQF-HinCG7f-00oLPJgwj8N42KxGRISZEGG9yCmnZWOCOQebuTuNY6jZbuQipKl1J0b6033Q4CZscpOzEotQLJkVeqzzxVaw"
  },
  {
    _id: "ach_03",
    title: "48-Hour Innovation Hackathon",
    description: "Interns built six functional, high-impact software solutions with live mentor evaluation and deployment.",
    date: new Date("2026-04-10"),
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAiBS25tPuj9i3_t-KenHJ5EgI8Yh9EgEXuD0nY0nG4shH8dUrah2yvlof8d101LE09fteuiYoB3NDm50yYd9fzGPzKAvXwfRsiWzVEeYEOevLgSHuEjNdzzNPIDunFBmz2drv3ZSZgX2LyYlfqUII6YoEFmecn6ke5-Syzhx99UfSG981cH8J9RNrOlZDQjZKjuAZQUKe2sRsGfejRZOzi0W1qSVpLzoB5Ozplrls-Cb5jExoix_drIw"
  },
  {
    _id: "ach_04",
    title: "Final Capstone Project Defenses",
    description: "All project teams successfully presented their capstone systems to the evaluation committee, receiving full certification clearance.",
    date: new Date("2026-06-20"),
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnGFsxuUEgPMT-1nTjkr8ecDrLhMzrkOXj5BdfpAJZyGZLJsQwxEzk9_-7IWePygDk7YFNa6upKyYRQnYwtsfRQ_uSbZ9nmRjCylLphJgQMkejf3pwPV44740DeIvauemfz4l6PsrGWMT5LtdDy8Be1sbfereD9ATAB24w80bCrUiNwBRdWtx2t0q9ZYB8l-Eccx2Wq9c0PtorLtTPYtoxIBlADl1f-3XjV8kU885dZNEWdE8S3-kAlg"
  },
  {
    _id: "ach_05",
    title: "Valedictory & Program Graduation",
    description: "Formal closure of Batch 1 residency, celebrating the achievements of all interns and establishing the alumni network.",
    date: new Date("2026-06-28"),
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsRBkVSLcdvZ0CXxHzKueZ4m08aSw2H01QwDt2CclRN38JYu_WX84j85oLmDai1nC2A6eZMh_fcOZYQQxtP1oTFo-hbulwMAm_YdCYNjqlg7GHyxoGw3daSkpmx2WkRxmXWKkcZ6ocAyzhPbZso-osfausmsoAXMXDi-yxT_9bIi2sYCnZtdT5xLdVPnCc1QpxW5zsDj2veYcPMSsfZzNDJIk0lrG-ChjsJjKkmBoNvqeo2NZTKe5dKQ"
  }
];

/**
 * @route   GET /api/achievements
 * @desc    List all achievements/milestones
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    try {
      const achievements = await Achievement.find().sort({ date: 1 });
      if (achievements && achievements.length > 0) {
        return res.json({ success: true, count: achievements.length, data: achievements });
      }
    } catch (e) {}

    return res.json({ success: true, count: fallbackAchievements.length, data: fallbackAchievements });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   POST /api/achievements
 * @desc    Add milestone/achievement
 * @access  Admin
 */
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, date, imageUrl } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }

    const achData = {
      title: title.trim(),
      description: description.trim(),
      date: date ? new Date(date) : new Date(),
      imageUrl: imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC1vMY8n2bw1Qw7HNBjUVHpq9P9fg6VsIbzgusRUW6jwt5qJXBOhASO1hD2IIHeS5_2_NPKH1ucpGv-MbcYXlFiqNM6unDXCXl9HQEbxo-CJmxmN_FLWs55xUcqry0IpRsKqPmWolN0p9X-YXBDxyT4LzDsC77F9T3vdGBS4ePz-RdBj8YQ_bs8zC2ra_Zc89fKywG9ZoR1qhQJxQ_24sHhs-_p4juUAb3wsmda4DA_bvN8teqpWNIRw'
    };

    try {
      const created = await Achievement.create(achData);
      return res.status(201).json({ success: true, data: created });
    } catch (dbErr) {
      const mockCreated = { _id: 'ach_' + Date.now(), ...achData };
      fallbackAchievements.push(mockCreated);
      return res.status(201).json({ success: true, data: mockCreated });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @route   DELETE /api/achievements/:id
 * @desc    Delete achievement
 * @access  Admin
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Achievement.findByIdAndDelete(id);
    } catch (e) {
      fallbackAchievements = fallbackAchievements.filter(a => a._id !== id);
    }
    return res.json({ success: true, message: 'Achievement deleted.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
