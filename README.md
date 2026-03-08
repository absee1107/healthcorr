<<<<<<< HEAD
# healthcorr
Correspondence Management Tool
=======
# Healthcare Document Management System

> AI-powered document management system for healthcare with compliance checking, workflow automation, and Gemini AI integration.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.109+-green.svg)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15.4+-black.svg)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)]()

## 🚀 Quick Start

**Choose your deployment:**

- 🏠 **[Local Development](./LOCAL_SETUP.md)** - 15 minutes, Free
- ⚡ **[Lightning AI](./LIGHTNING_AI_SETUP.md)** - 20 minutes, Free tier
- ☁️ **[Google Cloud (GCP)](./GCP_DEPLOYMENT.md)** - 45 minutes, ~$15-30/month

**Super quick local start:**
```bash
# Backend (Terminal 1)
cd backend && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt && python init_db.py
uvicorn app.main:app --reload

# Frontend (Terminal 2)
npm install && npm run dev
```

**Access:** http://localhost:3000 | **Login:** admin / admin123

---

## 📚 Documentation

| Guide | Description | Time | Best For |
|-------|-------------|------|----------|
| **[QUICKSTART.md](./QUICKSTART.md)** | Overview & quick reference | 5 min | Everyone |
| **[LOCAL_SETUP.md](./LOCAL_SETUP.md)** | Detailed local setup | 15 min | Development |
| **[LIGHTNING_AI_SETUP.md](./LIGHTNING_AI_SETUP.md)** | Cloud development | 20 min | Testing/Demos |
| **[GCP_DEPLOYMENT.md](./GCP_DEPLOYMENT.md)** | Production deployment | 45 min | Production |
| **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** | Complete reference | - | All scenarios |

---

## ✨ Features

### Core Capabilities
- ✅ **Document Management** - Upload, version control, organize
- ✅ **AI Integration** - Content generation, summarization (Gemini)
- ✅ **Workflow Automation** - Multi-level approval chains
- ✅ **Compliance Checking** - Automated guideline verification
- ✅ **Template System** - Reusable document templates
- ✅ **Role-Based Access** - Granular permissions
- ✅ **Audit Logging** - Complete activity tracking
- ✅ **Real-time Notifications** - Stay updated

### Document Types Supported
Patient Letters • Insurance Correspondence • Referral Letters • Discharge Summaries • Fax Transmissions • Email Communications • Legal Documents • Administrative Memos

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Next.js 15    │  Frontend (React 19, TypeScript, Tailwind)
│   Port: 3000    │
└────────┬────────┘
         │ HTTP/REST
         ↓
┌─────────────────┐
│    FastAPI      │  Backend (Python, SQLAlchemy)
│   Port: 8000    │
└────────┬────────┘
         │
    ┌────┴────┬──────────┬────────────┐
    ↓         ↓          ↓            ↓
┌────────┐ ┌──────┐ ┌─────────┐ ┌──────────┐
│SQLite/ │ │Cloud │ │ Gemini  │ │  Cloud   │
│Postgres│ │Storage│ │   AI    │ │ Storage  │
└────────┘ └──────┘ └─────────┘ └──────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, TypeScript, Tailwind CSS
- **State:** React Hooks
- **API Client:** Custom fetch wrapper

### Backend
- **Framework:** FastAPI
- **ORM:** SQLAlchemy
- **Database:** SQLite (dev) / PostgreSQL (prod)
- **Auth:** JWT with bcrypt
- **AI:** Google Gemini API

---

## 📁 Project Structure

```
healthcorr/
├── app/                    # Next.js pages (App Router)
│   ├── compliance/        # Compliance checking
│   ├── documents/         # Document management
│   ├── templates/         # Template management
│   └── workflows/         # Workflow management
│
├── backend/               # FastAPI backend
│   ├── app/
│   │   ├── api/          # REST API endpoints
│   │   ├── core/         # Config, security, DB
│   │   ├── models/       # SQLAlchemy models
│   │   └── services/     # Business logic
│   ├── database/         # SQLite database
│   └── storage/          # File uploads
│
├── components/           # React components
├── lib/                  # Utilities & API client
├── shared/types/         # Shared TypeScript types
│
├── LOCAL_SETUP.md        # Local development guide
├── LIGHTNING_AI_SETUP.md # Lightning AI guide
├── GCP_DEPLOYMENT.md     # GCP production guide
└── DEPLOYMENT_GUIDE.md   # Complete reference
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/v1/auth/register    Register new user
POST   /api/v1/auth/login       Login user
GET    /api/v1/auth/me          Get current user
```

### Documents
```
GET    /api/v1/documents        List documents
POST   /api/v1/documents        Create document
GET    /api/v1/documents/{id}   Get document
PUT    /api/v1/documents/{id}   Update document
DELETE /api/v1/documents/{id}   Delete document
POST   /api/v1/documents/{id}/upload  Upload file
```

### AI
```
POST   /api/v1/ai/generate              Generate content
POST   /api/v1/ai/compliance-check      Check compliance
POST   /api/v1/ai/suggest-content       Get suggestions
POST   /api/v1/ai/summarize/{id}        Summarize document
POST   /api/v1/ai/extract-info/{id}     Extract information
```

**Full API Docs:** http://localhost:8000/docs

---

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts & authentication
- **roles** - User roles (Admin, Approver, Creator, Viewer)
- **permissions** - Granular access control
- **documents** - Document metadata & content
- **document_versions** - Version history
- **templates** - Reusable document templates
- **workflows** - Approval workflow definitions
- **approvals** - Approval records & comments
- **compliance_checks** - Compliance verification results
- **ai_interactions** - AI usage tracking
- **audit_logs** - Complete activity audit trail
- **notifications** - User notifications

---

## ⚙️ Configuration

### Backend Environment (.env)
```env
# Database
DATABASE_URL=sqlite:///./database/app.db

# Security (CHANGE IN PRODUCTION!)
SECRET_KEY=your-random-32-character-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI Integration
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

### Frontend Environment (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

**Get Gemini API Key:** https://makersuite.google.com/app/apikey

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:8000/health
```

### Register User
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

### Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=Test123!"
```

---

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing (bcrypt)
- ✅ Role-based access control (RBAC)
- ✅ Complete audit logging
- ✅ CORS protection
- ✅ File upload validation
- ✅ SQL injection prevention
- ✅ XSS protection

---

## 📊 Compliance Features

- ✅ HIPAA compliance checks
- ✅ Document structure verification
- ✅ Required fields validation
- ✅ Formatting consistency checks
- ✅ Medical terminology accuracy
- ✅ Regulatory compliance tracking

---

## 🤖 AI Capabilities

Powered by Google Gemini AI:

- **Content Generation** - Create professional documents
- **Summarization** - Extract key points
- **Compliance Detection** - Identify violations
- **Smart Suggestions** - Context-aware recommendations
- **Information Extraction** - Parse structured data
- **Semantic Search** - Natural language queries

---

## 🚀 Deployment Options

### Local Development
- **Time:** 15 minutes
- **Cost:** Free
- **Best for:** Development, testing
- **Guide:** [LOCAL_SETUP.md](./LOCAL_SETUP.md)

### Lightning AI
- **Time:** 20 minutes
- **Cost:** Free tier available
- **Best for:** Cloud development, demos
- **Guide:** [LIGHTNING_AI_SETUP.md](./LIGHTNING_AI_SETUP.md)

### Google Cloud Platform
- **Time:** 45 minutes
- **Cost:** ~$15-30/month
- **Best for:** Production deployment
- **Guide:** [GCP_DEPLOYMENT.md](./GCP_DEPLOYMENT.md)

---

## 📈 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Integration with EHR systems
- [ ] Multi-language support
- [ ] Advanced AI features
- [ ] Blockchain for audit trail
- [ ] Real-time collaboration
- [ ] Advanced reporting

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

Proprietary - Healthcare Document Management System

---

## 🆘 Support

### Documentation
- [Quick Start](./QUICKSTART.md)
- [Local Setup](./LOCAL_SETUP.md)
- [Lightning AI](./LIGHTNING_AI_SETUP.md)
- [GCP Deployment](./GCP_DEPLOYMENT.md)
- [Complete Guide](./DEPLOYMENT_GUIDE.md)

### Troubleshooting
1. Check relevant guide above
2. Review error messages
3. Check logs (terminal/browser console)
4. Verify environment variables
5. Ensure all services are running

### Common Issues
- **Port in use:** Kill process or use different port
- **Module not found:** Reinstall dependencies
- **CORS errors:** Check FRONTEND_URL in backend/.env
- **Database errors:** Delete DB and run init_db.py

---

## 🎉 Get Started

Choose your path:

1. **[Quick Start](./QUICKSTART.md)** - Overview & quick reference
2. **[Local Development](./LOCAL_SETUP.md)** - Detailed local setup
3. **[Lightning AI](./LIGHTNING_AI_SETUP.md)** - Cloud development
4. **[GCP Production](./GCP_DEPLOYMENT.md)** - Production deployment

**Default Login:** admin / admin123 (change after first login!)

---

Made with ❤️ for Healthcare Professionals
>>>>>>> 51dd66a (Initial commit)
