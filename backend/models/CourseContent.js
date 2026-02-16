const mongoose = require('mongoose');

const courseContentSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        enum: ['pdf', 'image', 'notes'],
        required: true
    },
    fileUrl: String,
    notes: String,
    isRestricted: {
        type: Boolean,
        default: false
    },
    allowDownload: {
        type: Boolean,
        default: false
    },
    allowScreenshot: {
        type: Boolean,
        default: false
    },
    orderNumber: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('CourseContent', courseContentSchema);
