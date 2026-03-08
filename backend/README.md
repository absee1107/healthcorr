# Healthcare Document Management System - Backend

FastAPI backend for healthcare document management with AI integration.

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your settings
```

4. Run the server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
backend/
├── app/
│   ├── api/              # API endpoints
│   ├── core/             # Core functionality (config, security, database)
│   ├── models/           # SQLAlchemy models
│   ├── services/         # Business logic
│   └── main.py           # FastAPI application
├── database/             # SQLite database
├── storage/              # File uploads
└── requirements.txt      # Python dependencies
```

## Key Features

- JWT authentication
- Document management with versioning
- AI integration (Gemini)
- Workflow & approval system
- Compliance checking
- File upload/download
- RESTful API

## Environment Variables

See `.env.example` for required configuration.
