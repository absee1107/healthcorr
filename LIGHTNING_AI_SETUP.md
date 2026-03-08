# Lightning AI Deployment Guide

Complete guide to deploy Healthcare Document Management System on Lightning AI.

## What is Lightning AI?

Lightning AI provides cloud-based development environments (Studios) with:
- Pre-configured Python environments
- GPU support (optional)
- Persistent storage
- Easy port exposure
- Collaborative features

Perfect for development and testing!

---

## Prerequisites

1. Lightning AI account (free tier available)
2. Basic terminal knowledge
3. Your Gemini API key

---

## Step 1: Create Lightning AI Account

1. Go to https://lightning.ai
2. Click "Sign Up" or "Get Started"
3. Create account (can use GitHub/Google)
4. Verify your email

---

## Step 2: Create New Studio

1. Click "New Studio" button
2. **Choose Machine Type:**
   - For this app: **CPU** is sufficient
   - Recommended: "CPU - 4 cores, 16GB RAM"
   - GPU not required (saves credits)

3. **Choose Template:**
   - Select "Blank" or "Python"

4. Click "Create Studio"

⏱️ Wait 1-2 minutes for Studio to start

---

## Step 3: Clone Repository

Once your Studio is ready, open the terminal:

```bash
# Clone your repository
git clone https://github.com/your-username/healthcorr.git
cd healthcorr

# Verify files
ls -la
```

---

## Step 4: Setup Backend

### 4.1 Create Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate
```

### 4.2 Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

⏱️ Takes 5-10 minutes on Lightning AI

### 4.3 Configure Environment

```bash
# Copy example file
cp .env.example .env

# Edit with nano
nano .env
```

**Update these values:**
```env
DATABASE_URL=sqlite:///./database/app.db
SECRET_KEY=your-random-32-character-secret-key-here
GEMINI_API_KEY=your-gemini-api-key-here
FRONTEND_URL=https://your-studio-url-3000.lightning.ai
HOST=0.0.0.0
PORT=8000
```

**Save:** Press `Ctrl+X`, then `Y`, then `Enter`

### 4.4 Initialize Database

```bash
python init_db.py
```

### 4.5 Start Backend (Background)

```bash
# Start in background so it keeps running
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > backend.log 2>&1 &

# Check it's running
curl http://localhost:8000/health
```

Expected: `{"status":"healthy"}`

---

## Step 5: Expose Backend Port

1. In Lightning AI Studio, look for **"Ports"** tab (usually bottom panel)
2. Click **"Expose Port"**
3. Enter port: **8000**
4. Click "Expose"
5. **Copy the public URL** (looks like: `https://xxxxx-8000.lightning.ai`)

---

## Step 6: Setup Frontend

### 6.1 Go to Project Root

```bash
# Go back to main directory
cd ..
pwd  # Should show: /teamspace/studios/this_studio/healthcorr
```

### 6.2 Install Node Dependencies

```bash
npm install
```

⏱️ Takes 3-5 minutes

### 6.3 Create Environment File

```bash
# Create .env.local with your backend URL
cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=https://YOUR-BACKEND-URL-8000.lightning.ai/api/v1
EOF
```

**Replace `YOUR-BACKEND-URL-8000.lightning.ai` with your actual backend URL from Step 5!**

Example:
```env
NEXT_PUBLIC_API_URL=https://01234567-8000.lightning.ai/api/v1
```

### 6.4 Start Frontend

```bash
npm run dev
```

Expected output:
```
▲ Next.js 15.4.9
- Local:   http://localhost:3000
✓ Ready in 2.5s
```

---

## Step 7: Expose Frontend Port

1. In **"Ports"** tab, click **"Expose Port"** again
2. Enter port: **3000**
3. Click "Expose"
4. **Copy the public URL** (looks like: `https://xxxxx-3000.lightning.ai`)

---

## Step 8: Update CORS Settings

Now that you have the frontend URL, update backend CORS:

```bash
# Stop backend
pkill -f uvicorn

# Edit backend .env
cd backend
nano .env
```

**Update FRONTEND_URL:**
```env
FRONTEND_URL=https://YOUR-FRONTEND-URL-3000.lightning.ai
```

**Save and restart backend:**
```bash
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > backend.log 2>&1 &
```

---

## Step 9: Access Your Application

Open your browser and go to:

**https://YOUR-FRONTEND-URL-3000.lightning.ai**

You should see the Healthcare Document Management System!

**Login with:**
- Username: `admin`
- Password: `admin123`

---

## Managing Your Lightning AI Deployment

### Check Backend Logs

```bash
cd backend
tail -f backend.log
```

Press `Ctrl+C` to stop viewing logs

### Restart Backend

```bash
# Kill backend
pkill -f uvicorn

# Start again
cd backend
source venv/bin/activate
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > backend.log 2>&1 &
```

### Restart Frontend

```bash
# Press Ctrl+C in terminal running frontend
# Then start again
npm run dev
```

### Check Running Processes

```bash
# See what's running
ps aux | grep -E 'uvicorn|node'

# Check ports
netstat -tlnp | grep -E '8000|3000'
```

### Stop Everything

```bash
# Stop backend
pkill -f uvicorn

# Stop frontend (Ctrl+C in its terminal)
```

---

## Lightning AI Specific Features

### Persistent Storage

Your files are saved in `/teamspace/studios/this_studio/`

**Important:** Database and uploads persist between sessions!

### Studio Sleep

Lightning AI Studios sleep after inactivity:
- **Free tier:** 30 minutes of inactivity
- **Paid tier:** Configurable

**When Studio wakes up:**
1. Services are stopped
2. You need to restart backend and frontend
3. Your files and database are still there!

### Quick Restart Script

Create a restart script:

```bash
# Create script
cat > restart.sh << 'EOF'
#!/bin/bash
echo "Restarting Healthcare App..."

# Start backend
cd /teamspace/studios/this_studio/healthcorr/backend
source venv/bin/activate
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > backend.log 2>&1 &
echo "Backend started on port 8000"

# Start frontend
cd /teamspace/studios/this_studio/healthcorr
nohup npm run dev > frontend.log 2>&1 &
echo "Frontend started on port 3000"

echo "Done! Check exposed ports for URLs"
EOF

# Make executable
chmod +x restart.sh

# Use it
./restart.sh
```

---

## Troubleshooting

### Backend Not Responding

```bash
# Check if running
ps aux | grep uvicorn

# Check logs
cd backend
tail -50 backend.log

# Restart
pkill -f uvicorn
source venv/bin/activate
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > backend.log 2>&1 &
```

### Frontend Not Loading

```bash
# Check if running
ps aux | grep node

# Check logs
tail -50 frontend.log

# Restart
# Press Ctrl+C if running in foreground
# Or: pkill -f "next dev"
npm run dev
```

### Port Already in Use

```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### CORS Errors

1. Check `backend/.env` has correct `FRONTEND_URL`
2. Restart backend
3. Clear browser cache
4. Try incognito/private window

### Database Issues

```bash
cd backend
rm database/app.db
python init_db.py
```

---

## Cost and Limits

### Free Tier

- **Compute:** Limited hours per month
- **Storage:** 5GB persistent storage
- **Studios:** Can create multiple
- **Sleep:** After 30 min inactivity

### Paid Tier

- More compute hours
- Larger storage
- Longer sleep timeout
- Priority support

**Tip:** Stop your Studio when not using it to save credits!

---

## Best Practices

1. **Save Work Regularly**
   - Lightning AI auto-saves, but commit to Git regularly

2. **Use Restart Script**
   - Create the restart.sh script above
   - Makes restarting after sleep easy

3. **Monitor Logs**
   - Check backend.log and frontend.log for errors

4. **Database Backups**
   ```bash
   # Backup database
   cp backend/database/app.db backend/database/app.db.backup
   
   # Restore if needed
   cp backend/database/app.db.backup backend/database/app.db
   ```

5. **Environment Variables**
   - Never commit .env files to Git
   - Keep API keys secure

---

## Sharing Your App

Your Lightning AI URLs are public! Anyone with the URL can access your app.

**To restrict access:**
1. Add authentication (already built-in!)
2. Use Lightning AI's access controls
3. Deploy to production with proper security

---

## Moving to Production

Lightning AI is great for development, but for production:

1. Use the GCP deployment guide (see DEPLOYMENT_GUIDE.md)
2. Set up proper domain
3. Enable HTTPS
4. Use production database (PostgreSQL)
5. Set up monitoring

---

## Quick Reference

### URLs
- **Backend:** `https://xxxxx-8000.lightning.ai`
- **Frontend:** `https://xxxxx-3000.lightning.ai`
- **API Docs:** `https://xxxxx-8000.lightning.ai/docs`

### Commands
```bash
# Start backend
cd backend && source venv/bin/activate
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > backend.log 2>&1 &

# Start frontend
npm run dev

# Check logs
tail -f backend/backend.log
tail -f frontend.log

# Stop services
pkill -f uvicorn
pkill -f "next dev"
```

### Default Login
- Username: `admin`
- Password: `admin123`

---

## Support

- Lightning AI Docs: https://lightning.ai/docs
- Lightning AI Community: https://lightning.ai/community
- Check logs for errors
- Use the troubleshooting section above

Happy developing on Lightning AI! ⚡
