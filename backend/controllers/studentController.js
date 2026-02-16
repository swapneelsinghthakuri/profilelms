const User = require('../models/User');
const Enrollment = require('../models/Enrollment');

// Get student dashboard data
exports.getDashboardData = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.userId,
            status: 'approved'
        }).populate('course');

        const totalSpent = enrollments.reduce((sum, e) => sum + e.amount, 0);

        res.json({
            enrolledCourses: enrollments.length,
            certificates: 0, // Can be extended
            totalSpent,
            courses: enrollments.map(e => ({
                _id: e.course._id,
                title: e.course.title,
                description: e.course.description,
                progress: e.progress
            }))
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update student profile
exports.updateProfile = async (req, res) => {
    try {
        const { name, phone, address } = req.body;

        let updateData = { name, phone, address };

        if (req.file) {
            updateData.profilePhoto = {
                url: `/uploads/${req.file.filename}`,
                size: req.file.size
            };
        }

        const user = await User.findByIdAndUpdate(
            req.userId,
            updateData,
            { new: true }
        );

        res.json({
            message: 'Profile updated successfully',
            user
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
