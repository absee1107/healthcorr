// Shared types between frontend and backend

export enum DocumentStatus {
  DRAFT = "draft",
  UNDER_REVIEW = "under_review",
  PENDING_APPROVAL = "pending_approval",
  APPROVED = "approved",
  REJECTED = "rejected",
  IN_EXECUTION = "in_execution",
  COMPLETED = "completed",
  ARCHIVED = "archived"
}

export enum DocumentType {
  PATIENT_LETTER = "patient_letter",
  INSURANCE_CORRESPONDENCE = "insurance_correspondence",
  REFERRAL_LETTER = "referral_letter",
  DISCHARGE_SUMMARY = "discharge_summary",
  FAX_TRANSMISSION = "fax_transmission",
  EMAIL_COMMUNICATION = "email_communication",
  LEGAL_DOCUMENT = "legal_document",
  ADMINISTRATIVE_MEMO = "administrative_memo"
}

export enum ApprovalLevel {
  DRAFT_REVIEW = "draft_review",
  CLINICAL_REVIEW = "clinical_review",
  COMPLIANCE_CHECK = "compliance_check",
  LEGAL_REVIEW = "legal_review",
  FINAL_APPROVAL = "final_approval",
  EXECUTION = "execution"
}

export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  is_active: boolean;
}

export interface Document {
  id: number;
  title: string;
  document_type: DocumentType;
  status: DocumentStatus;
  file_name?: string;
  file_path?: string;
  content?: string;
  created_at: string;
  updated_at?: string;
}

export interface Template {
  id: number;
  name: string;
  description?: string;
  content: string;
  category_id?: number;
  version: number;
}

export interface Workflow {
  id: number;
  name: string;
  document_id: number;
  current_step: number;
  is_parallel: boolean;
}

export interface AIResponse {
  response: string;
}

export interface ComplianceResult {
  analysis: string;
}
