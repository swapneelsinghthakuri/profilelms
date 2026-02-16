# Quick Start Guide

## 1️⃣ Install Dependencies

```bash
# Backend setup
cd backend
npm install
```

## 2️⃣ Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create free account at mongodb.com/cloud
- Copy connection string
- Update `backend/.env`:
  ```
  MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/database?retryWrites=true&w=majority
  ```

## 3️⃣ Start Backend Server

```bash
# From backend folder
npm start
# or for development:
npm run dev
```

You should see:
```
✓ MongoDB connected
🚀 Server running on http://localhost:5000
```

## 4️⃣ Start Frontend Server

**Option A: Using http-server**
```bash
npm install -g http-server
cd frontend
http-server
```

**Option B: Using VS Code Live Server**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

**Option C: Using Python**
```bash
cd frontend
python -m http.server 3000
```

## 5️⃣ Test the Application

1. Open browser: **http://localhost:3000** (or port shown by your server)

2. **Create Test Accounts:**
   - Click "Sign Up"
   - Create Student account (email & password)
   - Create Teacher account
   - Create Admin account

3. **Test Student Flow:**
   - Login as Student
   - Click "Courses"
   - Click any course → "Enroll"
   - Go to dashboard

4. **Test Teacher Flow:**
   - Login as Teacher
   - Go to dashboard
   - Create a course
   - Set price and details

5. **Test Admin Flow:**
   - Login as Admin
   - View payment requests
   - Approve/reject enrollments

## 🔧 Common Tasks

### Create a Course via API
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TEACHER_TOKEN" \
  -d '{
    "title": "Web Development",
    "description": "Learn HTML, CSS, JavaScript",
    "category": "Programming",
    "price": 999,
    "emoji": "💻",
    "duration": "4 weeks",
    "syllabus": ["HTML Basics", "CSS Styling", "JavaScript DOM"]
  }'
```

### Login via API
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@example.com",
    "password": "password123",
    "role": "student"
  }'
```

## 📱 Test PWA Features

1. Open app in Chrome
2. Menu (⋮) → "Install app"
3. Or: Menu → "Create shortcut" → "Create"
4. App opens in standalone window

## 🐛 Debug Tips

**Check Backend Logs:**
- Look for errors in terminal where `npm start` is running

**Check Frontend Console:**
- Press F12 → Console tab
- Look for network errors or JS errors

**Check MongoDB Connection:**
```bash
# In terminal, run:
node
# Then:
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/portfolio-lms');
# If connected, no error will show
```

**Check if backend is running:**
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"Server is running"}
```

## 📝 Default Test Accounts

After running first time, create these accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| Student | student@test.com | test123 |
| Teacher | teacher@test.com | test123 |
| Admin | admin@test.com | test123 |

## 🎯 Next Steps

✅ Application is now running!

1. **Customize:** Edit CSS variables in `frontend/css/style.css`
2. **Add Users:** Create more test accounts
3. **Add Courses:** Create courses as teacher
4. **Test Payments:** Submit enrollment requests
5. **Approve/Reject:** Use admin dashboard
6. **Deploy:** See DEPLOYMENT.md

## 📞 Need Help?

- Check `README.md` for full documentation
- Check console (F12) for JavaScript errors
- Check terminal for backend errors
- Ensure both frontend AND backend are running
- Ensure MongoDB is running

---

**All set! Happy learning! 📚**
