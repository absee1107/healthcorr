from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..core.database import Base
import enum

document_tags = Table(
    'document_tags',
    Base.metadata,
    Column('document_id', Integer, ForeignKey('documents.id')),
    Column('tag_id', Integer, ForeignKey('document_tags_table.id'))
)

class DocumentStatus(str, enum.Enum):
    DRAFT = "draft"
    UNDER_REVIEW = "under_review"
    PENDING_APPROVAL = "pending_approval"
    APPROVED = "approved"
    REJECTED = "rejected"
    IN_EXECUTION = "in_execution"
    COMPLETED = "completed"
    ARCHIVED = "archived"

class DocumentType(str, enum.Enum):
    PATIENT_LETTER = "patient_letter"
    INSURANCE_CORRESPONDENCE = "insurance_correspondence"
    REFERRAL_LETTER = "referral_letter"
    DISCHARGE_SUMMARY = "discharge_summary"
    FAX_TRANSMISSION = "fax_transmission"
    EMAIL_COMMUNICATION = "email_communication"
    LEGAL_DOCUMENT = "legal_document"
    ADMINISTRATIVE_MEMO = "administrative_memo"

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    document_type = Column(Enum(DocumentType), nullable=False)
    status = Column(Enum(DocumentStatus), default=DocumentStatus.DRAFT)
    file_path = Column(String)
    file_name = Column(String)
    file_size = Column(Integer)
    mime_type = Column(String)
    content = Column(Text)
    document_metadata = Column(Text)
    folder_id = Column(Integer, ForeignKey('folders.id'))
    template_id = Column(Integer, ForeignKey('templates.id'), nullable=True)
    creator_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    creator = relationship("User", back_populates="documents")
    folder = relationship("Folder", back_populates="documents")
    template = relationship("Template")
    versions = relationship("DocumentVersion", back_populates="document", cascade="all, delete-orphan")
    tags = relationship("DocumentTag", secondary=document_tags, back_populates="documents")
    workflow = relationship("Workflow", back_populates="document", uselist=False)
    compliance_checks = relationship("ComplianceCheck", back_populates="document")

class DocumentVersion(Base):
    __tablename__ = "document_versions"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey('documents.id'))
    version_number = Column(Integer, nullable=False)
    file_path = Column(String)
    changes_description = Column(Text)
    created_by = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    document = relationship("Document", back_populates="versions")

class Folder(Base):
    __tablename__ = "folders"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    parent_id = Column(Integer, ForeignKey('folders.id'), nullable=True)
    path = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    documents = relationship("Document", back_populates="folder")
    parent = relationship("Folder", remote_side=[id], backref="subfolders")

class DocumentTag(Base):
    __tablename__ = "document_tags_table"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    color = Column(String)
    
    documents = relationship("Document", secondary=document_tags, back_populates="tags")
