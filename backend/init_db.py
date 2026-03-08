"""Initialize database with default data"""
from app.core.database import SessionLocal, engine, Base
from app.models import User, Role, Permission, Folder, TemplateCategory
from app.core.security import get_password_hash

def init_db():
    """Initialize database with default data"""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Create default roles
        roles_data = [
            {"name": "Admin", "description": "System administrator"},
            {"name": "Approver", "description": "Can approve documents"},
            {"name": "Creator", "description": "Can create documents"},
            {"name": "Viewer", "description": "Can view documents"},
            {"name": "Compliance Officer", "description": "Manages compliance"}
        ]
        
        for role_data in roles_data:
            if not db.query(Role).filter(Role.name == role_data["name"]).first():
                role = Role(**role_data)
                db.add(role)
        
        # Create default permissions
        permissions_data = [
            {"name": "create_document", "resource": "document", "action": "create"},
            {"name": "read_document", "resource": "document", "action": "read"},
            {"name": "update_document", "resource": "document", "action": "update"},
            {"name": "delete_document", "resource": "document", "action": "delete"},
            {"name": "approve_document", "resource": "document", "action": "approve"},
        ]
        
        for perm_data in permissions_data:
            if not db.query(Permission).filter(Permission.name == perm_data["name"]).first():
                permission = Permission(**perm_data)
                db.add(permission)
        
        # Create default folders
        folders_data = [
            {"name": "Incoming Correspondence", "path": "/incoming"},
            {"name": "Outgoing Correspondence", "path": "/outgoing"},
            {"name": "Draft Documents", "path": "/drafts"},
            {"name": "Templates Library", "path": "/templates"},
            {"name": "Archived Documents", "path": "/archived"},
            {"name": "Pending Approval", "path": "/pending"},
            {"name": "Executed Documents", "path": "/executed"}
        ]
        
        for folder_data in folders_data:
            if not db.query(Folder).filter(Folder.name == folder_data["name"]).first():
                folder = Folder(**folder_data)
                db.add(folder)
        
        # Create template categories
        categories_data = [
            {"name": "Patient Letters", "description": "Templates for patient correspondence"},
            {"name": "Insurance Forms", "description": "Insurance-related templates"},
            {"name": "Referral Letters", "description": "Medical referral templates"},
            {"name": "Legal Documents", "description": "Legal document templates"}
        ]
        
        for cat_data in categories_data:
            if not db.query(TemplateCategory).filter(TemplateCategory.name == cat_data["name"]).first():
                category = TemplateCategory(**cat_data)
                db.add(category)
        
        # Create default admin user
        if not db.query(User).filter(User.username == "admin").first():
            # Use shorter password to avoid bcrypt 72-byte limit
            admin_user = User(
                username="admin",
                email="admin@healthcare.com",
                full_name="System Administrator",
                hashed_password=get_password_hash("admin123"),
                is_superuser=True
            )
            db.add(admin_user)
            
            # Assign admin role
            admin_role = db.query(Role).filter(Role.name == "Admin").first()
            if admin_role:
                admin_user.roles.append(admin_role)
        
        db.commit()
        print("✓ Database initialized successfully!")
        print("\nDefault admin credentials:")
        print("Username: admin")
        print("Password: admin123")
        print("\n⚠ Please change the admin password after first login!")
        
    except Exception as e:
        print(f"Error initializing database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
