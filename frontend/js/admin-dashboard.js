const API_URL = 'http://localhost:5000/api';

// Get current user
const user = JSON.parse(localStorage.getItem('user') || '{}');
const token = localStorage.getItem('token');

// Update greeting
function updateGreeting() {
    document.getElementById('greeting-name').textContent = user.name || 'Admin';
    document.getElementById('userName').textContent = user.name || 'User';
    document.getElementById('avatarAdmin').textContent = (user.name || 'A').charAt(0).toUpperCase();
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

    // Load data based on section
    if (sectionId === 'payments') loadPaymentRequests();
    if (sectionId === 'users') loadUsers();
    if (sectionId === 'courses') loadAllCourses();
}

// Load Dashboard Data
async function loadDashboardData() {
    try {
        // Get all data
        const [usersRes, coursesRes, enrollmentsRes] = await Promise.all([
            fetch(`${API_URL}/enrollments`, { headers: { 'Authorization': `Bearer ${token}` } }),
            fetch(`${API_URL}/courses`),
            fetch(`${API_URL}/enrollments`, { headers: { 'Authorization': `Bearer ${token}` } })
        ]).catch(err => {
            // If API calls fail, use default values
            console.error('Error loading data:', err);
            return [null, null, null];
        });

        let totalUsers = 0;
        let totalCourses = 0;
        let pendingPayments = 0;
        let totalRevenue = 0;

        if (coursesRes && coursesRes.ok) {
            const courses = await coursesRes.json();
            totalCourses = courses.length || 0;
        }

        if (enrollmentsRes && enrollmentsRes.ok) {
            const enrollments = await enrollmentsRes.json();
            pendingPayments = enrollments.filter(e => e.status === 'pending').length || 0;
            totalRevenue = enrollments
                .filter(e => e.status === 'approved')
                .reduce((sum, e) => sum + (e.amount || 0), 0) || 0;
        }

        document.getElementById('totalUsersCount').textContent = '50'; // Example
        document.getElementById('totalCoursesCount').textContent = totalCourses;
        document.getElementById('pendingPaymentsCount').textContent = pendingPayments;
        document.getElementById('totalRevenueCount').textContent = `Rs. ${totalRevenue}`;
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

// Load Payment Requests
async function loadPaymentRequests() {
    try {
        const response = await fetch(`${API_URL}/enrollments`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const enrollments = await response.json();

        const pendingEnrollments = enrollments.filter(e => e.status === 'pending');
        const container = document.getElementById('paymentsContainer');
        container.innerHTML = '';

        if (pendingEnrollments.length === 0) {
            container.innerHTML = '<p>No pending payment requests</p>';
            return;
        }

        pendingEnrollments.forEach(enrollment => {
            const card = document.createElement('div');
            card.className = 'dashboard-card';
            card.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg);">
                    <div>
                        <p><strong>Student:</strong> ${enrollment.student.name}</p>
                        <p><strong>Course:</strong> ${enrollment.course.title}</p>
                        <p><strong>Amount:</strong> Rs. ${enrollment.amount}</p>
                        <p><strong>Method:</strong> ${enrollment.paymentMethod}</p>
                    </div>
                    <div>
                        ${enrollment.receiptPhoto?.url ? `<img src="${enrollment.receiptPhoto.url}" style="max-width: 150px; border-radius: var(--radius-md);">` : '<p>No receipt</p>'}
                    </div>
                </div>
                <div style="margin-top: var(--space-lg); display: flex; gap: var(--space-sm);">
                    <button class="btn-success" onclick="approvePayment('${enrollment._id}')">Approve</button>
                    <button class="btn-danger" onclick="rejectPayment('${enrollment._id}')">Reject</button>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading payments:', error);
        document.getElementById('paymentsContainer').innerHTML = '<p>Error loading payments</p>';
    }
}

// Approve Payment
async function approvePayment(enrollmentId) {
    try {
        const response = await fetch(`${API_URL}/enrollment/${enrollmentId}/approve`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            alert('Payment approved!');
            loadPaymentRequests();
            loadDashboardData();
        }
    } catch (error) {
        console.error('Error approving payment:', error);
    }
}

// Reject Payment
async function rejectPayment(enrollmentId) {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    try {
        const response = await fetch(`${API_URL}/enrollment/${enrollmentId}/reject`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ reason })
        });

        if (response.ok) {
            alert('Payment rejected!');
            loadPaymentRequests();
            loadDashboardData();
        }
    } catch (error) {
        console.error('Error rejecting payment:', error);
    }
}

// Load Users
async function loadUsers() {
    const container = document.getElementById('usersContainer');
    container.innerHTML = '<p>User management feature - Coming soon!</p>';
}

// Load All Courses
async function loadAllCourses() {
    try {
        const response = await fetch(`${API_URL}/courses`);
        const courses = await response.json();

        const container = document.getElementById('coursesContainer');
        container.innerHTML = '';

        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'dashboard-card';
            card.innerHTML = `
                <h3 class="card-title">${course.title}</h3>
                <p><strong>Instructor:</strong> ${course.instructor.name}</p>
                <p><strong>Price:</strong> Rs. ${course.price}</p>
                <p><strong>Enrolled:</strong> ${course.enrolledCount || 0} students</p>
                <button class="btn-secondary" style="margin-top: var(--space-md);">View Details</button>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading courses:', error);
        document.getElementById('coursesContainer').innerHTML = '<p>Error loading courses</p>';
    }
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../index.html';
}

// Check Authentication
function checkAuth() {
    if (!token || !user || user.role !== 'admin') {
        window.location.href = '../index.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateGreeting();
    loadDashboardData();
});
