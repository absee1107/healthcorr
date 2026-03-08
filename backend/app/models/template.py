from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from ..core.database import Base

class Template(Base):
    __tablename__ = "templates"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    content = Column(Text, nullable=False)
    variables = Column(Text)
    category_id = Column(Integer, ForeignKey('template_categories.id'))
    version = Column(Integer, default=1)
    is_active = Column(Boolean, default=True)
    requires_approval = Column(Boolean, default=False)
    created_by = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    category = relationship("TemplateCategory", back_populates="templates")

class TemplateCategory(Base):
    __tablename__ = "template_categories"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(Text)
    parent_id = Column(Integer, ForeignKey('template_categories.id'), nullable=True)
    
    templates = relationship("Template", back_populates="category")
    parent = relationship("TemplateCategory", remote_side=[id], backref="subcategories")
