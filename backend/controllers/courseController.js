const Course = require('../models/Course');
const CourseContent = require('../models/CourseContent');

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true })
            .populate('instructor', 'name email')
            .limit(20);

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name email');

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create course (Teacher)
exports.createCourse = async (req, res) => {
    try {
        const { title, description, category, price, emoji, syllabus, duration } = req.body;

        const course = new Course({
            title,
            description,
            category,
            price,
            emoji,
            syllabus: syllabus || [],
            duration: duration || '4 weeks',
            instructor: req.userId,
            isPublished: false
        });

        await course.save();

        res.status(201).json({
            message: 'Course created successfully',
            course
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update course (Teacher)
exports.updateCourse = async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.instructor.toString() !== req.userId && req.userRole !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.json({
            message: 'Course updated successfully',
            course
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete course (Teacher)
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (course.instructor.toString() !== req.userId && req.userRole !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await Course.findByIdAndDelete(req.params.id);

        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
