from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
from ...core.database import get_db
from ...services.document_service import DocumentService
from ...models.document import DocumentStatus, DocumentType
from pydantic import BaseModel
import shutil
import os
from ...core.config import settings

router = APIRouter(prefix="/documents", tags=["documents"])

class DocumentCreate(BaseModel):
    title: str
    document_type: DocumentType
    folder_id: Optional[int] = None
    template_id: Optional[int] = None
    content: Optional[str] = None

class DocumentResponse(BaseModel):
    id: int
    title: str
    document_type: DocumentType
    status: DocumentStatus
    file_name: Optional[str]
    created_at: str
    
    class Config:
        from_attributes = True

@router.post("/", response_model=DocumentResponse)
def create_document(
    document: DocumentCreate,
    db: Session = Depends(get_db)
):
    """Create new document"""
    # TODO: Get current user from token
    creator_id = 1
    doc = DocumentService.create_document(db, document.dict(), creator_id)
    return doc

@router.get("/", response_model=List[DocumentResponse])
def list_documents(
    skip: int = 0,
    limit: int = 100,
    status: Optional[DocumentStatus] = None,
    folder_id: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """List documents"""
    documents = DocumentService.list_documents(db, skip, limit, status, folder_id)
    return documents

@router.get("/{document_id}", response_model=DocumentResponse)
def get_document(document_id: int, db: Session = Depends(get_db)):
    """Get document by ID"""
    document = DocumentService.get_document(db, document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

@router.put("/{document_id}", response_model=DocumentResponse)
def update_document(
    document_id: int,
    update_data: dict,
    db: Session = Depends(get_db)
):
    """Update document"""
    document = DocumentService.update_document(db, document_id, update_data)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    return document

@router.delete("/{document_id}")
def delete_document(document_id: int, db: Session = Depends(get_db)):
    """Delete document"""
    success = DocumentService.delete_document(db, document_id)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"message": "Document deleted successfully"}

@router.post("/{document_id}/upload")
async def upload_file(
    document_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Upload file for document"""
    document = DocumentService.get_document(db, document_id)
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    file_path = os.path.join(settings.UPLOAD_DIR, f"{document_id}_{file.filename}")
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    DocumentService.update_document(db, document_id, {
        "file_path": file_path,
        "file_name": file.filename,
        "file_size": os.path.getsize(file_path),
        "mime_type": file.content_type
    })
    
    return {"message": "File uploaded successfully", "file_path": file_path}
