# Healthcare Document Management System - Complete Deployment Guide

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [Lightning AI Deployment](#lightning-ai-deployment)
3. [Google Cloud Platform (GCP) Deployment](#google-cloud-platform-gcp-deployment)
4. [Environment Variables Reference](#environment-variables-reference)
5. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Prerequisites
- **Python 3.8+** (Check: `python --version`)
- **Node.js 18+** (Check: `node --version`)
- **npm or yarn** (Check: `npm --version`)
- **Git** (Check: `git --version`)

### Step 1: Clone and Setup Project

```bash
# Clone the repository
git clone <your-repo-url>
cd healthcorr

# Verify project structure
ls -la
# You should see: app/, backend/, components/, lib/, etc.
```

### Step 2: Backend Setup (FastAPI)

#### 2.1 Create Virtual Environment

**Windows:**
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate
```

**Linux/Mac:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

#### 2.2 Install Dependencies

```bash
# Make sure you're in backend/ directory with venv activated
pip install --upgrade pip
pip install -r requirements.txt
```

**Note:** Installation may take 5-10 minutes. If you encounter errors:
- For Pillow errors: `pip install Pillow --no-cache-dir`
- For cryptography errors: Install Visual C++ Build Tools (Windows)

#### 2.3 Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env file with your settings
# Windows: notepad .env
# Linux/Mac: nano .env
```

**Required .env Configuration:**
```env
# Database
DATABASE_URL=sqlite:///./database/app.db

# Security (CHANGE IN PRODUCTION!)
SECRET_KEY=your-super-secret-key-min-32-characters-long
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Gemini AI (Get from: https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=your-gemini-api-key-here

# File Storage
UPLOAD_DIR=./storage/uploads
MAX_UPLOAD_SIZE=10485760

# CORS
FRONTEND_URL=http://localhost:3000

# Server
HOST=0.0.0.0
PORT=8000
```

#### 2.4 Initialize Database

```bash
# Still in backend/ directory
python init_db.py
```

**Expected Output:**
```
✓ Database initialized successfully!

Default admin credentials:
Username: admin
Password: admin123

⚠ Please change the admin password after first login!
```

#### 2.5 Start Backend Server

```bash
# Development mode with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or use the startup script
# Windows: .\start.bat
# Linux/Mac: ./start.sh
```

**Verify Backend is Running:**
- Open browser: http://localhost:8000
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

You should see: `{"status":"healthy"}`

### Step 3: Frontend Setup (Next.js)

#### 3.1 Open New Terminal

Keep the backend terminal running and open a new terminal window.

```bash
# Navigate to project root (not backend/)
cd /path/to/healthcorr
```

#### 3.2 Install Dependencies

```bash
# Install Node.js packages
npm install

# Or if using yarn
yarn install
```

**Note:** This may take 3-5 minutes.

#### 3.3 Configure Environment

```bash
# Create frontend environment file
# File should be in project root, NOT in backend/
```

Create `.env.local` in project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

#### 3.4 Start Frontend Server

```bash
# Make sure you're in project root
npm run dev

# Or with yarn
yarn dev
```

**Expected Output:**
```
  ▲ Next.js 15.4.9
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

 ✓ Ready in 2.5s
```

#### 3.5 Access Application

Open browser: **http://localhost:3000**

You should see the Healthcare Document Management System interface.

### Step 4: Test the System

#### 4.1 Test Backend API

```bash
# Health check
curl http://localhost:8000/health

# Register a user
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test123!",
    "full_name": "Test User"
  }'

# Login
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=Test123!"
```

#### 4.2 Test Frontend

1. Open http://localhost:3000
2. Try to login with admin credentials
3. Navigate through different sections
4. Test document upload
5. Test AI features

---

## Lightning AI Deployment

Lightning AI provides cloud-based development environments with GPU support.

### Prerequisites
- Lightning AI account (https://lightning.ai)
- Lightning AI CLI installed

### Step 1: Install Lightning AI CLI

```bash
pip install lightning-ai
lightning login
```

### Step 2: Create Lightning AI Studio

1. Go to https://lightning.ai
2. Click "New Studio"
3. Select machine type (CPU is sufficient for this app)
4. Choose "Blank" template

### Step 3: Setup in Lightning AI

Once your Studio is running:

```bash
# Clone your repository
git clone <your-repo-url>
cd healthcorr

# Setup Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Configure environment
cp .env.example .env
nano .env  # Edit with your settings

# Initialize database
python init_db.py

# Start backend (in background)
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > backend.log 2>&1 &
```

### Step 4: Setup Frontend in Lightning AI

```bash
# Go back to project root
cd ..

# Install dependencies
npm install

# Create environment file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=https://your-studio-url.lightning.ai/api/v1
EOF

# Start frontend
npm run dev
```

### Step 5: Expose Ports in Lightning AI

1. In Lightning AI Studio, go to "Ports" tab
2. Expose port 8000 (Backend)
3. Expose port 3000 (Frontend)
4. Copy the public URLs

### Step 6: Update Environment Variables

Update `.env.local` with the actual Lightning AI URLs:
```env
NEXT_PUBLIC_API_URL=https://your-studio-url-8000.lightning.ai/api/v1
```

Update `backend/.env`:
```env
FRONTEND_URL=https://your-studio-url-3000.lightning.ai
```

### Step 7: Restart Services

```bash
# Kill and restart backend
pkill -f uvicorn
cd backend
source venv/bin/activate
nohup uvicorn app.main:app --host 0.0.0.0 --port 8000 > backend.log 2>&1 &

# Restart frontend
cd ..
npm run dev
```

### Lightning AI Specific Notes

- **Persistence:** Use Lightning AI's persistent storage for database
- **Environment Variables:** Store sensitive data in Lightning AI secrets
- **GPU:** Not required for this application
- **Logs:** Check `backend.log` for backend issues
- **Auto-sleep:** Lightning AI Studios sleep after inactivity

---

## Google Cloud Platform (GCP) Deployment

### Architecture Overview

```
Internet → Cloud Load Balancer → Cloud Run (Frontend)
                                ↓
                         Cloud Run (Backend) → Cloud SQL (PostgreSQL)
                                ↓
                         Cloud Storage (Files)
```

### Prerequisites

- GCP Account with billing enabled
- `gcloud` CLI installed
- Docker installed locally
- GCP Project created

### Step 1: Install and Configure GCP CLI

```bash
# Install gcloud CLI
# Visit: https://cloud.google.com/sdk/docs/install

# Initialize and login
gcloud init
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID
```

### Step 2: Enable Required APIs

```bash
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  storage.googleapis.com \
  secretmanager.googleapis.com \
  cloudbuild.googleapis.com
```

### Step 3: Create Cloud SQL Instance (PostgreSQL)

```bash
# Create PostgreSQL instance
gcloud sql instances create healthcorr-db \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=us-central1

# Create database
gcloud sql databases create healthcorr \
  --instance=healthcorr-db

# Create user
gcloud sql users create healthcorr-user \
  --instance=healthcorr-db \
  --password=YOUR_SECURE_PASSWORD
```

### Step 4: Create Cloud Storage Bucket

```bash
# Create bucket for file uploads
gsutil mb -l us-central1 gs://healthcorr-uploads

# Set CORS policy
cat > cors.json << EOF
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE"],
    "responseHeader": ["Content-Type"],
    "maxAgeSeconds": 3600
  }
]
EOF

gsutil cors set cors.json gs://healthcorr-uploads
```

### Step 5: Store Secrets in Secret Manager

```bash
# Store Gemini API Key
echo -n "your-gemini-api-key" | \
  gcloud secrets create gemini-api-key --data-file=-

# Store JWT Secret
echo -n "your-super-secret-jwt-key-min-32-chars" | \
  gcloud secrets create jwt-secret --data-file=-

# Store Database Password
echo -n "YOUR_SECURE_PASSWORD" | \
  gcloud secrets create db-password --data-file=-
```

### Step 6: Prepare Backend for Cloud Run

#### 6.1 Update requirements.txt

Add PostgreSQL support:
```bash
cd backend
echo "psycopg2-binary==2.9.9" >> requirements.txt
```

#### 6.2 Create Dockerfile for Backend

Create `backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create necessary directories
RUN mkdir -p storage/uploads database

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### 6.3 Create .dockerignore

Create `backend/.dockerignore`:
```
venv/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
*.db
*.sqlite
*.sqlite3
.env
.env.local
.git/
.gitignore
README.md
```

#### 6.4 Update Backend Configuration for GCP

Update `backend/app/core/config.py` to support Cloud SQL:

```python
from pydantic_settings import BaseSettings
from typing import Optional
import os

class Settings(BaseSettings):
    # Database - Support both SQLite and PostgreSQL
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./database/app.db"
    )
    
    # If using Cloud SQL, construct connection string
    CLOUD_SQL_CONNECTION_NAME: Optional[str] = None
    DB_USER: Optional[str] = None
    DB_PASSWORD: Optional[str] = None
    DB_NAME: Optional[str] = None
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Gemini AI
    GEMINI_API_KEY: str
    
    # File Storage - Support both local and GCS
    UPLOAD_DIR: str = "./storage/uploads"
    GCS_BUCKET: Optional[str] = None
    MAX_UPLOAD_SIZE: int = 10485760
    
    # CORS
    FRONTEND_URL: str = "http://localhost:3000"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    class Config:
        env_file = ".env"
        case_sensitive = True
    
    def get_database_url(self) -> str:
        """Get database URL, preferring Cloud SQL if configured"""
        if self.CLOUD_SQL_CONNECTION_NAME:
            return f"postgresql+psycopg2://{self.DB_USER}:{self.DB_PASSWORD}@/{self.DB_NAME}?host=/cloudsql/{self.CLOUD_SQL_CONNECTION_NAME}"
        return self.DATABASE_URL

settings = Settings()
```

### Step 7: Deploy Backend to Cloud Run

```bash
# Build and deploy
cd backend

gcloud run deploy healthcorr-backend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="FRONTEND_URL=https://healthcorr-frontend-xxxxx.run.app" \
  --set-secrets="GEMINI_API_KEY=gemini-api-key:latest,SECRET_KEY=jwt-secret:latest,DB_PASSWORD=db-password:latest" \
  --set-env-vars="CLOUD_SQL_CONNECTION_NAME=YOUR_PROJECT_ID:us-central1:healthcorr-db,DB_USER=healthcorr-user,DB_NAME=healthcorr" \
  --add-cloudsql-instances YOUR_PROJECT_ID:us-central1:healthcorr-db \
  --memory 512Mi \
  --cpu 1 \
  --timeout 300 \
  --max-instances 10
```

**Note the backend URL from output:** `https://healthcorr-backend-xxxxx.run.app`

### Step 8: Prepare Frontend for Cloud Run

#### 8.1 Create Dockerfile for Frontend

Create `Dockerfile` in project root:
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build application
RUN npm run build

# Production image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### 8.2 Update next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
```

#### 8.3 Create .dockerignore

Create `.dockerignore` in project root:
```
node_modules/
.next/
.git/
.gitignore
README.md
.env.local
.env*.local
backend/
```

### Step 9: Deploy Frontend to Cloud Run

```bash
# From project root
gcloud run deploy healthcorr-frontend \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="NEXT_PUBLIC_API_URL=https://healthcorr-backend-xxxxx.run.app/api/v1" \
  --memory 512Mi \
  --cpu 1 \
  --timeout 300 \
  --max-instances 10
```

**Note the frontend URL:** `https://healthcorr-frontend-xxxxx.run.app`

### Step 10: Update CORS Settings

Update backend CORS to allow frontend domain:

```bash
# Redeploy backend with updated FRONTEND_URL
gcloud run deploy healthcorr-backend \
  --source ./backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="FRONTEND_URL=https://healthcorr-frontend-xxxxx.run.app" \
  --update-secrets="GEMINI_API_KEY=gemini-api-key:latest,SECRET_KEY=jwt-secret:latest,DB_PASSWORD=db-password:latest" \
  --set-env-vars="CLOUD_SQL_CONNECTION_NAME=YOUR_PROJECT_ID:us-central1:healthcorr-db,DB_USER=healthcorr-user,DB_NAME=healthcorr" \
  --add-cloudsql-instances YOUR_PROJECT_ID:us-central1:healthcorr-db
```

### Step 11: Initialize Database on GCP

```bash
# Connect to Cloud SQL
gcloud sql connect healthcorr-db --user=healthcorr-user

# Run migrations (from local machine with Cloud SQL Proxy)
# Install Cloud SQL Proxy
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.linux.amd64
chmod +x cloud-sql-proxy

# Start proxy
./cloud-sql-proxy YOUR_PROJECT_ID:us-central1:healthcorr-db &

# Update backend/.env temporarily
DATABASE_URL=postgresql://healthcorr-user:YOUR_SECURE_PASSWORD@localhost:5432/healthcorr

# Run init script
cd backend
source venv/bin/activate
python init_db.py
```

### Step 12: Setup Custom Domain (Optional)

```bash
# Map custom domain
gcloud run domain-mappings create \
  --service healthcorr-frontend \
  --domain app.yourdomain.com \
  --region us-central1

gcloud run domain-mappings create \
  --service healthcorr-backend \
  --domain api.yourdomain.com \
  --region us-central1
```

### GCP Cost Optimization

1. **Use Cloud Run's free tier:** First 2 million requests/month free
2. **Set min instances to 0:** Scales to zero when not in use
3. **Use Cloud SQL's smallest tier:** db-f1-micro for development
4. **Enable Cloud CDN:** For static assets
5. **Set up budget alerts:** Monitor spending

### GCP Monitoring

```bash
# View logs
gcloud run logs read healthcorr-backend --limit 50
gcloud run logs read healthcorr-frontend --limit 50

# Monitor metrics
gcloud run services describe healthcorr-backend --region us-central1
```

---

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| DATABASE_URL | Database connection string | `sqlite:///./database/app.db` | Yes |
| SECRET_KEY | JWT secret key (min 32 chars) | `your-secret-key-here` | Yes |
| ALGORITHM | JWT algorithm | `HS256` | Yes |
| ACCESS_TOKEN_EXPIRE_MINUTES | Token expiration time | `30` | Yes |
| GEMINI_API_KEY | Google Gemini API key | `AIza...` | Yes |
| UPLOAD_DIR | Local file upload directory | `./storage/uploads` | Yes |
| MAX_UPLOAD_SIZE | Max file size in bytes | `10485760` (10MB) | Yes |
| FRONTEND_URL | Frontend URL for CORS | `http://localhost:3000` | Yes |
| HOST | Server host | `0.0.0.0` | Yes |
| PORT | Server port | `8000` | Yes |
| CLOUD_SQL_CONNECTION_NAME | GCP Cloud SQL connection | `project:region:instance` | No (GCP only) |
| DB_USER | Database username | `healthcorr-user` | No (GCP only) |
| DB_PASSWORD | Database password | `secure-password` | No (GCP only) |
| DB_NAME | Database name | `healthcorr` | No (GCP only) |
| GCS_BUCKET | Google Cloud Storage bucket | `healthcorr-uploads` | No (GCP only) |

### Frontend (.env.local)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| NEXT_PUBLIC_API_URL | Backend API URL | `http://localhost:8000/api/v1` | Yes |

---

## Troubleshooting

### Common Issues

#### Backend won't start

**Error:** `ModuleNotFoundError: No module named 'fastapi'`
```bash
# Solution: Activate virtual environment and install dependencies
cd backend
source venv/bin/activate  # or .\venv\Scripts\activate on Windows
pip install -r requirements.txt
```

**Error:** `Port 8000 is already in use`
```bash
# Solution: Kill process using port 8000
# Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:8000 | xargs kill -9
```

**Error:** `ValidationError: SECRET_KEY Field required`
```bash
# Solution: Check .env file exists and has SECRET_KEY
cd backend
cat .env  # Verify SECRET_KEY is set
```

#### Frontend won't start

**Error:** `Cannot find module 'next'`
```bash
# Solution: Install dependencies
npm install
```

**Error:** `EADDRINUSE: address already in use :::3000`
```bash
# Solution: Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9

# Or use different port:
PORT=3001 npm run dev
```

**Error:** `API calls failing with CORS error`
```bash
# Solution: Check backend CORS settings
# 1. Verify FRONTEND_URL in backend/.env matches your frontend URL
# 2. Restart backend after changing .env
```

#### Database Issues

**Error:** `sqlalchemy.exc.OperationalError: unable to open database file`
```bash
# Solution: Create database directory
cd backend
mkdir -p database
python init_db.py
```

**Error:** `Table already exists`
```bash
# Solution: Delete database and reinitialize
cd backend
rm database/app.db
python init_db.py
```

#### GCP Deployment Issues

**Error:** `Cloud Run deployment failed`
```bash
# Check logs
gcloud run logs read healthcorr-backend --limit 100

# Common fixes:
# 1. Verify all secrets are created
# 2. Check Dockerfile syntax
# 3. Ensure all required APIs are enabled
```

**Error:** `Cloud SQL connection failed`
```bash
# Verify Cloud SQL instance is running
gcloud sql instances describe healthcorr-db

# Check connection name is correct
gcloud sql instances describe healthcorr-db | grep connectionName
```

### Getting Help

1. **Check Logs:**
   - Backend: Check terminal output or `backend.log`
   - Frontend: Check browser console (F12)
   - GCP: Use Cloud Logging

2. **API Documentation:**
   - Visit http://localhost:8000/docs for interactive API docs

3. **Common Commands:**
   ```bash
   # Check if services are running
   curl http://localhost:8000/health
   curl http://localhost:3000
   
   # View backend logs
   tail -f backend/backend.log
   
   # Test database connection
   cd backend
   python -c "from app.core.database import engine; print(engine.connect())"
   ```

---

## Production Checklist

Before deploying to production:

- [ ] Change all default passwords
- [ ] Generate strong SECRET_KEY (min 32 characters)
- [ ] Set up HTTPS/SSL certificates
- [ ] Configure proper CORS origins
- [ ] Enable database backups
- [ ] Set up monitoring and alerting
- [ ] Configure rate limiting
- [ ] Review and set appropriate file upload limits
- [ ] Enable audit logging
- [ ] Set up automated backups
- [ ] Configure CDN for static assets
- [ ] Review security headers
- [ ] Set up WAF (Web Application Firewall)
- [ ] Configure auto-scaling policies
- [ ] Set up CI/CD pipeline
- [ ] Document disaster recovery procedures

---

## Support

For issues or questions:
1. Check this documentation
2. Review API documentation at `/docs`
3. Check application logs
4. Review error messages carefully

## License

[Your License Here]
