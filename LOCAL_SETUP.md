# Local Development Setup - Step by Step

## Prerequisites Check

Before starting, verify you have:

```bash
# Check Python (need 3.8+)
python --version
# or
python3 --version

# Check Node.js (need 18+)
node --version

# Check npm
npm --version

# Check Git
git --version
```

If any are missing, install them first:
- Python: https://www.python.org/downloads/
- Node.js: https://nodejs.org/
- Git: https://git-scm.com/downloads

---

## Part 1: Backend Setup (FastAPI)

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Create Virtual Environment

**On Windows:**
```bash
python -m venv venv
.\venv\Scripts\activate
```

**On Linux/Mac:**
```bash
python3 -m venv venv
source venv/bin/activate
```

You should see `(venv)` in your terminal prompt.

### Step 3: Install Python Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

⏱️ This takes 5-10 minutes. Get a coffee!

**If you see errors:**
- Pillow error: `pip install Pillow --no-cache-dir`
- On Windows, you may need Visual C++ Build Tools

### Step 4: Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit the file
# Windows: notepad .env
# Linux/Mac: nano .env
```

**Minimum required settings in .env:**
```env
DATABASE_URL=sqlite:///./database/app.db
SECRET_KEY=change-this-to-a-random-32-character-string
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
GEMINI_API_KEY=your-gemini-api-key-from-google
UPLOAD_DIR=./storage/uploads
MAX_UPLOAD_SIZE=10485760
FRONTEND_URL=http://localhost:3000
HOST=0.0.0.0
PORT=8000
```

**Get Gemini API Key:**
1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy and paste into .env file

### Step 5: Initialize Database

```bash
python init_db.py
```

**Expected output:**
```
✓ Database initialized successfully!

Default admin credentials:
Username: admin
Password: admin123

⚠ Please change the admin password after first login!
```

### Step 6: Start Backend Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Expected output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Step 7: Verify Backend is Running

Open a new terminal and test:

```bash
curl http://localhost:8000/health
```

**Expected response:**
```json
{"status":"healthy"}
```

**Or open in browser:**
- Main API: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Alternative Docs: http://localhost:8000/redoc

✅ **Backend is now running!** Keep this terminal open.

---

## Part 2: Frontend Setup (Next.js)

### Step 1: Open New Terminal

**Important:** Keep the backend terminal running. Open a NEW terminal window.

### Step 2: Navigate to Project Root

```bash
# Go to the main project directory (NOT backend/)
cd /path/to/healthcorr

# Verify you're in the right place
ls
# You should see: app/, backend/, components/, lib/, package.json
```

### Step 3: Install Node Dependencies

```bash
npm install
```

⏱️ This takes 3-5 minutes.

**If you see errors:**
```bash
# Try clearing cache
npm cache clean --force
npm install
```

### Step 4: Create Frontend Environment File

Create a file named `.env.local` in the project root (same level as package.json):

```bash
# Windows
echo NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1 > .env.local

# Linux/Mac
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
EOF
```

**Or create manually:**
File: `.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### Step 5: Start Frontend Server

```bash
npm run dev
```

**Expected output:**
```
  ▲ Next.js 15.4.9
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.5s
```

### Step 6: Access the Application

Open your browser and go to:

**http://localhost:3000**

You should see the Healthcare Document Management System!

✅ **Frontend is now running!**

---

## Part 3: Test the System

### Test 1: Login with Admin

1. Go to http://localhost:3000
2. Click "Login" or navigate to login page
3. Enter credentials:
   - Username: `admin`
   - Password: `admin123`
4. You should be logged in!

### Test 2: API Health Check

```bash
curl http://localhost:8000/health
```

Expected: `{"status":"healthy"}`

### Test 3: Register New User

```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123!",
    "full_name": "Test User"
  }'
```

### Test 4: Login via API

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=Test123!"
```

You should get a token back!

---

## Quick Reference

### Starting the Application

**Every time you want to run the app:**

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: .\venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
# From project root
npm run dev
```

### Stopping the Application

- Press `Ctrl+C` in each terminal
- Or close the terminal windows

### Important URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs
- **Health Check:** http://localhost:8000/health

### Default Credentials

- **Username:** admin
- **Password:** admin123
- ⚠️ Change this after first login!

---

## Troubleshooting

### Backend Issues

**Problem:** "Port 8000 already in use"
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <number> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

**Problem:** "Module not found"
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

**Problem:** "Database error"
```bash
cd backend
rm database/app.db
python init_db.py
```

### Frontend Issues

**Problem:** "Port 3000 already in use"
```bash
# Use different port
PORT=3001 npm run dev

# Or kill process on 3000
# Windows: netstat -ano | findstr :3000
# Linux/Mac: lsof -ti:3000 | xargs kill -9
```

**Problem:** "Cannot connect to API"
- Check backend is running: http://localhost:8000/health
- Check `.env.local` has correct API URL
- Restart frontend: `Ctrl+C` then `npm run dev`

**Problem:** "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

If you see CORS errors in browser console:

1. Check `backend/.env` has:
   ```
   FRONTEND_URL=http://localhost:3000
   ```

2. Restart backend server

3. Clear browser cache (Ctrl+Shift+Delete)

---

## Next Steps

1. ✅ Change admin password
2. ✅ Create your first document
3. ✅ Try the AI features
4. ✅ Explore the API docs at http://localhost:8000/docs
5. ✅ Read DEPLOYMENT_GUIDE.md for production deployment

---

## File Structure Reference

```
healthcorr/
├── app/                    # Next.js pages
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── core/         # Config, security
│   │   ├── models/       # Database models
│   │   └── services/     # Business logic
│   ├── database/         # SQLite database
│   ├── storage/          # Uploaded files
│   ├── venv/             # Python virtual environment
│   ├── .env              # Backend config (create this!)
│   └── requirements.txt  # Python dependencies
├── components/           # React components
├── lib/                  # Utilities
├── .env.local           # Frontend config (create this!)
└── package.json         # Node dependencies
```

---

## Getting Help

1. Check the error message carefully
2. Look in this troubleshooting section
3. Check backend logs in terminal
4. Check browser console (F12) for frontend errors
5. Visit API docs: http://localhost:8000/docs

Happy coding! 🚀
