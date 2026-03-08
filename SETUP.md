# Quick Setup Guide

## Prerequisites

- Python 3.8+ (for backend)
- Node.js 18+ (for frontend)
- Git

## Quick Start (Windows)

### Option 1: Automated Setup

1. Double-click `start-dev.bat` to start both frontend and backend

### Option 2: Manual Setup

#### Backend Setup

1. Open terminal in project root
2. Navigate to backend:
```bash
cd backend
```

3. Create and activate virtual environment:
```bash
python -m venv venv
venv\Scripts\activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Configure environment:
```bash
# Edit backend/.env and add your Gemini API key
# GEMINI_API_KEY=your-key-here
```

6. Initialize database:
```bash
python init_db.py
```

7. Start backend:
```bash
uvicorn app.main:app --reload
```

Backend runs at: http://localhost:8000

#### Frontend Setup

1. Open new terminal in project root
2. Install dependencies:
```bash
npm install
```

3. Start frontend:
```bash
npm run dev
```

Frontend runs at: http://localhost:3000

## Default Credentials

After running `init_db.py`:

- Username: `admin`
- Password: `admin123`

⚠️ Change this password immediately after first login!

## Verify Installation

1. Backend health check: http://localhost:8000/health
2. API documentation: http://localhost:8000/docs
3. Frontend: http://localhost:3000

## Get Gemini API Key

1. Visit: https://makersuite.google.com/app/apikey
2. Create new API key
3. Add to `backend/.env`:
```
GEMINI_API_KEY=your-key-here
```

## Troubleshooting

### Backend won't start
- Check Python version: `python --version` (need 3.8+)
- Verify virtual environment is activated
- Check if port 8000 is available

### Frontend won't start
- Check Node version: `node --version` (need 18+)
- Delete `node_modules` and run `npm install` again
- Check if port 3000 is available

### Database errors
- Delete `backend/database/app.db`
- Run `python init_db.py` again

### CORS errors
- Verify `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Check both services are running

## Next Steps

1. Change admin password
2. Create user accounts
3. Set up document folders
4. Create templates
5. Configure workflows
6. Add compliance guidelines

## Support

For issues, check:
- Backend logs in terminal
- Frontend console in browser DevTools
- API docs at http://localhost:8000/docs
