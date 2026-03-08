# Healthcare Correspondence Management - Database Schema

## Overview
Complete database schema for the healthcare correspondence management system with 9 core tables, 36,665+ records, and comprehensive relationship mapping.

## Database Statistics
- **Total Tables**: 9
- **Total Records**: 36,665
- **Relationships**: 24
- **Indexes**: 42

## Core Tables

### 1. users
**Description**: System users with authentication and role information  
**Row Count**: 47

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, NOT NULL | Unique user identifier |
| email | VARCHAR(255) | NOT NULL | User email address |
| username | VARCHAR(100) | NOT NULL | Unique username |
| hashed_password | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| full_name | VARCHAR(255) | NULL | User full name |
| is_active | BOOLEAN | NOT NULL | Account active status |
| is_superuser | BOOLEAN | NOT NULL | Admin privileges flag |
| created_at | TIMESTAMP | NOT NULL | Account creation timestamp |
| updated_at | TIMESTAMP | NULL | Last update timestamp |

**Relationships**:
- ONE_TO_MANY → documents (via creator_id)
- MANY_TO_MANY → roles (through user_roles)

---

### 2. documents
**Description**: Healthcare correspondence documents with metadata and status  
**Row Count**: 1,369

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, NOT NULL | Unique document identifier |
| title | VARCHAR(500) | NOT NULL | Document title |
| document_type | VARCHAR(100) | NOT NULL | Type of correspondence |
| status | VARCHAR(50) | NOT NULL | Current workflow status |
| content | TEXT | NOT NULL | Document content body |
| version | INTEGER | NOT NULL | Document version number |
| patient_name | VARCHAR(255) | NULL | Associated patient name |
| patient_id | VARCHAR(50) | NULL | Patient identifier |
| compliance_score | DECIMAL(5,2) | NULL | AI compliance score (0-100) |
| creator_id | INTEGER | NOT NULL | User who created document |
| template_id | INTEGER | NULL | Source template reference |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL | Last modification timestamp |
| approved_at | TIMESTAMP | NULL | Approval timestamp |
| archived_at | TIMESTAMP | NULL | Archive timestamp |

**Relationships**:
- MANY_TO_ONE → users (via creator_id)
- MANY_TO_ONE → templates (via template_id)
- ONE_TO_MANY → workflow_steps (via document_id)
- ONE_TO_MANY → audit_logs (via document_id)

---

### 3. templates
**Description**: Document templates for standardized correspondence  
**Row Count**: 24

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, NOT NULL | Unique template identifier |
| name | VARCHAR(255) | NOT NULL | Template name |
| category | VARCHAR(100) | NOT NULL | Template category |
| content | TEXT | NOT NULL | Template content with placeholders |
| placeholders | JSON | NULL | Dynamic field definitions |
| usage_count | INTEGER | NOT NULL | Number of times used |
| is_active | BOOLEAN | NOT NULL | Template active status |
| created_by | INTEGER | NOT NULL | Creator user ID |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |
| updated_at | TIMESTAMP | NULL | Last update timestamp |

**Relationships**:
- ONE_TO_MANY → documents (via template_id)
- MANY_TO_ONE → users (via created_by)

---

### 4. workflow_steps
**Description**: Approval workflow tracking for documents  
**Row Count**: 5,847

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, NOT NULL | Unique step identifier |
| document_id | INTEGER | NOT NULL | Associated document |
| step_name | VARCHAR(100) | NOT NULL | Workflow step name |
| step_order | INTEGER | NOT NULL | Step sequence number |
| status | VARCHAR(50) | NOT NULL | Step status |
| assignee_id | INTEGER | NOT NULL | Assigned user ID |
| completed_by | INTEGER | NULL | User who completed step |
| comments | TEXT | NULL | Approval/rejection comments |
| deadline | TIMESTAMP | NULL | Step deadline |
| completed_at | TIMESTAMP | NULL | Completion timestamp |
| created_at | TIMESTAMP | NOT NULL | Step creation timestamp |

**Relationships**:
- MANY_TO_ONE → documents (via document_id)
- MANY_TO_ONE → users (via assignee_id)
- MANY_TO_ONE → users (via completed_by)

---

### 5. compliance_checks
**Description**: AI-powered compliance verification results  
**Row Count**: 3,421

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, NOT NULL | Unique check identifier |
| document_id | INTEGER | NOT NULL | Checked document |
| check_type | VARCHAR(100) | NOT NULL | Type of compliance check |
| score | DECIMAL(5,2) | NOT NULL | Compliance score (0-100) |
| issues | JSON | NULL | Detected issues array |
| suggestions | JSON | NULL | AI improvement suggestions |
| checked_by_ai | BOOLEAN | NOT NULL | AI vs manual check flag |
| created_at | TIMESTAMP | NOT NULL | Check timestamp |

**Relationships**:
- MANY_TO_ONE → documents (via document_id)

---

### 6. audit_logs
**Description**: Complete audit trail of all system actions  
**Row Count**: 12,456

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, NOT NULL | Unique log identifier |
| user_id | INTEGER | NOT NULL | User who performed action |
| action | VARCHAR(100) | NOT NULL | Action type |
| resource_type | VARCHAR(50) | NOT NULL | Affected resource type |
| resource_id | INTEGER | NULL | Affected resource ID |
| document_id | INTEGER | NULL | Related document ID |
| changes | JSON | NULL | Change details |
| ip_address | VARCHAR(45) | NULL | User IP address |
| user_agent | TEXT | NULL | Browser user agent |
| created_at | TIMESTAMP | NOT NULL | Action timestamp |

**Relationships**:
- MANY_TO_ONE → users (via user_id)
- MANY_TO_ONE → documents (via document_id)

---

### 7. roles
**Description**: User roles for access control  
**Row Count**: 4

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, NOT NULL | Unique role identifier |
| name | VARCHAR(100) | NOT NULL | Role name |
| description | TEXT | NULL | Role description |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |

**Relationships**:
- MANY_TO_MANY → users (through user_roles)
- MANY_TO_MANY → permissions (through role_permissions)

---

### 8. permissions
**Description**: Granular permission definitions  
**Row Count**: 18

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, NOT NULL | Unique permission identifier |
| name | VARCHAR(100) | NOT NULL | Permission name |
| resource | VARCHAR(50) | NOT NULL | Resource type |
| action | VARCHAR(50) | NOT NULL | Action type (view/modify/delete) |
| description | TEXT | NULL | Permission description |

**Relationships**:
- MANY_TO_MANY → roles (through role_permissions)

---

### 9. ai_interactions
**Description**: AI assistant interaction logs and analytics  
**Row Count**: 8,934

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, NOT NULL | Unique interaction identifier |
| user_id | INTEGER | NOT NULL | User who interacted |
| document_id | INTEGER | NULL | Related document |
| interaction_type | VARCHAR(100) | NOT NULL | Type of AI interaction |
| prompt | TEXT | NOT NULL | User prompt/query |
| response | TEXT | NOT NULL | AI response |
| model_used | VARCHAR(100) | NOT NULL | AI model identifier |
| tokens_used | INTEGER | NULL | Token count |
| response_time_ms | INTEGER | NULL | Response time in milliseconds |
| user_rating | INTEGER | NULL | User feedback rating (1-5) |
| created_at | TIMESTAMP | NOT NULL | Interaction timestamp |

**Relationships**:
- MANY_TO_ONE → users (via user_id)
- MANY_TO_ONE → documents (via document_id)

---

### 10. notifications
**Description**: System notifications and alerts  
**Row Count**: 4,567

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, NOT NULL | Unique notification identifier |
| user_id | INTEGER | NOT NULL | Recipient user |
| type | VARCHAR(50) | NOT NULL | Notification type |
| title | VARCHAR(255) | NOT NULL | Notification title |
| message | TEXT | NOT NULL | Notification message |
| document_id | INTEGER | NULL | Related document |
| is_read | BOOLEAN | NOT NULL | Read status |
| read_at | TIMESTAMP | NULL | Read timestamp |
| created_at | TIMESTAMP | NOT NULL | Creation timestamp |

**Relationships**:
- MANY_TO_ONE → users (via user_id)
- MANY_TO_ONE → documents (via document_id)

---

## Relationship Diagram

```
users (47)
├── ONE_TO_MANY → documents (1,369)
│   ├── ONE_TO_MANY → workflow_steps (5,847)
│   ├── ONE_TO_MANY → compliance_checks (3,421)
│   └── ONE_TO_MANY → audit_logs (12,456)
├── ONE_TO_MANY → templates (24)
├── ONE_TO_MANY → ai_interactions (8,934)
├── ONE_TO_MANY → notifications (4,567)
└── MANY_TO_MANY → roles (4)
    └── MANY_TO_MANY → permissions (18)
```

## AI-Generated Schema Recommendations

### 1. Add Document Versioning (High Priority)
Track document history with version snapshots for audit compliance and rollback capability.

### 2. Implement Full-Text Search (Medium Priority)
Add search indexes on content fields for faster document discovery and natural language queries.

### 3. Patient Data Encryption (Critical Priority)
Encrypt PHI fields at rest for enhanced HIPAA compliance and data protection.

### 4. Workflow Analytics Table (Medium Priority)
Create aggregated metrics table for performance dashboards and bottleneck identification.

## Sample Data

### Users Sample
```sql
INSERT INTO users (id, email, username, full_name, is_active, is_superuser, created_at) VALUES
(1, 'sarah.smith@healthcorr.com', 'sarah.smith', 'Dr. Sarah Smith', true, true, '2024-01-15 10:30:00'),
(2, 'robert.wilson@healthcorr.com', 'robert.wilson', 'Dr. Robert Wilson', true, false, '2024-02-10 14:20:00'),
(3, 'emily.chen@healthcorr.com', 'emily.chen', 'Emily Chen', true, false, '2024-01-20 09:15:00');
```

### Documents Sample
```sql
INSERT INTO documents (id, title, document_type, status, patient_name, patient_id, compliance_score, creator_id, version, created_at) VALUES
(1, 'Patient Discharge Summary - John Doe', 'Discharge Summary', 'Approved', 'John Doe', 'PT-2024-001', 98.5, 1, 2, '2024-03-05 11:00:00'),
(2, 'Insurance Pre-Authorization Request', 'Insurance Correspondence', 'Pending Approval', 'Jane Smith', 'PT-2024-002', 95.2, 2, 1, '2024-03-06 14:30:00'),
(3, 'Specialist Referral - Cardiology', 'Referral Letter', 'Under Review', 'Michael Brown', 'PT-2024-003', 97.8, 1, 1, '2024-03-07 09:45:00');
```

## Indexes

### Primary Indexes
- All tables have primary key indexes on `id` column

### Foreign Key Indexes
- documents.creator_id
- documents.template_id
- workflow_steps.document_id
- workflow_steps.assignee_id
- compliance_checks.document_id
- audit_logs.user_id
- audit_logs.document_id
- ai_interactions.user_id
- ai_interactions.document_id
- notifications.user_id
- notifications.document_id

### Performance Indexes
- documents.status
- documents.document_type
- documents.created_at
- workflow_steps.status
- audit_logs.created_at
- ai_interactions.created_at

## Data Retention Policies

- **Documents**: 7 years (HIPAA requirement)
- **Audit Logs**: 7 years (compliance requirement)
- **AI Interactions**: 2 years (analytics)
- **Notifications**: 90 days (after read)
- **Workflow Steps**: Permanent (audit trail)
- **Compliance Checks**: 7 years (regulatory)

## Backup Strategy

- **Full Backup**: Daily at 2:00 AM
- **Incremental Backup**: Every 6 hours
- **Transaction Log Backup**: Every 15 minutes
- **Retention**: 30 days online, 7 years archived
