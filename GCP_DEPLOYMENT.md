# Google Cloud Platform (GCP) Deployment Guide

Complete production deployment guide for Healthcare Document Management System on GCP.

## Architecture Overview

```
Internet
   ↓
Cloud Load Balancer (HTTPS)
   ↓
├─→ Cloud Run (Frontend - Next.js)
│   Port: 3000
│
└─→ Cloud Run (Backend - FastAPI)
    Port: 8000
    ↓
    ├─→ Cloud SQL (PostgreSQL)
    │   Database: healthcorr
    │
    └─→ Cloud Storage
        Bucket: healthcorr-uploads
```

---

## Prerequisites

1. **GCP Account** with billing enabled
2. **gcloud CLI** installed
3. **Docker** installed locally
4. **Git** repository with your code
5. **Domain name** (optional, for custom domain)

---

## Part 1: Initial GCP Setup

### Step 1: Install gcloud CLI

**Windows:**
```bash
# Download from: https://cloud.google.com/sdk/docs/install
# Run installer
```

**Linux:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
```

**Mac:**
```bash
brew install --cask google-cloud-sdk
```

### Step 2: Initialize gcloud

```bash
# Login to GCP
gcloud auth login

# Initialize configuration
gcloud init

# Follow prompts to:
# 1. Select or create project
# 2. Choose default region (e.g., us-central1)
```

### Step 3: Set Project Variables

```bash
# Set your project ID
export PROJECT_ID="your-project-id"
export REGION="us-central1"

# Configure gcloud
gcloud config set project $PROJECT_ID
gcloud config set compute/region $REGION
```

### Step 4: Enable Required APIs

```bash
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  storage.googleapis.com \
  secretmanager.googleapis.com \
  cloudbuild.googleapis.com \
  compute.googleapis.com
```

⏱️ Takes 2-3 minutes

---

## Part 2: Database Setup (Cloud SQL)

### Step 1: Create PostgreSQL Instance

```bash
gcloud sql instances create healthcorr-db \
  --database-version=POSTGRES_14 \
  --tier=db-f1-micro \
  --region=$REGION \
  --root-password=CHANGE_THIS_PASSWORD \
  --storage-type=SSD \
  --storage-size=10GB
```

⏱️ Takes 5-10 minutes

**For production, use larger tier:**
```bash
--tier=db-n1-standard-1  # 1 vCPU, 3.75GB RAM
```

### Step 2: Create Database

```bash
gcloud sql databases create healthcorr \
  --instance=healthcorr-db
```

### Step 3: Create Database User

```bash
gcloud sql users create healthcorr-user \
  --instance=healthcorr-db \
  --password=SECURE_PASSWORD_HERE
```

**Save these credentials!** You'll need them later.

### Step 4: Get Connection Name

```bash
gcloud sql instances describe healthcorr-db \
  --format="value(connectionName)"
```

**Save this!** Format: `project-id:region:instance-name`

---

## Part 3: Storage Setup (Cloud Storage)

### Step 1: Create Bucket

```bash
gsutil mb -l $REGION gs://healthcorr-uploads-$PROJECT_ID
```

### Step 2: Set Bucket Permissions

```bash
# Make bucket private (recommended)
gsutil iam ch allUsers:objectViewer gs://healthcorr-uploads-$PROJECT_ID

# Or keep private and use signed URLs
```

### Step 3: Configure CORS

```bash
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

gsutil cors set cors.json gs://healthcorr-uploads-$PROJECT_ID
```

---

## Part 4: Secrets Management

### Step 1: Create Secrets

```bash
# Gemini API Key
echo -n "your-gemini-api-key" | \
  gcloud secrets create gemini-api-key \
  --data-file=- \
  --replication-policy="automatic"

# JWT Secret (generate random 32+ chars)
openssl rand -base64 32 | \
  gcloud secrets create jwt-secret \
  --data-file=- \
  --replication-policy="automatic"

# Database Password
echo -n "your-db-password" | \
  gcloud secrets create db-password \
  --data-file=- \
  --replication-policy="automatic"
```

### Step 2: Grant Access to Cloud Run

```bash
# Get project number
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")

# Grant access
gcloud secrets add-iam-policy-binding gemini-api-key \
  --member="serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding jwt-secret \
  --member="serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"

gcloud secrets add-iam-policy-binding db-password \
  --member="serviceAccount:$PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

---

## Part 5: Prepare Backend for Cloud Run

### Step 1: Update Backend Configuration

Edit `backend/app/core/config.py`:

```python
from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./database/app.db")
    
    # Cloud SQL specific
    CLOUD_SQL_CONNECTION_NAME: str = None
    DB_USER: str = None
    DB_PASSWORD: str = None
    DB_NAME: str = "healthcorr"
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Gemini AI
    GEMINI_API_KEY: str
    
    # File Storage
    UPLOAD_DIR: str = "./storage/uploads"
    GCS_BUCKET: str = None
    MAX_UPLOAD_SIZE: int = 10485760
    
    # CORS
    FRONTEND_URL: str = "http://localhost:3000"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT: int = int(os.getenv("PORT", "8000"))
    
    class Config:
        env_file = ".env"
        case_sensitive = True
    
    @property
    def database_url(self) -> str:
        if self.CLOUD_SQL_CONNECTION_NAME:
            return f"postgresql+psycopg2://{self.DB_USER}:{self.DB_PASSWORD}@/{self.DB_NAME}?host=/cloudsql/{self.CLOUD_SQL_CONNECTION_NAME}"
        return self.DATABASE_URL

settings = Settings()
```

### Step 2: Update requirements.txt

Add PostgreSQL support:

```bash
cd backend
echo "psycopg2-binary==2.9.9" >> requirements.txt
```

### Step 3: Create Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy and install requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create directories
RUN mkdir -p storage/uploads database

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD python -c "import requests; requests.get('http://localhost:8000/health')"

# Run application
CMD exec uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}
```

### Step 4: Create .dockerignore

Create `backend/.dockerignore`:

```
venv/
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
*.db
*.sqlite*
.env
.env.local
.git/
.gitignore
README.md
*.log
.DS_Store
```

---

## Part 6: Deploy Backend to Cloud Run

### Step 1: Build and Deploy

```bash
cd backend

# Get Cloud SQL connection name
CLOUD_SQL_CONN=$(gcloud sql instances describe healthcorr-db --format="value(connectionName)")

# Deploy
gcloud run deploy healthcorr-backend \
  --source . \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars="DB_USER=healthcorr-user,DB_NAME=healthcorr,CLOUD_SQL_CONNECTION_NAME=$CLOUD_SQL_CONN,GCS_BUCKET=healthcorr-uploads-$PROJECT_ID" \
  --set-secrets="GEMINI_API_KEY=gemini-api-key:latest,SECRET_KEY=jwt-secret:latest,DB_PASSWORD=db-password:latest" \
  --add-cloudsql-instances $CLOUD_SQL_CONN \
  --memory 512Mi \
  --cpu 1 \
  --timeout 300 \
  --max-instances 10 \
  --min-instances 0
```

⏱️ Takes 5-10 minutes for first deployment

**Save the backend URL from output!**
Example: `https://healthcorr-backend-xxxxx-uc.a.run.app`

### Step 2: Initialize Database

```bash
# Install Cloud SQL Proxy
curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.linux.amd64
chmod +x cloud-sql-proxy

# Start proxy in background
./cloud-sql-proxy $CLOUD_SQL_CONN &

# Wait 5 seconds
sleep 5

# Set temporary DATABASE_URL
export DATABASE_URL="postgresql://healthcorr-user:YOUR_DB_PASSWORD@localhost:5432/healthcorr"

# Run init script
python init_db.py

# Stop proxy
pkill cloud-sql-proxy
```

---

## Part 7: Prepare Frontend for Cloud Run

### Step 1: Update next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // Disable image optimization for Cloud Run
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### Step 2: Create Dockerfile

Create `Dockerfile` in project root:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set correct permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Step 3: Create .dockerignore

Create `.dockerignore` in project root:

```
node_modules/
.next/
.git/
.gitignore
README.md
.env*.local
backend/
*.md
.DS_Store
```

---

## Part 8: Deploy Frontend to Cloud Run

```bash
# From project root
cd ..

# Get backend URL (replace with your actual URL)
BACKEND_URL="https://healthcorr-backend-xxxxx-uc.a.run.app"

# Deploy frontend
gcloud run deploy healthcorr-frontend \
  --source . \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars="NEXT_PUBLIC_API_URL=$BACKEND_URL/api/v1" \
  --memory 512Mi \
  --cpu 1 \
  --timeout 300 \
  --max-instances 10 \
  --min-instances 0
```

⏱️ Takes 5-10 minutes

**Save the frontend URL!**
Example: `https://healthcorr-frontend-xxxxx-uc.a.run.app`

---

## Part 9: Update CORS Settings

Now update backend with frontend URL:

```bash
cd backend

FRONTEND_URL="https://healthcorr-frontend-xxxxx-uc.a.run.app"

gcloud run services update healthcorr-backend \
  --region $REGION \
  --update-env-vars="FRONTEND_URL=$FRONTEND_URL"
```

---

## Part 10: Test Deployment

### Test Backend

```bash
# Health check
curl https://healthcorr-backend-xxxxx-uc.a.run.app/health

# API docs
open https://healthcorr-backend-xxxxx-uc.a.run.app/docs
```

### Test Frontend

Open in browser:
```
https://healthcorr-frontend-xxxxx-uc.a.run.app
```

Login with:
- Username: `admin`
- Password: `admin123`

---

## Part 11: Custom Domain (Optional)

### Step 1: Verify Domain Ownership

```bash
gcloud domains verify yourdomain.com
```

### Step 2: Map Domain to Services

```bash
# Map frontend
gcloud run domain-mappings create \
  --service healthcorr-frontend \
  --domain app.yourdomain.com \
  --region $REGION

# Map backend
gcloud run domain-mappings create \
  --service healthcorr-backend \
  --domain api.yourdomain.com \
  --region $REGION
```

### Step 3: Update DNS Records

Add the DNS records shown in the output to your domain provider.

### Step 4: Update Environment Variables

```bash
# Update backend CORS
gcloud run services update healthcorr-backend \
  --region $REGION \
  --update-env-vars="FRONTEND_URL=https://app.yourdomain.com"

# Update frontend API URL
gcloud run services update healthcorr-frontend \
  --region $REGION \
  --update-env-vars="NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1"
```

---

## Monitoring and Maintenance

### View Logs

```bash
# Backend logs
gcloud run logs read healthcorr-backend --limit 50

# Frontend logs
gcloud run logs read healthcorr-frontend --limit 50

# Follow logs in real-time
gcloud run logs tail healthcorr-backend
```

### View Metrics

```bash
# Service details
gcloud run services describe healthcorr-backend --region $REGION

# List revisions
gcloud run revisions list --service healthcorr-backend --region $REGION
```

### Update Services

```bash
# Redeploy backend
cd backend
gcloud run deploy healthcorr-backend --source . --region $REGION

# Redeploy frontend
cd ..
gcloud run deploy healthcorr-frontend --source . --region $REGION
```

---

## Cost Optimization

### Current Setup Costs (Approximate)

- **Cloud Run:** ~$5-20/month (depends on traffic)
- **Cloud SQL (db-f1-micro):** ~$7/month
- **Cloud Storage:** ~$0.02/GB/month
- **Secrets Manager:** ~$0.06/secret/month

**Total:** ~$15-30/month for low traffic

### Optimization Tips

1. **Use minimum instances = 0** (already set)
2. **Set max instances** to control costs
3. **Use Cloud SQL's smallest tier** for development
4. **Enable Cloud CDN** for static assets
5. **Set up budget alerts**

### Set Budget Alert

```bash
# Create budget
gcloud billing budgets create \
  --billing-account=YOUR_BILLING_ACCOUNT_ID \
  --display-name="Healthcare App Budget" \
  --budget-amount=50USD \
  --threshold-rule=percent=50 \
  --threshold-rule=percent=90 \
  --threshold-rule=percent=100
```

---

## Security Checklist

- [ ] Change default admin password
- [ ] Rotate SECRET_KEY regularly
- [ ] Use strong database passwords
- [ ] Enable Cloud Armor (WAF)
- [ ] Set up VPC for Cloud SQL
- [ ] Enable audit logging
- [ ] Configure IAM roles properly
- [ ] Use least privilege access
- [ ] Enable HTTPS only
- [ ] Set up Cloud Monitoring alerts
- [ ] Regular security scans
- [ ] Backup database regularly

---

## Backup and Recovery

### Database Backup

```bash
# Create backup
gcloud sql backups create \
  --instance=healthcorr-db

# List backups
gcloud sql backups list --instance=healthcorr-db

# Restore from backup
gcloud sql backups restore BACKUP_ID \
  --backup-instance=healthcorr-db \
  --backup-id=BACKUP_ID
```

### Automated Backups

```bash
# Enable automated backups
gcloud sql instances patch healthcorr-db \
  --backup-start-time=03:00 \
  --retained-backups-count=7
```

---

## Troubleshooting

### Service Won't Deploy

```bash
# Check build logs
gcloud builds list --limit=5

# View specific build
gcloud builds log BUILD_ID
```

### Database Connection Issues

```bash
# Test Cloud SQL connection
gcloud sql connect healthcorr-db --user=healthcorr-user

# Check Cloud SQL status
gcloud sql instances describe healthcorr-db
```

### High Costs

```bash
# Check current usage
gcloud billing accounts list
gcloud billing projects describe $PROJECT_ID

# View cost breakdown in Console:
# https://console.cloud.google.com/billing
```

---

## Quick Reference

### Important URLs

- **Frontend:** `https://healthcorr-frontend-xxxxx-uc.a.run.app`
- **Backend:** `https://healthcorr-backend-xxxxx-uc.a.run.app`
- **API Docs:** `https://healthcorr-backend-xxxxx-uc.a.run.app/docs`
- **GCP Console:** `https://console.cloud.google.com`

### Common Commands

```bash
# Deploy backend
cd backend && gcloud run deploy healthcorr-backend --source . --region $REGION

# Deploy frontend
gcloud run deploy healthcorr-frontend --source . --region $REGION

# View logs
gcloud run logs tail healthcorr-backend

# Update environment variable
gcloud run services update healthcorr-backend \
  --update-env-vars="KEY=value" \
  --region $REGION

# Scale service
gcloud run services update healthcorr-backend \
  --max-instances=20 \
  --region $REGION
```

---

## Next Steps

1. ✅ Set up monitoring and alerts
2. ✅ Configure custom domain
3. ✅ Enable Cloud CDN
4. ✅ Set up CI/CD pipeline
5. ✅ Configure backup strategy
6. ✅ Review security settings
7. ✅ Load testing
8. ✅ Documentation for team

Congratulations! Your app is now running on GCP! 🎉
