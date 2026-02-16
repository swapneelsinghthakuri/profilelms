# Deployment Guide

## 🚀 Deploy Backend to Heroku

### Step 1: Create Heroku Account
1. Go to [heroku.com](https://heroku.com)
2. Sign up for free account
3. Verify email

### Step 2: Install Heroku CLI
```bash
# Windows (PowerShell)
choco install heroku-cli

# Or download from heroku.com/download

# Verify installation
heroku --version
```

### Step 3: Deploy Backend

```bash
cd backend

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key_here
heroku config:set MONGO_URI=your_mongodb_atlas_uri
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Backend Deployed at:
```
https://your-app-name.herokuapp.com
```

---

## 📱 Deploy Frontend to Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Connect GitHub account

### Step 2: Deploy Frontend

**Option A: Using Git**
```bash
# Push to GitHub first
git add .
git commit -m "Initial commit"
git push origin main

# Then import on Vercel dashboard
```

**Option B: Using Vercel CLI**
```bash
npm i -g vercel

cd frontend

vercel

# Follow the prompts
# Answer: Yes to create new project
# Region: Pick closest to you
```

### Update Backend URL in Frontend
Edit `frontend/js/app.js` and all other JS files:
```javascript
const API_URL = 'https://your-app-name.herokuapp.com/api';
```

### Frontend Deployed at:
```
https://your-frontend-name.vercel.app
```

---

## 🗄️ MongoDB Atlas Setup

### Step 1: Create MongoDB Cloud Account
1. Go to [mongodb.com/cloud](https://mongodb.com/cloud)
2. Sign up for free
3. Verify email

### Step 2: Create Cluster
1. Click "Create a Cluster"
2. Choose "Free" tier
3. Select region (closest to you)
4. Click "Create Cluster"
5. Wait for cluster creation (5-10 minutes)

### Step 3: Get Connection String
1. Click "Connect"
2. Choose "Connect your application"
3. Copy connection string
4. Replace `<password>` and `<dbname>`

### Step 4: Update .env
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-lms?retryWrites=true&w=majority
```

---

## 🔐 Security Checklist Before Production

### Environment Variables
- [ ] Change `JWT_SECRET` to strong random key
- [ ] Use MongoDB Atlas password
- [ ] Set `NODE_ENV=production`
- [ ] Add rate limiting middleware
- [ ] Enable HTTPS (automatic on Heroku/Vercel)

### Database
- [ ] Enable MongoDB IP whitelist
- [ ] Create database user with limited permissions
- [ ] Enable MongoDB encryption at rest
- [ ] Regular backups enabled

### Frontend
- [ ] Update `API_URL` to production backend
- [ ] Remove console.log statements
- [ ] Enable CORS only for your domain
- [ ] Add CSP headers

### Files
- [ ] Test file uploads on production
- [ ] Verify upload limits work
- [ ] Check image compression

### Testing
- [ ] Test all payment flows
- [ ] Test all user roles
- [ ] Test responsive design
- [ ] Test PWA on mobile
- [ ] Performance testing

---

## 📊 Custom Domain Setup

### Add Domain to Vercel (Frontend)
1. Go to Vercel project settings
2. Domains section
3. Add your domain
4. Update DNS records:
   - CNAME: **alias.vercel.sh**

### Add Domain to Heroku (Backend)
1. Go to Heroku app settings
2. Domains and certificates
3. Add domain: **api.yourdomain.com**
4. Update DNS:
   - CNAME: **your-app-name.herokuapp.com**

---

## 📈 Monitoring & Maintenance

### Heroku Monitoring
```bash
# View logs
heroku logs --tail

# Check app status
heroku status

# Restart app
heroku restart

# Scale dynos
heroku ps:scale web=2
```

### Vercel Monitoring
- Dashboard shows deployments
- Analytics for page performance
- Error tracking built-in

### Database Monitoring
- MongoDB Atlas dashboard
- View metrics and alerts
- Monitor query performance

---

## 🔄 Continuous Deployment

### Auto-Deploy on Git Push
1. **Heroku:** Automatic if connected to GitHub
2. **Vercel:** Automatic on every push to main

### Manual Deployment
```bash
# Backend
cd backend && git push heroku main

# Frontend
cd frontend && vercel --prod
```

---

## 💰 Cost Breakdown

| Service | Free Tier | Notes |
|---------|-----------|-------|
| Heroku Backend | 1000 free dyno hours/month | Sleeps after 30 mins inactivity |
| Vercel Frontend | Unlimited deploys | Very fast, global CDN |
| MongoDB Atlas | 512MB storage, 3 replicas | Enough for typical LMS |
| Total | ~$0/month | Pay only if you scale |

**To go unlimited on Heroku:** $7/month hobby dyno

---

## 🚨 Troubleshooting Deployment

### Backend not connecting to database
```bash
# Check MongoDB connection
heroku config:get MONGO_URI

# Verify IP whitelist on MongoDB Atlas
```

### CORS errors after deploy
```javascript
// Update CORS in backend/server.js
app.use(cors({
    origin: ['https://yourdomain.com', 'https://api.yourdomain.com'],
    credentials: true
}));
```

### Frontend can't reach backend
```javascript
// Verify API_URL in all JS files
const API_URL = 'https://your-backend.herokuapp.com/api';
```

### Files not uploading
- Check `/uploads` directory exists on Heroku
- Verify MAX_FILE_SIZE in .env
- Use Heroku file storage (temporary, resets on redeploy)
- **Better:** Use AWS S3 or Cloudinary for permanent storage

---

## 📱 PWA on Production

1. Serve on HTTPS (automatic on Vercel/Heroku)
2. Manifest.json accessible
3. Service Worker works offline
4. "Add to Home Screen" appears automatically

Test with:
```bash
# Chrome DevTools
F12 → Lighthouse → PWA category
```

---

## 🎯 Next Steps After Deployment

1. **Test thoroughly** in production
2. **Setup email service** (Nodemailer configuration)
3. **Add Google OAuth** (get credentials from Google Console)
4. **Setup payment gateway** (Khalti, eSewa actual integration)
5. **Monitor logs** regularly
6. **Backup database** regularly
7. **Update dependencies** monthly

---

## 📞 Support

For deployment issues:
- Check Heroku logs: `heroku logs --tail`
- Check Vercel dashboard
- MongoDB Atlas alerts
- Contact platform support

---

**All set for production! 🚀**
