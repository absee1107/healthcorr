export type DocumentStatus = 
  | 'Draft' 
  | 'Under Review' 
  | 'Pending Approval' 
  | 'Approved' 
  | 'Rejected' 
  | 'In Execution' 
  | 'Completed' 
  | 'Archived';

export type DocumentType = 
  | 'Patient Letter'
  | 'Insurance Correspondence'
  | 'Referral Letter'
  | 'Discharge Summary'
  | 'Fax Transmission'
  | 'Email Communication'
  | 'Legal Document'
  | 'Administrative Memo';

export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  status: DocumentStatus;
  author: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  version: number;
  patientName?: string;
  complianceScore?: number;
  tags: string[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  status: 'pending' | 'completed' | 'current' | 'rejected';
  assignee: string;
  completedAt?: string;
  comments?: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  content: string;
  placeholders: string[];
}

export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  permissions: UserPermissions;
  createdAt: string;
}

export interface UserPermissions {
  documents: ResourcePermissions;
  templates: ResourcePermissions;
  users: ResourcePermissions;
}

export interface ResourcePermissions {
  view: boolean;
  modify: boolean;
  delete: boolean;
}

export interface Role {
  name: string;
  description: string;
  color: string;
  userCount: number;
}
