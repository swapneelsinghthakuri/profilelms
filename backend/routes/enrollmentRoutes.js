const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const { auth, adminAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Create enrollment (Student)
router.post('/create', auth, upload.single('receiptPhoto'), enrollmentController.createEnrollment);

// Get student enrollments
router.get('/my-enrollments', auth, enrollmentController.getStudentEnrollments);

// Get all enrollments (Admin)
router.get('/', auth, adminAuth, enrollmentController.getAllEnrollments);

// Approve enrollment (Admin)
router.put('/:id/approve', auth, adminAuth, enrollmentController.approveEnrollment);

// Reject enrollment (Admin)
router.put('/:id/reject', auth, adminAuth, enrollmentController.rejectEnrollment);

module.exports = router;
