from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...core.database import get_db
from ...services.gemini_service import gemini_service
from ...services.document_service import DocumentService
from pydantic import BaseModel

router = APIRouter(prefix="/ai", tags=["ai"])

class AIPrompt(BaseModel):
    prompt: str
    context: str = None

class ComplianceCheckRequest(BaseModel):
    document_id: int
    guidelines: str

class ContentSuggestionRequest(BaseModel):
    context: str
    document_type: str

@router.post("/generate")
async def generate_content(request: AIPrompt):
    """Generate content using AI"""
    try:
        response = await gemini_service.generate_content(request.prompt, request.context)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/compliance-check")
async def check_compliance(request: ComplianceCheckRequest, db: Session = Depends(get_db)):
    """Check document compliance"""
    document = DocumentService.get_document(db, request.document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    try:
        result = await gemini_service.check_compliance(document.content or "", request.guidelines)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/suggest-content")
async def suggest_content(request: ContentSuggestionRequest):
    """Get AI content suggestions"""
    try:
        suggestion = await gemini_service.suggest_content(request.context, request.document_type)
        return {"suggestion": suggestion}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/summarize/{document_id}")
async def summarize_document(document_id: int, db: Session = Depends(get_db)):
    """Summarize document"""
    document = DocumentService.get_document(db, document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    try:
        summary = await gemini_service.summarize_document(document.content or "")
        return {"summary": summary}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/extract-info/{document_id}")
async def extract_info(document_id: int, db: Session = Depends(get_db)):
    """Extract key information from document"""
    document = DocumentService.get_document(db, document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    try:
        info = await gemini_service.extract_key_info(document.content or "")
        return info
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
