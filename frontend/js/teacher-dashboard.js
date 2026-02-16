const API_URL = 'http://localhost:5000/api';

// Get current user
const user = JSON.parse(localStorage.getItem('user') || '{}');
const token = localStorage.getItem('token');

// Update greeting and username
function updateGreeting() {
    const hour = new Date().getHours();
    let timeGreeting = 'Morning';
    if (hour >= 12 && hour < 18) timeGreeting = 'Afternoon';
    if (hour >= 18) timeGreeting = 'Evening';

    document.getElementById('greeting-time').textContent = timeGreeting;
    document.getElementById('greeting-name').textContent = user.name || 'Teacher';
    document.getElementById('userName').textContent = user.name || 'User';
    document.getElementById('avatarTeacher').textContent = (user.name || 'T').charAt(0).toUpperCase();
    document.getElementById('profileName').value = user.name || '';
    document.getElementById('profileEmail').value = user.email || '';
}

// Show/Hide Sections
function showSection(sectionId) {
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.style.display = 'none';
    });

    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });

    document.getElementById(sectionId).style.display = 'block';

    if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Load Dashboard Data
async function loadDashboardData() {
    try {
        const response = await fetch(`${API_URL}/courses`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const courses = await response.json();

        const myCourses = courses.filter(c => c.instructor._id === user.id);
        const totalStudents = myCourses.reduce((sum, c) => sum + (c.enrolledCount || 0), 0);

        document.getElementById('activeCoursesCount').textContent = myCourses.length;
        document.getElementById('totalStudentsCount').textContent = totalStudents;

        loadMyCoursesSection(myCourses);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Load My Courses
function loadMyCoursesSection(courses) {
    const myCoursesGrid = document.getElementById('myCoursesGrid');
    myCoursesGrid.innerHTML = '';

    if (courses.length === 0) {
        myCoursesGrid.innerHTML = '<p>No courses created yet.</p>';
        return;
    }

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'dashboard-card';
        courseCard.innerHTML = `
            <h3 class="card-title">${course.title}</h3>
            <p style="color: var(--color-text-light); margin-bottom: var(--space-md);">Rs. ${course.price}</p>
            <div style="display: flex; justify-content: space-between;">
                <span style="color: var(--color-text-light);">👥 ${course.enrolledCount || 0} students</span>
                <button class="btn-secondary" onclick="editCourse('${course._id}')">Edit</button>
            </div>
        `;
        myCoursesGrid.appendChild(courseCard);
    });
}

// Create Course
document.getElementById('courseForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const courseData = {
        title: document.getElementById('courseTitle').value,
        description: document.getElementById('courseDescription').value,
        category: document.getElementById('courseCategory').value,
        price: parseInt(document.getElementById('coursePrice').value),
        duration: document.getElementById('courseDuration').value || '4 weeks',
        emoji: document.getElementById('courseEmoji').value || '📚',
        syllabus: document.getElementById('courseSyllabus').value.split(',').map(s => s.trim())
    };

    try {
        const response = await fetch(`${API_URL}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(courseData)
        });

        if (response.ok) {
            alert('Course created successfully!');
            document.getElementById('courseForm').reset();
            loadDashboardData();
            showSection('my-courses');
        } else {
            alert('Failed to create course');
        }
    } catch (error) {
        console.error('Error creating course:', error);
        alert('An error occurred');
    }
});

// Profile Update
document.getElementById('profileForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', document.getElementById('profileName').value);
    formData.append('phone', document.getElementById('profilePhone').value);
    formData.append('address', document.getElementById('profileAddress').value);

    const photoFile = document.getElementById('profilePhoto').files[0];
    if (photoFile) {
        if (photoFile.size > 200 * 1024) {
            alert('Photo must be less than 200KB');
            return;
        }
        formData.append('photo', photoFile);
    }

    try {
        const response = await fetch(`${API_URL}/student/profile`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });

        if (response.ok) {
            alert('Profile updated successfully!');
            const updatedUser = await response.json();
            localStorage.setItem('user', JSON.stringify(updatedUser));
            updateGreeting();
        }
    } catch (error) {
        console.error('Error updating profile:', error);
    }
});

// Edit Course
function editCourse(courseId) {
    alert('Edit course feature - coming soon!');
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
}

// Check Authentication
function checkAuth() {
    if (!token || !user) {
        window.location.href = '../index.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateGreeting();
    loadDashboardData();
});
