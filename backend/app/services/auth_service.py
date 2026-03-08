from sqlalchemy.orm import Session
from typing import Optional
from ..models.user import User, Role
from ..core.security import verify_password, get_password_hash, create_access_token
from datetime import timedelta
from ..core.config import settings

class AuthService:
    @staticmethod
    def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
        """Authenticate user with username and password"""
        user = db.query(User).filter(User.username == username).first()
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user
    
    @staticmethod
    def create_user(db: Session, user_data: dict) -> User:
        """Create new user"""
        hashed_password = get_password_hash(user_data.pop('password'))
        user = User(
            **user_data,
            hashed_password=hashed_password
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    
    @staticmethod
    def get_user_by_email(db: Session, email: str) -> Optional[User]:
        """Get user by email"""
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def get_user_by_username(db: Session, username: str) -> Optional[User]:
        """Get user by username"""
        return db.query(User).filter(User.username == username).first()
    
    @staticmethod
    def create_access_token_for_user(user: User) -> str:
        """Create JWT access token for user"""
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        return create_access_token(
            data={"sub": user.username, "user_id": user.id},
            expires_delta=access_token_expires
        )
    
    @staticmethod
    def assign_role(db: Session, user_id: int, role_name: str) -> bool:
        """Assign role to user"""
        user = db.query(User).filter(User.id == user_id).first()
        role = db.query(Role).filter(Role.name == role_name).first()
        
        if user and role:
            user.roles.append(role)
            db.commit()
            return True
        return False
