from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..core.database import Base
import enum

class ComplianceStatus(str, enum.Enum):
    PASSED = "passed"
    FAILED = "failed"
    WARNING = "warning"
    PENDING = "pending"

class ComplianceCheck(Base):
    __tablename__ = "compliance_checks"
    
    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey('documents.id'))
    check_type = Column(String, nullable=False)
    status = Column(Enum(ComplianceStatus), default=ComplianceStatus.PENDING)
    details = Column(Text)
    violations = Column(Text)
    recommendations = Column(Text)
    checked_by_ai = Column(Boolean, default=False)
    checked_at = Column(DateTime(timezone=True), server_default=func.now())
    
    document = relationship("Document", back_populates="compliance_checks")
