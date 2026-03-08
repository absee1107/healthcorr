# Healthcare Document Management System - Quick Start

Welcome! This guide will help you get started quickly.

## 📚 Documentation Index

Choose your deployment scenario:

### 🏠 Local Development
**Best for:** Development, testing, learning
**Time:** 15-20 minutes
**Cost:** Free

👉 **[LOCAL_SETUP.md](./LOCAL_SETUP.md)** - Complete step-by-step local setup

### ⚡ Lightning AI
**Best for:** Cloud development, collaboration, quick demos
**Time:** 20-30 minutes
**Cost:** Free tier available

👉 **[LIGHTNING_AI_SETUP.md](./LIGHTNING_AI_SETUP.md)** - Deploy on Lightning AI

### ☁️ Google Cloud Platform (Production)
**Best for:** Production deployment, scalability
**Time:** 45-60 minutes
**Cost:** ~$15-30/month

👉 **[GCP_DEPLOYMENT.md](./GCP_DEPLOYMENT.md)** - Full GCP production deployment

### 📖 Complete Guide
**All deployment options with troubleshooting**

👉 **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Comprehensive deployment guide

---

## 🚀 Super Quick Start (Local)

If you just want to run it NOW:

### Backend (Terminal 1)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: .\venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY
python init_db.py
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend (Terminal 2)
```bash
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local
npm run dev
```

### Access
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs
- **Login:** admin / admin123

---

## 📋 What You're Building

A comprehensive healthcare document management system with:

### Core Features
- ✅ Document upload, versioning, and management
- ✅ AI-powered content generation (Gemini)
- ✅ Multi-level approval workflows
- ✅ Compliance checking
- ✅ Template management
- ✅ Role-based access control
- ✅ Audit logging
- ✅ Real-time notifications

### Tech Stack

**Frontend:**
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS

**Backend:**
- FastAPI
- SQLAlchemy
- SQLite/PostgreSQL
- JWT Authentication
- Google Gemini AI

---

## 🎯 Choose Your Path

### I want to...

**...develop locally**
→ Follow [LOCAL_SETUP.md](./LOCAL_SETUP.md)
- Full control
- Fast iteration
- No cloud costs

**...deploy for testing/demo**
→ Follow [LIGHTNING_AI_SETUP.md](./LIGHTNING_AI_SETUP.md)
- Quick cloud deployment
- Share with team
- Free tier available

**...deploy to production**
→ Follow [GCP_DEPLOYMENT.md](./GCP_DEPLOYMENT.md)
- Scalable infrastructure
- Production-ready
- Custom domain support

---

## 📁 Project Structure

```
healthcorr/
├── app/                      # Next.js pages & routes
│   ├── compliance/          # Compliance checking page
│   ├── documents/           # Document management
│   ├── templates/           # Template management
│   └── workflows/           # Workflow management
│
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   │   └── endpoints/  # Auth, documents, AI
│   │   ├── core/           # Config, security, database
│   │   ├── models/         # SQLAlchemy models
│   │   └── services/       # Business logic
│   ├── database/           # SQLite database
│   ├── storage/            # File uploads
│   └── .env                # Backend configuration
│
├── components/             # React components
│   ├── AIAssistant.tsx    # AI chat interface
│   └── Navigation.tsx     # Navigation component
│
├── lib/                    # Utilities
│   ├── api-client.ts      # API client
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Helper functions
│
├── shared/                 # Shared code
│   └── types/             # Shared TypeScript types
│
├── .env.local             # Frontend configuration
└── package.json           # Node dependencies
```

---

## 🔑 Environment Variables

### Backend (.env)
```env
DATABASE_URL=sqlite:///./database/app.db
SECRET_KEY=your-secret-key-min-32-chars
GEMINI_API_KEY=your-gemini-api-key
FRONTEND_URL=http://localhost:3000
PORT=8000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

**Get Gemini API Key:** https://makersuite.google.com/app/apikey

---

## 🔐 Default Credentials

After running `python init_db.py`:

- **Username:** admin
- **Password:** admin123

⚠️ **Change this immediately after first login!**

---

## 📊 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login
- `GET /api/v1/auth/me` - Get current user

### Documents
- `GET /api/v1/documents` - List documents
- `POST /api/v1/documents` - Create document
- `GET /api/v1/documents/{id}` - Get document
- `PUT /api/v1/documents/{id}` - Update document
- `DELETE /api/v1/documents/{id}` - Delete document
- `POST /api/v1/documents/{id}/upload` - Upload file

### AI
- `POST /api/v1/ai/generate` - Generate content
- `POST /api/v1/ai/compliance-check` - Check compliance
- `POST /api/v1/ai/suggest-content` - Get suggestions
- `POST /api/v1/ai/summarize/{id}` - Summarize document
- `POST /api/v1/ai/extract-info/{id}` - Extract information

**Full API Documentation:** http://localhost:8000/docs

---

## 🧪 Testing the System

### 1. Health Check
```bash
curl http://localhost:8000/health
```

### 2. Register User
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

### 3. Login
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=Test123!"
```

### 4. Test AI
```bash
curl -X POST http://localhost:8000/api/v1/ai/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "prompt": "Write a professional patient letter",
    "context": "Follow-up appointment"
  }'
```

---

## 🐛 Common Issues

### Backend won't start
```bash
# Check Python version
python --version  # Need 3.8+

# Reinstall dependencies
cd backend
pip install -r requirements.txt

# Check .env file exists
cat .env
```

### Frontend won't start
```bash
# Check Node version
node --version  # Need 18+

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check .env.local exists
cat .env.local
```

### CORS errors
1. Check `FRONTEND_URL` in `backend/.env`
2. Restart backend server
3. Clear browser cache

### Database errors
```bash
cd backend
rm database/app.db
python init_db.py
```

**More troubleshooting:** See the detailed guides above

---

## 📚 Module Overview

### 1. Document Management
- Upload/download documents
- Version control
- Folder organization
- Document tagging
- Search and filter

### 2. Template System
- Create document templates
- Variable placeholders
- Template categories
- Version history

### 3. Workflow & Approvals
- Multi-level approval chains
- Parallel/sequential workflows
- Deadline tracking
- Approval comments
- Audit trail

### 4. Compliance Checking
- Automated compliance checks
- Guideline verification
- Format validation
- Required fields check

### 5. AI Integration
- Content generation
- Document summarization
- Compliance detection
- Smart suggestions
- Information extraction

### 6. User Management
- Role-based access control
- User profiles
- Activity logging
- Permission management

### 7. Search & Discovery
- Full-text search
- Advanced filters
- AI-powered semantic search
- Document relationships

### 8. Reporting & Analytics
- Document metrics
- Approval analytics
- Compliance tracking
- Usage statistics

---

## 🎓 Learning Resources

### API Documentation
- Interactive docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

### Code Examples
Check the `examples/` directory (if available) for:
- API usage examples
- Integration examples
- Custom workflow examples

### Architecture
- Frontend: Next.js App Router
- Backend: FastAPI with async support
- Database: SQLAlchemy ORM
- AI: Google Gemini API

---

## 🚦 Next Steps

After getting it running:

1. **Change admin password**
2. **Create user accounts**
3. **Set up document folders**
4. **Create templates**
5. **Configure workflows**
6. **Test AI features**
7. **Customize for your needs**

---

## 📞 Support

### Documentation
- [Local Setup](./LOCAL_SETUP.md) - Detailed local development guide
- [Lightning AI](./LIGHTNING_AI_SETUP.md) - Cloud development guide
- [GCP Deployment](./GCP_DEPLOYMENT.md) - Production deployment guide
- [Full Guide](./DEPLOYMENT_GUIDE.md) - Complete deployment reference

### Troubleshooting
1. Check the relevant guide above
2. Review error messages
3. Check logs (backend terminal or browser console)
4. Verify environment variables
5. Ensure all services are running

### Common Commands
```bash
# Check if services are running
curl http://localhost:8000/health  # Backend
curl http://localhost:3000         # Frontend

# View backend logs
cd backend
tail -f backend.log  # If running in background

# Restart services
# Backend: Ctrl+C then restart uvicorn
# Frontend: Ctrl+C then npm run dev
```

---

## 📄 License

[Your License Here]

---

## 🎉 Ready to Start?

Choose your deployment path:

- 🏠 **Local Development:** [LOCAL_SETUP.md](./LOCAL_SETUP.md)
- ⚡ **Lightning AI:** [LIGHTNING_AI_SETUP.md](./LIGHTNING_AI_SETUP.md)
- ☁️ **GCP Production:** [GCP_DEPLOYMENT.md](./GCP_DEPLOYMENT.md)

Happy coding! 🚀
