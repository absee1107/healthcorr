from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.document import Document, DocumentVersion, Folder, DocumentStatus
from ..core.config import settings
import os
import shutil
from datetime import datetime

class DocumentService:
    @staticmethod
    def create_document(db: Session, document_data: dict, creator_id: int) -> Document:
        """Create a new document"""
        document = Document(
            **document_data,
            creator_id=creator_id
        )
        db.add(document)
        db.commit()
        db.refresh(document)
        return document
    
    @staticmethod
    def get_document(db: Session, document_id: int) -> Optional[Document]:
        """Get document by ID"""
        return db.query(Document).filter(Document.id == document_id).first()
    
    @staticmethod
    def list_documents(
        db: Session,
        skip: int = 0,
        limit: int = 100,
        status: Optional[DocumentStatus] = None,
        folder_id: Optional[int] = None
    ) -> List[Document]:
        """List documents with filters"""
        query = db.query(Document)
        
        if status:
            query = query.filter(Document.status == status)
        if folder_id:
            query = query.filter(Document.folder_id == folder_id)
        
        return query.offset(skip).limit(limit).all()
    
    @staticmethod
    def update_document(db: Session, document_id: int, update_data: dict) -> Optional[Document]:
        """Update document"""
        document = db.query(Document).filter(Document.id == document_id).first()
        if document:
            for key, value in update_data.items():
                setattr(document, key, value)
            db.commit()
            db.refresh(document)
        return document
    
    @staticmethod
    def delete_document(db: Session, document_id: int) -> bool:
        """Delete document"""
        document = db.query(Document).filter(Document.id == document_id).first()
        if document:
            if document.file_path and os.path.exists(document.file_path):
                os.remove(document.file_path)
            db.delete(document)
            db.commit()
            return True
        return False
    
    @staticmethod
    def create_version(db: Session, document_id: int, version_data: dict) -> DocumentVersion:
        """Create document version"""
        document = db.query(Document).filter(Document.id == document_id).first()
        version_number = len(document.versions) + 1 if document else 1
        
        version = DocumentVersion(
            document_id=document_id,
            version_number=version_number,
            **version_data
        )
        db.add(version)
        db.commit()
        db.refresh(version)
        return version
    
    @staticmethod
    def get_folders(db: Session, parent_id: Optional[int] = None) -> List[Folder]:
        """Get folders"""
        return db.query(Folder).filter(Folder.parent_id == parent_id).all()
    
    @staticmethod
    def create_folder(db: Session, folder_data: dict) -> Folder:
        """Create folder"""
        folder = Folder(**folder_data)
        db.add(folder)
        db.commit()
        db.refresh(folder)
        return folder
