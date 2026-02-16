// API Configuration
const API_URL = 'http://localhost:5000/api';

// Auth Modal Functions
function openLoginModal() {
    document.getElementById('loginModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function openSignupModal() {
    document.getElementById('signupModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

function closeSignupModal() {
    document.getElementById('signupModal').classList.remove('show');
    document.body.style.overflow = 'auto';
}

function switchToSignup() {
    closeLoginModal();
    openSignupModal();
}

function switchToLogin() {
    closeSignupModal();
    openLoginModal();
}

// Get role from selected tab
function getSelectedRole() {
    const activeTab = document.querySelector('.role-tab.active');
    return activeTab ? activeTab.dataset.role : 'student';
}

// Login Handler
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const role = getSelectedRole();
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formData.get('email'),
                password: formData.get('password'),
                role: role
            })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            redirect(role);
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred. Please try again.');
    }
});

// Signup Handler
document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const role = getSelectedRole();
    
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                password: password,
                role: role
            })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            redirect(role);
        } else {
            alert(data.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('An error occurred. Please try again.');
    }
});

// Google OAuth Handlers
function handleGoogleLogin() {
    // Initialize Google Sign-In
    window.location.href = `${API_URL}/auth/google`;
}

function handleGoogleSignup() {
    // Initialize Google Sign-Up
    window.location.href = `${API_URL}/auth/google`;
}

// Redirect based on role
function redirect(role) {
    closeLoginModal();
    closeSignupModal();
    setTimeout(() => {
        window.location.href = `pages/dashboard-${role}.html`;
    }, 500);
}

// Check if user is logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return token && user;
}

// Load Courses
async function loadCourses() {
    try {
        const response = await fetch(`${API_URL}/courses`);
        const courses = await response.json();
        displayCourses(courses);
    } catch (error) {
        console.error('Error loading courses:', error);
    }
}

function displayCourses(courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    coursesGrid.innerHTML = '';

    courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.onclick = () => viewCourseDetails(course._id);
        courseCard.innerHTML = `
            <div class="course-image">${course.emoji || '📚'}</div>
            <div class="course-content">
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-footer">
                    <span class="course-price">Rs. ${course.price}</span>
                    <span class="course-badge">${course.category}</span>
                </div>
            </div>
        `;
        coursesGrid.appendChild(courseCard);
    });
}

function viewCourseDetails(courseId) {
    window.location.href = `pages/course-details.html?id=${courseId}`;
}

// Modal Close Handlers
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');

    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === signupModal) {
        closeSignupModal();
    }
};

document.getElementById('closeLogin')?.addEventListener('click', closeLoginModal);
document.getElementById('closeSignup')?.addEventListener('click', closeSignupModal);

// Button Click Handlers
document.getElementById('loginBtn')?.addEventListener('click', openLoginModal);
document.getElementById('signupBtn')?.addEventListener('click', openSignupModal);

// Role Tab Handler
document.querySelectorAll('.role-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const parent = e.target.parentElement;
        parent.querySelectorAll('.role-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
    });
});

// Hamburger Menu
document.getElementById('hamburger')?.addEventListener('click', () => {
    const menu = document.querySelector('.navbar-menu');
    menu.classList.toggle('show');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCourses();

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(err => 
            console.log('Service Worker registration failed:', err)
        );
    }
});
