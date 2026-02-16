const express = require('express');
const courseController = require('../controllers/courseController');
const { auth, teacherAuth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all courses (Public)
router.get('/', courseController.getAllCourses);

// Get course by ID (Public)
router.get('/:id', courseController.getCourseById);

// Create course (Teacher)
router.post('/', auth, teacherAuth, courseController.createCourse);

// Update course (Teacher)
router.put('/:id', auth, teacherAuth, courseController.updateCourse);

// Delete course (Teacher)
router.delete('/:id', auth, teacherAuth, courseController.deleteCourse);

module.exports = router;
