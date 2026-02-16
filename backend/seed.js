const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Course = require('./models/Course');

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('✓ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Course.deleteMany({});
        console.log('✓ Cleared existing data');

        // Create admin user
        const admin = new User({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin'
        });
        await admin.save();
        console.log('✓ Created admin user');

        // Create teacher user
        const teacher = new User({
            name: 'John Teacher',
            email: 'teacher@example.com',
            password: 'teacher123',
            role: 'teacher'
        });
        await teacher.save();
        console.log('✓ Created teacher user');

        // Create student users
        const student1 = new User({
            name: 'Alice Student',
            email: 'student1@example.com',
            password: 'student123',
            role: 'student'
        });
        await student1.save();

        const student2 = new User({
            name: 'Bob Student',
            email: 'student2@example.com',
            password: 'student123',
            role: 'student'
        });
        await student2.save();
        console.log('✓ Created 2 student users');

        // Create sample courses
        const courses = [
            {
                title: 'Web Development Fundamentals',
                description: 'Learn HTML, CSS, and JavaScript from scratch',
                category: 'Programming',
                price: 1999,
                emoji: '💻',
                instructor: teacher._id,
                duration: '4 weeks',
                syllabus: [
                    'HTML Basics',
                    'CSS Styling',
                    'JavaScript Fundamentals',
                    'DOM Manipulation',
                    'Responsive Design'
                ],
                isPublished: true,
                enrolledCount: 5
            },
            {
                title: 'Advanced JavaScript',
                description: 'Master ES6+, async programming, and design patterns',
                category: 'Programming',
                price: 2499,
                emoji: '🔧',
                instructor: teacher._id,
                duration: '6 weeks',
                syllabus: [
                    'ES6+ Features',
                    'Promises & Async/Await',
                    'Design Patterns',
                    'Testing',
                    'Performance Optimization'
                ],
                isPublished: true,
                enrolledCount: 3
            },
            {
                title: 'Digital Marketing Basics',
                description: 'Learn SEO, SEM, and social media marketing',
                category: 'Marketing',
                price: 1499,
                emoji: '📱',
                instructor: teacher._id,
                duration: '3 weeks',
                syllabus: [
                    'SEO Fundamentals',
                    'Google Ads',
                    'Social Media Strategy',
                    'Content Marketing',
                    'Analytics'
                ],
                isPublished: true,
                enrolledCount: 8
            },
            {
                title: 'Python for Data Science',
                description: 'Data analysis, visualization, and machine learning',
                category: 'Data Science',
                price: 2999,
                emoji: '📊',
                instructor: teacher._id,
                duration: '8 weeks',
                syllabus: [
                    'Python Basics',
                    'NumPy & Pandas',
                    'Data Visualization',
                    'Machine Learning',
                    'Real-world Projects'
                ],
                isPublished: true,
                enrolledCount: 12
            },
            {
                title: 'UI/UX Design Principles',
                description: 'Create beautiful and user-friendly interfaces',
                category: 'Design',
                price: 1799,
                emoji: '🎨',
                instructor: teacher._id,
                duration: '4 weeks',
                syllabus: [
                    'Design Fundamentals',
                    'Color Theory',
                    'Typography',
                    'Wireframing',
                    'User Testing'
                ],
                isPublished: true,
                enrolledCount: 6
            }
        ];

        await Course.insertMany(courses);
        console.log('✓ Created 5 sample courses');

        console.log('\n✅ Database seeding completed!\n');
        console.log('Test Credentials:');
        console.log('─'.repeat(50));
        console.log('Admin:   admin@example.com / admin123');
        console.log('Teacher: teacher@example.com / teacher123');
        console.log('Student: student1@example.com / student123');
        console.log('Student: student2@example.com / student123');
        console.log('─'.repeat(50));

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
