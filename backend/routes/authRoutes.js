const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Sign Up
router.post('/signup', authController.signup);

// Login
router.post('/login', authController.login);

// Google Auth
router.post('/google', authController.googleAuth);

module.exports = router;
