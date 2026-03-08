import { Document } from './types';

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: 'DOC-001',
    title: 'Discharge Summary - John Doe',
    type: 'Discharge Summary',
    status: 'Pending Approval',
    author: 'Dr. Sarah Smith',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-05T14:30:00Z',
    content: 'Patient John Doe was admitted on Feb 25th for acute appendicitis...',
    version: 2,
    patientName: 'John Doe',
    complianceScore: 92,
    tags: ['Urgent', 'Surgery'],
  },
  {
    id: 'DOC-002',
    title: 'Insurance Claim Appeal - Aetna',
    type: 'Insurance Correspondence',
    status: 'Under Review',
    author: 'Michael Chen',
    createdAt: '2024-03-02T09:15:00Z',
    updatedAt: '2024-03-02T09:15:00Z',
    content: 'We are appealing the denial of claim #882910...',
    version: 1,
    patientName: 'Jane Smith',
    complianceScore: 85,
    tags: ['Billing', 'Appeal'],
  },
  {
    id: 'DOC-003',
    title: 'Referral to Cardiology',
    type: 'Referral Letter',
    status: 'Approved',
    author: 'Dr. Robert Wilson',
    createdAt: '2024-02-28T11:45:00Z',
    updatedAt: '2024-03-01T16:20:00Z',
    content: 'Referring patient for evaluation of persistent tachycardia...',
    version: 3,
    patientName: 'Alice Brown',
    complianceScore: 98,
    tags: ['Cardiology', 'Referral'],
  },
  {
    id: 'DOC-004',
    title: 'Patient Welcome Letter',
    type: 'Patient Letter',
    status: 'Draft',
    author: 'Admin Staff',
    createdAt: '2024-03-06T08:00:00Z',
    updatedAt: '2024-03-06T08:00:00Z',
    content: 'Welcome to our practice. We are committed to providing...',
    version: 1,
    tags: ['Admin', 'Welcome'],
  }
];

export const MOCK_STATS = {
  totalDocuments: 1240,
  pendingApprovals: 12,
  complianceRate: 94.5,
  avgProcessingTime: '2.4 days',
  weeklyVolume: [
    { day: 'Mon', count: 45 },
    { day: 'Tue', count: 52 },
    { day: 'Wed', count: 38 },
    { day: 'Thu', count: 65 },
    { day: 'Fri', count: 48 },
    { day: 'Sat', count: 12 },
    { day: 'Sun', count: 8 },
  ]
};
