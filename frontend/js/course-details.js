const API_URL = 'http://localhost:5000/api';

// Get course ID from URL
const courseId = new URLSearchParams(window.location.search).get('id');

// Load Course Details
async function loadCourseDetails() {
    try {
        const response = await fetch(`${API_URL}/courses/${courseId}`);
        const course = await response.json();
        displayCourseDetails(course);
    } catch (error) {
        console.error('Error loading course details:', error);
        document.querySelector('.course-details-container').innerHTML = '<p>Error loading course details</p>';
    }
}

function displayCourseDetails(course) {
    document.getElementById('courseEmoji').textContent = course.emoji || '📚';
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseCategory').textContent = course.category;
    document.getElementById('courseDescription').textContent = course.description;
    document.getElementById('courseInstructor').textContent = course.instructor;
    document.getElementById('courseDuration').textContent = course.duration || '4 weeks';
    document.getElementById('enrolledCount').textContent = course.enrolledCount || 0;
    document.getElementById('coursePrice').textContent = course.price;

    // Display Syllabus
    const syllabusContainer = document.getElementById('courseSyllabus');
    if (course.syllabus && course.syllabus.length > 0) {
        syllabusContainer.innerHTML = course.syllabus.map((item, index) => `
            <div class="syllabus-item">
                <strong>Module ${index + 1}:</strong> ${item}
            </div>
        `).join('');
    }

    // Store course data for enrollment
    window.courseData = course;
}

// Enroll Handler
document.getElementById('enrollBtn')?.addEventListener('click', () => {
    const user = localStorage.getItem('user');
    if (!user) {
        // Redirect to login
        window.location.href = '../index.html#courses';
    } else {
        // Redirect to payment page
        window.location.href = `payment.html?courseId=${courseId}`;
    }
});

// Profile Button
document.getElementById('profileBtn')?.addEventListener('click', () => {
    window.location.href = 'profile.html';
});

// Check authentication
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        document.getElementById('profileBtn').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block';
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCourseDetails();
    checkAuth();
});
