const express = require('express');
const studentController = require('../controllers/studentController');
const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Get dashboard data
router.get('/dashboard', auth, studentController.getDashboardData);

// Update profile
router.post('/profile', auth, upload.single('photo'), studentController.updateProfile);

module.exports = router;
