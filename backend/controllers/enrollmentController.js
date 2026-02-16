const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

// Create enrollment (Student)
exports.createEnrollment = async (req, res) => {
    try {
        const { courseId, paymentMethod, amount, studentPhone } = req.body;

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({
            student: req.userId,
            course: courseId,
            status: 'approved'
        });

        if (existingEnrollment) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        const enrollment = new Enrollment({
            student: req.userId,
            course: courseId,
            paymentMethod,
            amount,
            studentPhone,
            status: 'pending',
            receiptPhoto: {
                url: req.file ? `/uploads/${req.file.filename}` : null,
                size: req.file ? req.file.size : 0
            }
        });

        await enrollment.save();

        res.status(201).json({
            message: 'Enrollment request submitted. Awaiting admin approval.',
            enrollment
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get student enrollments
exports.getStudentEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.userId,
            status: 'approved'
        }).populate('course');

        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all enrollments (Admin)
exports.getAllEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate('student', 'name email')
            .populate('course', 'title price')
            .sort({ createdAt: -1 });

        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Approve enrollment (Admin)
exports.approveEnrollment = async (req, res) => {
    try {
        const enrollment = await Enrollment.findByIdAndUpdate(
            req.params.id,
            {
                status: 'approved',
                approvedBy: req.userId
            },
            { new: true }
        ).populate('student course');

        // Increment enrolled count
        await Course.findByIdAndUpdate(
            enrollment.course._id,
            { $inc: { enrolledCount: 1 } }
        );

        // Send email (simplified)
        console.log(`Approval email sent to ${enrollment.student.email}`);

        res.json({
            message: 'Enrollment approved',
            enrollment
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Reject enrollment (Admin)
exports.rejectEnrollment = async (req, res) => {
    try {
        const { reason } = req.body;

        const enrollment = await Enrollment.findByIdAndUpdate(
            req.params.id,
            {
                status: 'rejected',
                rejectionReason: reason,
                approvedBy: req.userId
            },
            { new: true }
        );

        res.json({
            message: 'Enrollment rejected',
            enrollment
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
