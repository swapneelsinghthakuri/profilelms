# Portfolio LMS - Complete Learning Management System

A modern, fully responsive Learning Management System built with **HTML, CSS, JavaScript, Node.js, and MongoDB**.

## 📋 Features

### General
- ✅ Clean, premium, smooth UI/UX
- ✅ Fully responsive (Mobile, Tablet, Desktop, iPhone)
- ✅ PWA Support (Add to Home Screen / WebView compatible)
- ✅ CSS Root Variables for consistent theming
- ✅ Soft animations and transitions

### Authentication
- ✅ Email Sign Up / Sign In
- ✅ Google OAuth Integration (ready to configure)
- ✅ Role-based access (Student, Teacher, Admin)
- ✅ Secure password hashing with bcrypt
- ✅ JWT token-based authentication

### Profiles
- ✅ Student and Teacher profiles
- ✅ Profile photo upload (Max 200KB, auto-compress)
- ✅ Name, Contact, Address, Email
- ✅ MongoDB storage

### Courses
- ✅ Course cards with image/emoji, title, description, price
- ✅ Course details page with syllabus
- ✅ Teacher course creation and management
- ✅ Course enrollment system
- ✅ Prevent unauthorized access to content

### Enrollment & Payment
- ✅ Multiple payment methods (Bank QR, eSewa, Khalti)
- ✅ Payment receipt upload (Max 2MB)
- ✅ Admin approval workflow
- ✅ Automatic enrollment on approval
- ✅ Send confirmation email (configurable)

### Dashboards
- ✅ Student Dashboard: My Courses, Certificates, Payment History, Profile
- ✅ Teacher Dashboard: Upload Courses, Manage Content, Student Stats
- ✅ Admin Dashboard: Payment requests, User management, Course moderation
- ✅ Dynamic time-based greetings
- ✅ Stats and analytics

### Security
- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Input validation
- ✅ CORS protection
- ✅ File upload restrictions

---

## 📁 Project Structure

```
portfolio-lms/
├── frontend/
│   ├── index.html                 # Landing page
│   ├── manifest.json              # PWA manifest
│   ├── sw.js                      # Service Worker
│   ├── css/
│   │   └── style.css              # All styling with CSS variables
│   ├── js/
│   │   ├── app.js                 # Main app logic & auth modals
│   │   ├── course-details.js      # Course details page
│   │   ├── payment.js             # Payment page
│   │   ├── student-dashboard.js   # Student dashboard
│   │   ├── teacher-dashboard.js   # Teacher dashboard
│   │   └── admin-dashboard.js     # Admin dashboard
│   ├── pages/
│   │   ├── course-details.html    # Course details page
│   │   ├── payment.html           # Payment page
│   │   ├── dashboard-student.html # Student dashboard
│   │   ├── dashboard-teacher.html # Teacher dashboard
│   │   └── dashboard-admin.html   # Admin dashboard
│   └── assets/
│       ├── favicon.png            # (Optional: Add favicon)
│       ├── hero-image.png         # (Optional: Add hero image)
│       └── icon-192.png           # (Optional: PWA icons)
│
├── backend/
│   ├── server.js                  # Main Express server
│   ├── .env                       # Environment variables
│   ├── package.json               # Dependencies
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Course.js              # Course schema
│   │   ├── Enrollment.js          # Enrollment schema
│   │   └── CourseContent.js       # Course content schema
│   ├── controllers/
│   │   ├── authController.js      # Auth logic
│   │   ├── courseController.js    # Course logic
│   │   ├── enrollmentController.js# Enrollment & payment logic
│   │   └── studentController.js   # Student dashboard data
│   ├── routes/
│   │   ├── authRoutes.js          # Auth endpoints
│   │   ├── courseRoutes.js        # Course endpoints
│   │   ├── enrollmentRoutes.js    # Enrollment endpoints
│   │   └── studentRoutes.js       # Student endpoints
│   ├── middleware/
│   │   ├── auth.js                # Auth middleware
│   │   └── upload.js              # File upload middleware
│   └── uploads/                   # User uploads (photos, receipts)
│
└── README.md                       # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables (.env):**
   ```
   MONGO_URI=mongodb://localhost:27017/portfolio-lms
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

5. **Start backend server:**
   ```bash
   npm start
   # Or for development with auto-reload:
   npm run dev
   ```

   Server runs at: `http://localhost:5000`

### Frontend Setup

1. **No build process needed!** Frontend runs directly in browser.

2. **Serve frontend** (use any static server):
   ```bash
   # Using Node.js http-server
   npm install -g http-server
   cd frontend
   http-server
   ```

   Or use VS Code Live Server extension.

3. Access at: `http://localhost:3000` (or shown by your server)

---

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth

### Courses
- `GET /api/courses` - Get all courses (public)
- `GET /api/courses/:id` - Get course details (public)
- `POST /api/courses` - Create course (teacher)
- `PUT /api/courses/:id` - Update course (teacher)
- `DELETE /api/courses/:id` - Delete course (teacher)

### Enrollment
- `POST /api/enrollment/create` - Create enrollment request
- `GET /api/enrollment/my-enrollments` - Get student's enrollments
- `GET /api/enrollment` - Get all enrollments (admin)
- `PUT /api/enrollment/:id/approve` - Approve enrollment (admin)
- `PUT /api/enrollment/:id/reject` - Reject enrollment (admin)

### Student
- `GET /api/student/dashboard` - Get dashboard data
- `POST /api/student/profile` - Update profile

---

## 🔐 Testing Authentication

### Create Test Users

Use Postman or cURL to create users:

```bash
# Student Sign Up
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Student",
    "email": "student@example.com",
    "password": "password123",
    "role": "student"
  }'

# Teacher Sign Up
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Teacher",
    "email": "teacher@example.com",
    "password": "password123",
    "role": "teacher"
  }'

# Admin Sign Up
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }'
```

---

## 🎨 Customization

### Theme Colors

Edit CSS variables in `frontend/css/style.css`:

```css
:root {
    --color-primary: #2563eb;
    --color-primary-dark: #1e40af;
    --color-primary-light: #dbeafe;
    /* ... more variables ... */
}
```

### Database Configuration

Update MongoDB connection in `backend/.env`:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

### Email Setup (Optional)

For automatic email notifications, update `backend/.env`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

---

## 📱 PWA Features

The application includes PWA support:
- ✅ Service Worker for offline functionality
- ✅ Web App Manifest for "Add to Home Screen"
- ✅ Responsive design
- ✅ WebView compatible

To test PWA:
1. Open app in Chrome/Edge
2. Click menu → "Install app" or "Add to Home Screen"
3. App installs as standalone application

---

## 🔒 Security Notes

⚠️ **Before Production:**

1. **Update JWT_SECRET** in `.env` with a strong, random key
2. **Enable HTTPS** - Use SSL/TLS certificates
3. **Set secure CORS** - Update allowed origins
4. **Setup environment-specific configs** - Different .env for dev/prod
5. **Enable MongoDB authentication** - Add username/password
6. **Rate limiting** - Add express-rate-limit
7. **Input validation** - Use joi or validator.js
8. **Content Security Policy** - Add CSP headers
9. **Generate Google OAuth credentials** - Setup OAuth in Google Console
10. **Setup email service** - Configure Nodemailer for emails

---

## 📚 Usage Flow

### For Students
1. Sign up as Student
2. Browse courses on home page
3. Click course → View details
4. Click "Enroll Now"
5. Upload payment receipt
6. Wait for admin approval
7. Access dashboard → "My Courses"

### For Teachers
1. Sign up as Teacher
2. Go to Teacher Dashboard
3. Create course with details
4. Course appears in student list
5. View student enrollments
6. Track earnings

### For Admins
1. Sign up as Admin (first user)
2. Go to Admin Dashboard
3. View pending payment requests
4. Approve or reject enrollments
5. View user and course statistics

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
✗ MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service or update MONGO_URI in .env

### CORS Error
```
Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Update `backend/server.js` CORS origin with your frontend URL

### File Upload Not Working
**Solution:** Ensure `backend/uploads/` directory exists and has write permissions

### Service Worker Not Registering
**Solution:** Make sure your app is served over HTTPS (required for PWA)

---

## 📝 File Upload Limits

- Profile Photo: 200KB max
- Payment Receipt: 2MB max
- Supported formats: JPG, PNG, GIF, PDF

---

## 🎯 Future Enhancements

- [ ] Video course support
- [ ] Live class integration
- [ ] Quiz and assignments
- [ ] Certificate PDF generation
- [ ] Advanced analytics dashboard
- [ ] Notification system
- [ ] Wishlist feature
- [ ] Course reviews and ratings
- [ ] Social features (discussion forum)
- [ ] Mobile native app (React Native)

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Support

For issues, questions, or feature requests, please create an issue in the repository.

---

## ✨ Key Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt
- **File Upload:** Multer
- **Image Processing:** Sharp
- **Email:** Nodemailer (configurable)
- **PWA:** Service Workers, Web App Manifest
- **Security:** CORS, input validation

**Read-y to deploy! 🚀**
