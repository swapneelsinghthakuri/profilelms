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
    document.getElementById('greeting-name').textContent = user.name || 'Student';
    document.getElementById('userName').textContent = user.name || 'User';
    document.getElementById('avatarStudent').textContent = (user.name || 'S').charAt(0).toUpperCase();
    document.getElementById('profileName').value = user.name || '';
    document.getElementById('profileEmail').value = user.email || '';
}

// Show/Hide Sections
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.style.display = 'none';
    });

    // Remove active class from all links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).style.display = 'block';

    // Add active class to clicked link
    event.target.classList.add('active');
}

// Load Dashboard Data
async function loadDashboardData() {
    try {
        const response = await fetch(`${API_URL}/student/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        document.getElementById('enrolledCoursesCount').textContent = data.enrolledCourses || 0;
        document.getElementById('certificatesCount').textContent = data.certificates || 0;
        document.getElementById('totalSpent').textContent = `Rs. ${data.totalSpent || 0}`;

        loadMyCoursesSection(data.courses || []);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Load My Courses
function loadMyCoursesSection(courses) {
    const myCoursesGrid = document.getElementById('myCoursesGrid');
    myCoursesGrid.innerHTML = '';

    if (courses.length === 0) {
        myCoursesGrid.innerHTML = '<p>No courses enrolled yet.</p>';
        return;
    }

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'dashboard-card';
        courseCard.innerHTML = `
            <h3 class="card-title">${course.title}</h3>
            <p style="color: var(--color-text-light); margin-bottom: var(--space-md);">${course.description || 'No description'}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="color: var(--color-text-light);">Progress: ${course.progress || 0}%</span>
                <button class="btn-primary" onclick="viewCourse('${course._id}')">Continue</button>
            </div>
        `;
        myCoursesGrid.appendChild(courseCard);
    });
}

// Profile Form Submit
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
        } else {
            alert('Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred');
    }
});

// Go to Explore Courses
function goToExploreCourses() {
    window.location.href = '../index.html#courses';
}

// View Course
function viewCourse(courseId) {
    window.location.href = `course-details.html?id=${courseId}`;
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
