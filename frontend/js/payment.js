const API_URL = 'http://localhost:5000/api';
const courseId = new URLSearchParams(window.location.search).get('courseId');
const user = JSON.parse(localStorage.getItem('user') || '{}');
const token = localStorage.getItem('token');

let courseData = {};

// Load Course Data
async function loadCourseData() {
    try {
        const response = await fetch(`${API_URL}/courses/${courseId}`);
        courseData = await response.json();

        document.getElementById('summaryCourseName').textContent = courseData.title;
        document.getElementById('summaryPrice').textContent = `Rs. ${courseData.price}`;
        document.getElementById('summaryTotal').textContent = `Rs. ${courseData.price}`;
        document.getElementById('studentName').value = user.name || '';
        document.getElementById('studentEmail').value = user.email || '';
    } catch (error) {
        console.error('Error loading course data:', error);
    }
}

// Payment Method Selection
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        // Update payment method visual
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('active');
        });
        e.target.parentElement.classList.add('active');

        // Update QR display (in real app, would swap QR codes)
        const method = e.target.value;
        const qrEmojis = {
            bank: '🏦',
            esewa: '💳',
            khalti: '📱'
        };
        document.querySelector('.qr-code').textContent = qrEmojis[method] + ' QR Code';
    });
});

// Receipt File Upload
document.getElementById('receiptFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            alert('Receipt file must be less than 2MB');
            e.target.value = '';
            document.getElementById('fileName').textContent = 'No file selected';
            return;
        }
        document.getElementById('fileName').textContent = `✓ ${file.name}`;
    }
});

// Payment Form Submit
document.getElementById('paymentForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const receiptFile = document.getElementById('receiptFile').files[0];
    if (!receiptFile) {
        alert('Please upload payment receipt');
        return;
    }

    const formData = new FormData();
    formData.append('courseId', courseId);
    formData.append('paymentMethod', document.querySelector('input[name="paymentMethod"]:checked').value);
    formData.append('amount', courseData.price);
    formData.append('receiptPhoto', receiptFile);
    formData.append('studentPhone', document.getElementById('studentPhone').value);

    try {
        const response = await fetch(`${API_URL}/enrollment/create`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        });

        const data = await response.json();
        if (response.ok) {
            alert('Payment submitted! Waiting for admin approval.');
            setTimeout(() => {
                window.location.href = 'dashboard-student.html';
            }, 1500);
        } else {
            alert(data.message || 'Payment failed');
        }
    } catch (error) {
        console.error('Error submitting payment:', error);
        alert('An error occurred. Please try again.');
    }
});

// Check Auth
function checkAuth() {
    if (!token || !user) {
        window.location.href = '../index.html';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadCourseData();
});
