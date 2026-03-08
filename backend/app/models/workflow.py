from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..core.database import Base
import enum

class ApprovalLevel(str, enum.Enum):
    DRAFT_REVIEW = "draft_review"
    CLINICAL_REVIEW = "clinical_review"
    COMPLIANCE_CHECK = "compliance_check"
    LEGAL_REVIEW = "legal_review"
    FINAL_APPROVAL = "final_approval"
    EXECUTION = "execution"

class ApprovalStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    SKIPPED = "skipped"

class Workflow(Base):
    __tablename__ = "workflows"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    document_id = Column(Integer, ForeignKey('documents.id'))
    is_parallel = Column(Boolean, default=False)
    current_step = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    document = relationship("Document", back_populates="workflow")
    steps = relationship("WorkflowStep", back_populates="workflow", order_by="WorkflowStep.step_order")

class WorkflowStep(Base):
    __tablename__ = "workflow_steps"
    
    id = Column(Integer, primary_key=True, index=True)
    workflow_id = Column(Integer, ForeignKey('workflows.id'))
    step_order = Column(Integer, nullable=False)
    approval_level = Column(Enum(ApprovalLevel), nullable=False)
    required_role_id = Column(Integer, ForeignKey('roles.id'))
    deadline_hours = Column(Integer)
    is_required = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    workflow = relationship("Workflow", back_populates="steps")
    approvals = relationship("Approval", back_populates="workflow_step")

class Approval(Base):
    __tablename__ = "approvals"
    
    id = Column(Integer, primary_key=True, index=True)
    workflow_step_id = Column(Integer, ForeignKey('workflow_steps.id'))
    approver_id = Column(Integer, ForeignKey('users.id'))
    status = Column(Enum(ApprovalStatus), default=ApprovalStatus.PENDING)
    comments = Column(Text)
    approved_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    workflow_step = relationship("WorkflowStep", back_populates="approvals")
    approver = relationship("User", back_populates="approvals")
