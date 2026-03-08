'use client'

import React, { useState } from 'react'
import { Sidebar, TopNav } from '@/components/Navigation'
import { AIAssistant } from '@/components/AIAssistant'
import { 
  Info,
  FileText,
  GitBranch,
  Shield,
  Sparkles,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Users,
  Zap,
  BarChart3,
  FileCheck,
  Lock,
  Globe,
  Bell,
  Calendar,
  Smartphone,
  Mail,
  Edit3,
  Download,
  QrCode,
  Workflow,
  ChevronRight,
  ChevronDown,
<<<<<<< HEAD
  Database,
  Stethoscope,
  Scale,
  Send,
  X,
  Search,
  Play,
  Loader2
=======
  Database
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'

const LIFECYCLE_STAGES = [
  { name: 'Draft', color: '#64748b', icon: Edit3 },
  { name: 'Under Review', color: '#3b82f6', icon: FileCheck },
  { name: 'Pending Approval', color: '#f59e0b', icon: Clock },
  { name: 'Approved', color: '#10b981', icon: CheckCircle2 },
  { name: 'In Execution', color: '#8b5cf6', icon: Zap },
  { name: 'Completed', color: '#059669', icon: CheckCircle2 },
]

const PERFORMANCE_METRICS = [
  { month: 'Jan', processingTime: 48, approvalCycle: 72, compliance: 92 },
  { month: 'Feb', processingTime: 42, approvalCycle: 65, compliance: 94 },
  { month: 'Mar', processingTime: 38, approvalCycle: 58, compliance: 96 },
  { month: 'Apr', processingTime: 32, approvalCycle: 52, compliance: 97 },
  { month: 'May', processingTime: 28, approvalCycle: 45, compliance: 98 },
  { month: 'Jun', processingTime: 24, approvalCycle: 38, compliance: 98 },
]

const CORRESPONDENCE_TYPES = [
  { name: 'Patient Letters', value: 35, color: '#4f46e5' },
  { name: 'Insurance Claims', value: 25, color: '#06b6d4' },
  { name: 'Referrals', value: 20, color: '#10b981' },
  { name: 'Lab Results', value: 12, color: '#f59e0b' },
  { name: 'Legal Documents', value: 8, color: '#ef4444' },
]

const APPROVAL_LEVELS = [
<<<<<<< HEAD
  { 
    level: 1, 
    name: 'Draft Review', 
    description: 'Initial content and structure review', 
    avgTime: '4 hours',
    icon: Edit3,
    color: 'bg-slate-100 text-slate-600',
    responsibilities: [
      'Review document structure and formatting',
      'Check for completeness of required fields',
      'Verify template compliance',
      'Initial grammar and spelling check'
    ],
    requiredActions: [
      'Approve draft for next stage',
      'Request revisions if needed',
      'Add comments and suggestions',
      'Verify patient information accuracy'
    ],
    escalationRules: 'Auto-escalate to supervisor after 6 hours',
    slaTarget: '4 hours',
    typicalReviewers: ['Document Coordinator', 'Administrative Staff', 'Medical Secretary'],
    sampleWorkflow: {
      documentType: 'Patient Discharge Summary',
      scenario: 'Post-surgery discharge documentation',
      steps: [
        { time: '0:00', action: 'Document created from template', user: 'Medical Secretary' },
        { time: '0:15', action: 'Patient demographics auto-populated', user: 'System' },
        { time: '0:30', action: 'AI suggests relevant medical history', user: 'Gemini AI' },
        { time: '1:00', action: 'Draft completed and submitted', user: 'Medical Secretary' },
        { time: '1:30', action: 'Initial review completed', user: 'Document Coordinator' },
        { time: '2:00', action: 'Approved for clinical review', user: 'Document Coordinator' }
      ],
      aiAssistance: [
        'Auto-populated patient information from EHR',
        'Suggested relevant medical history sections',
        'Grammar and spell-check corrections',
        'Template compliance verification'
      ]
    }
  },
  { 
    level: 2, 
    name: 'Clinical Review', 
    description: 'Medical accuracy and terminology check', 
    avgTime: '8 hours',
    icon: Stethoscope,
    color: 'bg-blue-100 text-blue-600',
    responsibilities: [
      'Verify medical accuracy and terminology',
      'Check diagnosis and treatment information',
      'Ensure clinical appropriateness',
      'Review medication and dosage details'
    ],
    requiredActions: [
      'Validate medical content accuracy',
      'Approve or request clinical corrections',
      'Add clinical notes if necessary',
      'Confirm patient safety considerations'
    ],
    escalationRules: 'Escalate to Department Head after 12 hours',
    slaTarget: '8 hours',
    typicalReviewers: ['Attending Physician', 'Specialist', 'Clinical Director'],
    sampleWorkflow: {
      documentType: 'Specialist Referral Letter',
      scenario: 'Cardiology referral for chest pain evaluation',
      steps: [
        { time: '0:00', action: 'Document received from draft review', user: 'System' },
        { time: '0:10', action: 'AI highlights medical terms for review', user: 'Gemini AI' },
        { time: '1:00', action: 'Physician reviews clinical content', user: 'Dr. Wilson' },
        { time: '2:00', action: 'AI suggests ICD-10 codes', user: 'Gemini AI' },
        { time: '3:00', action: 'Medication dosages verified', user: 'Dr. Wilson' },
        { time: '4:00', action: 'Approved for compliance check', user: 'Dr. Wilson' }
      ],
      aiAssistance: [
        'Medical terminology validation',
        'ICD-10 code suggestions',
        'Drug interaction checks',
        'Clinical guideline compliance'
      ]
    }
  },
  { 
    level: 3, 
    name: 'Compliance Check', 
    description: 'HIPAA, GDPR, and regulatory compliance', 
    avgTime: '6 hours',
    icon: Shield,
    color: 'bg-emerald-100 text-emerald-600',
    responsibilities: [
      'HIPAA compliance verification',
      'PHI handling and privacy checks',
      'Regulatory requirements validation',
      'Consent and authorization review'
    ],
    requiredActions: [
      'Run automated compliance scans',
      'Review AI-generated compliance report',
      'Approve or flag compliance issues',
      'Document compliance verification'
    ],
    escalationRules: 'Immediate escalation for critical violations',
    slaTarget: '6 hours',
    typicalReviewers: ['Compliance Officer', 'Privacy Officer', 'Risk Management'],
    sampleWorkflow: {
      documentType: 'Insurance Authorization Request',
      scenario: 'Pre-authorization for MRI procedure',
      steps: [
        { time: '0:00', action: 'Document received from clinical review', user: 'System' },
        { time: '0:05', action: 'AI runs HIPAA compliance scan', user: 'Gemini AI' },
        { time: '0:10', action: 'Compliance report generated', user: 'Gemini AI' },
        { time: '1:00', action: 'Officer reviews compliance report', user: 'Compliance Officer' },
        { time: '2:00', action: 'PHI handling verified', user: 'Compliance Officer' },
        { time: '3:00', action: 'Approved for legal review', user: 'Compliance Officer' }
      ],
      aiAssistance: [
        'Automated HIPAA compliance scanning',
        'PHI detection and masking',
        'Consent form verification',
        'Regulatory requirement checklist'
      ]
    }
  },
  { 
    level: 4, 
    name: 'Legal Review', 
    description: 'Legal implications and liability assessment', 
    avgTime: '12 hours',
    icon: Scale,
    color: 'bg-amber-100 text-amber-600',
    responsibilities: [
      'Legal liability assessment',
      'Contract and agreement review',
      'Litigation risk evaluation',
      'Regulatory compliance verification'
    ],
    requiredActions: [
      'Review for legal implications',
      'Approve or request legal modifications',
      'Add legal disclaimers if needed',
      'Document legal review completion'
    ],
    escalationRules: 'Escalate to General Counsel after 18 hours',
    slaTarget: '12 hours',
    typicalReviewers: ['Legal Counsel', 'Risk Attorney', 'Compliance Attorney'],
    sampleWorkflow: {
      documentType: 'Medical Records Release',
      scenario: 'Legal subpoena response documentation',
      steps: [
        { time: '0:00', action: 'Document received from compliance', user: 'System' },
        { time: '0:30', action: 'AI identifies legal risk factors', user: 'Gemini AI' },
        { time: '2:00', action: 'Legal counsel reviews content', user: 'Legal Counsel' },
        { time: '4:00', action: 'AI suggests legal disclaimers', user: 'Gemini AI' },
        { time: '6:00', action: 'Liability assessment completed', user: 'Legal Counsel' },
        { time: '8:00', action: 'Approved for final authorization', user: 'Legal Counsel' }
      ],
      aiAssistance: [
        'Legal risk factor identification',
        'Disclaimer template suggestions',
        'Precedent case references',
        'Regulatory compliance verification'
      ]
    }
  },
  { 
    level: 5, 
    name: 'Final Approval', 
    description: 'Executive sign-off and authorization', 
    avgTime: '4 hours',
    icon: CheckCircle2,
    color: 'bg-purple-100 text-purple-600',
    responsibilities: [
      'Executive authorization',
      'Final quality assurance',
      'Strategic alignment check',
      'Authorization to distribute'
    ],
    requiredActions: [
      'Provide final executive approval',
      'Digital signature application',
      'Authorize document distribution',
      'Set distribution parameters'
    ],
    escalationRules: 'Escalate to C-Suite after 6 hours',
    slaTarget: '4 hours',
    typicalReviewers: ['Medical Director', 'Chief Medical Officer', 'Department Chair'],
    sampleWorkflow: {
      documentType: 'Policy Update Announcement',
      scenario: 'Hospital-wide policy change communication',
      steps: [
        { time: '0:00', action: 'Document received from legal review', user: 'System' },
        { time: '0:15', action: 'AI generates executive summary', user: 'Gemini AI' },
        { time: '1:00', action: 'Medical Director reviews document', user: 'Medical Director' },
        { time: '2:00', action: 'Strategic alignment verified', user: 'Medical Director' },
        { time: '3:00', action: 'Digital signature applied', user: 'Medical Director' },
        { time: '3:30', action: 'Approved for distribution', user: 'Medical Director' }
      ],
      aiAssistance: [
        'Executive summary generation',
        'Key points extraction',
        'Impact analysis',
        'Distribution list recommendations'
      ]
    }
  },
  { 
    level: 6, 
    name: 'Execution', 
    description: 'Document distribution and archival', 
    avgTime: '2 hours',
    icon: Send,
    color: 'bg-indigo-100 text-indigo-600',
    responsibilities: [
      'Document distribution to recipients',
      'Delivery confirmation tracking',
      'Archive in document management system',
      'Apply retention policies'
    ],
    requiredActions: [
      'Execute distribution via selected channels',
      'Confirm successful delivery',
      'Archive with proper metadata',
      'Generate audit trail report'
    ],
    escalationRules: 'Auto-retry failed deliveries, alert after 3 attempts',
    slaTarget: '2 hours',
    typicalReviewers: ['Automated System', 'Document Management Team', 'IT Support'],
    sampleWorkflow: {
      documentType: 'Patient Lab Results',
      scenario: 'Automated distribution of test results',
      steps: [
        { time: '0:00', action: 'Document approved for distribution', user: 'System' },
        { time: '0:05', action: 'AI determines optimal delivery method', user: 'Gemini AI' },
        { time: '0:10', action: 'Email and portal notification sent', user: 'System' },
        { time: '0:15', action: 'Delivery confirmation received', user: 'System' },
        { time: '0:30', action: 'Document archived with metadata', user: 'System' },
        { time: '1:00', action: 'Audit trail report generated', user: 'System' }
      ],
      aiAssistance: [
        'Optimal delivery channel selection',
        'Recipient preference analysis',
        'Metadata auto-tagging',
        'Retention policy application'
      ]
    }
  },
]

const AI_DEMO_SCENARIOS = [
  {
    id: 'content-generation',
    title: 'AI Content Generation',
    icon: FileText,
    color: 'bg-indigo-100 text-indigo-600',
    description: 'Generate professional medical correspondence from brief inputs',
    input: 'Patient: John Doe, Age: 45, Diagnosis: Type 2 Diabetes, Follow-up needed',
    output: `Dear Mr. Doe,

Thank you for your recent visit to our clinic. Following your comprehensive evaluation, we have diagnosed you with Type 2 Diabetes Mellitus (ICD-10: E11.9).

Treatment Plan:
• Metformin 500mg twice daily with meals
• Blood glucose monitoring twice daily
• Dietary consultation scheduled
• Follow-up appointment in 4 weeks

Please contact our office if you experience any concerning symptoms or have questions about your treatment plan.

Best regards,
Dr. Sarah Wilson, MD
Internal Medicine`,
    benefits: [
      'Saves 15-20 minutes per document',
      'Ensures consistent professional tone',
      'Includes all required medical elements',
      'Automatically formats according to templates'
    ],
    metrics: {
      timeSaved: '18 min',
      accuracy: '98%',
      consistency: '100%'
    }
  },
  {
    id: 'compliance-check',
    title: 'HIPAA Compliance Scanning',
    icon: Shield,
    color: 'bg-emerald-100 text-emerald-600',
    description: 'Automated detection of compliance violations and privacy risks',
    input: 'Document contains: Patient SSN: 123-45-6789, Full address, Unencrypted email reference',
    output: `Compliance Scan Results:

⚠️ CRITICAL ISSUES (2):
• Social Security Number detected - Must be redacted or encrypted
• Unencrypted email transmission mentioned - HIPAA violation

⚠️ WARNINGS (1):
• Full residential address included - Consider if necessary for purpose

✅ PASSED (8):
• Proper patient consent documented
• Authorization forms attached
• Minimum necessary standard met
• Business associate agreement in place

Recommendation: Remove or encrypt SSN, specify secure transmission method.`,
    benefits: [
      'Prevents costly HIPAA violations',
      'Identifies risks before distribution',
      'Ensures regulatory compliance',
      'Reduces manual review time by 70%'
    ],
    metrics: {
      violationsDetected: '1,240',
      falsePositives: '<2%',
      timeSaved: '45 min'
    }
  },
  {
    id: 'medical-terminology',
    title: 'Medical Terminology Validation',
    icon: Stethoscope,
    color: 'bg-blue-100 text-blue-600',
    description: 'Verify accuracy of medical terms and suggest corrections',
    input: 'Patient presents with acute myocardal infarction, prescribed asprin and metropolol',
    output: `Terminology Analysis:

✅ CORRECT:
• "acute myocardial infarction" - Proper medical term

⚠️ SPELLING ERRORS DETECTED:
• "asprin" → Should be "aspirin" (acetylsalicylic acid)
• "metropolol" → Should be "metoprolol" (beta-blocker)

💡 SUGGESTIONS:
• Consider adding ICD-10 code: I21.9 (Acute myocardial infarction)
• Specify aspirin dosage (typically 81mg or 325mg)
• Specify metoprolol dosage and frequency

✅ DRUG INTERACTION CHECK: No major interactions detected`,
    benefits: [
      'Prevents medication errors',
      'Ensures accurate medical documentation',
      'Suggests proper ICD-10 codes',
      'Checks drug interactions automatically'
    ],
    metrics: {
      errorsDetected: '847',
      accuracy: '99.2%',
      drugInteractions: '23 flagged'
    }
  },
  {
    id: 'sentiment-analysis',
    title: 'Communication Tone Analysis',
    icon: Users,
    color: 'bg-purple-100 text-purple-600',
    description: 'Analyze and optimize tone for patient communications',
    input: 'Your test results show abnormal findings. You need to come in immediately for additional testing.',
    output: `Tone Analysis Results:

📊 CURRENT TONE:
• Directness: High (8/10)
• Empathy: Low (3/10)
• Clarity: Medium (6/10)
• Urgency: High (9/10)

⚠️ CONCERNS:
• May cause unnecessary patient anxiety
• Lacks empathetic language
• Could be perceived as alarming

💡 IMPROVED VERSION:
"We have received your test results and would like to discuss them with you. While some findings require follow-up testing, please know that we are here to support you through this process. We recommend scheduling an appointment within the next few days to review your results and discuss next steps together."

✅ IMPROVED METRICS:
• Empathy: 8/10 (+5)
• Patient Satisfaction: Predicted 85% (+30%)`,
    benefits: [
      'Improves patient satisfaction scores',
      'Reduces anxiety-related callbacks',
      'Maintains professional empathy',
      'Ensures clear communication'
    ],
    metrics: {
      satisfactionIncrease: '+30%',
      callbackReduction: '45%',
      clarityScore: '9.2/10'
    }
  },
  {
    id: 'smart-search',
    title: 'Natural Language Search',
    icon: Search,
    color: 'bg-amber-100 text-amber-600',
    description: 'Find documents using conversational queries',
    input: 'Show me all discharge summaries for diabetic patients from last month that mentioned insulin',
    output: `Search Results (47 documents found):

🎯 TOP MATCHES:
1. Discharge Summary - John Doe (03/15/2026)
   "Type 2 Diabetes, insulin therapy initiated..."
   Relevance: 98% | Department: Endocrinology

2. Discharge Summary - Mary Smith (03/22/2026)
   "Diabetic ketoacidosis, IV insulin protocol..."
   Relevance: 96% | Department: Emergency

3. Discharge Summary - Robert Johnson (03/28/2026)
   "Diabetes management, insulin pump training..."
   Relevance: 94% | Department: Endocrinology

📊 INSIGHTS:
• 47 total matches
• Average length of stay: 3.2 days
• Most common insulin type: Insulin glargine (68%)
• 89% had diabetes education documented

🔍 RELATED SEARCHES:
• "Diabetic patients with complications"
• "Insulin dosage adjustments"
• "Diabetes follow-up appointments"`,
    benefits: [
      'Find documents 10x faster',
      'No need to remember exact terms',
      'Discovers related documents',
      'Provides contextual insights'
    ],
    metrics: {
      searchSpeed: '0.3 sec',
      accuracy: '96%',
      timeSaved: '25 min/day'
    }
  },
  {
    id: 'document-summary',
    title: 'Intelligent Document Summarization',
    icon: FileCheck,
    color: 'bg-rose-100 text-rose-600',
    description: 'Generate concise summaries of lengthy medical documents',
    input: '15-page surgical report with detailed procedure notes, complications, and post-op care',
    output: `Executive Summary:

👤 PATIENT: Jane Doe, 62F
📅 PROCEDURE DATE: March 8, 2026
🏥 PROCEDURE: Laparoscopic cholecystectomy

KEY POINTS:
• Indication: Symptomatic cholelithiasis with recurrent biliary colic
• Procedure: Successful laparoscopic removal of gallbladder
• Duration: 1 hour 45 minutes
• Complications: None
• Blood loss: Minimal (<50ml)

POST-OPERATIVE:
• Recovery: Uneventful, stable vital signs
• Pain management: Adequate with oral analgesics
• Diet: Advanced to regular diet on POD 1
• Discharge: POD 2 in good condition

FOLLOW-UP:
• Clinic visit in 2 weeks
• Pathology: Chronic cholecystitis confirmed
• Return to work: 1-2 weeks
• Activity: No restrictions after 1 week

⚠️ WATCH FOR: Fever, increased pain, jaundice`,
    benefits: [
      'Review documents 90% faster',
      'Extract key clinical information',
      'Identify critical action items',
      'Perfect for handoffs and referrals'
    ],
    metrics: {
      readingTime: '2 min vs 20 min',
      keyPointsExtracted: '100%',
      accuracy: '97%'
    }
  }
=======
  { level: 1, name: 'Draft Review', description: 'Initial content and structure review', avgTime: '4 hours' },
  { level: 2, name: 'Clinical Review', description: 'Medical accuracy and terminology check', avgTime: '8 hours' },
  { level: 3, name: 'Compliance Check', description: 'HIPAA, GDPR, and regulatory compliance', avgTime: '6 hours' },
  { level: 4, name: 'Legal Review', description: 'Legal implications and liability assessment', avgTime: '12 hours' },
  { level: 5, name: 'Final Approval', description: 'Executive sign-off and authorization', avgTime: '4 hours' },
  { level: 6, name: 'Execution', description: 'Document distribution and archival', avgTime: '2 hours' },
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05
]

export default function InfoPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('lifecycle')
<<<<<<< HEAD
  const [selectedApprovalLevel, setSelectedApprovalLevel] = useState<any>(null)
  const [selectedAIDemo, setSelectedAIDemo] = useState<any>(null)
  const [aiDemoLoading, setAiDemoLoading] = useState(false)
  const [aiDemoResult, setAiDemoResult] = useState<any>(null)
=======
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav />
        
        <div className="flex-1 overflow-y-auto p-8 space-y-8">

          {/* Header */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Correspondence Management Information</h1>
              <p className="text-slate-500 mt-1">Complete guide to healthcare correspondence lifecycle and system capabilities.</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2">
              <Download size={18} />
              Export Guide
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Avg. Processing Time" value="24 hrs" change="-50%" icon={Clock} color="indigo" />
            <StatCard title="Approval Cycle" value="38 hrs" change="-47%" icon={GitBranch} color="blue" />
            <StatCard title="Compliance Rate" value="98%" change="+6%" icon={Shield} color="emerald" />
            <StatCard title="User Satisfaction" value="4.8/5" change="+0.5" icon={Users} color="amber" />
          </div>

          {/* Document Lifecycle */}
          <CollapsibleSection
            id="lifecycle"
            title="Document Lifecycle & Status Tracking"
            icon={GitBranch}
            expanded={expandedSection === 'lifecycle'}
            onToggle={toggleSection}
          >
            <div className="space-y-6">
              <p className="text-sm text-slate-600">
                Healthcare correspondence follows a structured lifecycle from creation to archival, ensuring compliance, 
                accuracy, and proper authorization at every stage.
              </p>

              {/* Lifecycle Flow */}
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-6">Lifecycle Stages</h4>
                <div className="relative">
                  <div className="absolute top-8 left-0 right-0 h-0.5 bg-slate-200" />
                  <div className="grid grid-cols-6 gap-4 relative">
                    {LIFECYCLE_STAGES.map((stage, index) => (
                      <motion.div
                        key={stage.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex flex-col items-center"
                      >
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg mb-3 relative z-10"
                          style={{ backgroundColor: stage.color }}
                        >
                          <stage.icon size={24} />
                        </div>
                        <span className="text-xs font-bold text-center text-slate-700">{stage.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatusCard 
                  status="Draft" 
                  description="Initial document creation with template selection and content entry"
                  features={['Template selection', 'Auto-populate fields', 'AI content suggestions', 'Save as draft']}
                />
                <StatusCard 
                  status="Under Review" 
                  description="Peer review for content accuracy and completeness"
                  features={['Collaborative editing', 'Comment threads', 'Change tracking', 'Version control']}
                />
                <StatusCard 
                  status="Pending Approval" 
                  description="Multi-level approval workflow with compliance checks"
                  features={['Approval routing', 'Deadline tracking', 'Escalation rules', 'Notification alerts']}
                />
                <StatusCard 
                  status="Approved" 
                  description="Document authorized for execution and distribution"
                  features={['Digital signatures', 'Approval audit trail', 'Lock editing', 'Generate final version']}
                />
                <StatusCard 
                  status="In Execution" 
                  description="Active distribution and recipient tracking"
                  features={['Email delivery', 'Fax transmission', 'Delivery confirmation', 'Read receipts']}
                />
                <StatusCard 
                  status="Completed" 
                  description="Successfully delivered and archived with retention policy"
                  features={['Archive storage', 'Retention policy', 'Compliance logging', 'Retrieval access']}
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Performance Metrics */}
          <CollapsibleSection
            id="metrics"
            title="Performance Metrics & Analytics"
            icon={BarChart3}
            expanded={expandedSection === 'metrics'}
            onToggle={toggleSection}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Processing Time Chart */}
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-4">Processing Time Reduction (Hours)</h4>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={PERFORMANCE_METRICS}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Line type="monotone" dataKey="processingTime" stroke="#4f46e5" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">50% reduction in average processing time over 6 months</p>
                </div>

                {/* Correspondence Types */}
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-4">Correspondence Type Distribution</h4>
                  <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={CORRESPONDENCE_TYPES}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {CORRESPONDENCE_TYPES.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {CORRESPONDENCE_TYPES.map((type) => (
                      <div key={type.name} className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: type.color }} />
                        <span className="text-slate-600">{type.name} ({type.value}%)</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MetricBox label="Error Reduction" value="87%" trend="down" />
                <MetricBox label="AI Effectiveness" value="94%" trend="up" />
                <MetricBox label="System Adoption" value="92%" trend="up" />
                <MetricBox label="User Satisfaction" value="4.8/5" trend="up" />
              </div>
            </div>
          </CollapsibleSection>

          {/* Approval Workflow */}
          <CollapsibleSection
            id="workflow"
            title="Workflow & Approval Module"
            icon={Workflow}
            expanded={expandedSection === 'workflow'}
            onToggle={toggleSection}
          >
            <div className="space-y-6">
              <p className="text-sm text-slate-600">
                Multi-level approval system with customizable chains, parallel or sequential processing, 
                and automated escalation rules.
              </p>

              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-6">6-Level Approval Process</h4>
                <div className="space-y-4">
                  {APPROVAL_LEVELS.map((level, index) => (
<<<<<<< HEAD
                    <motion.button
=======
                    <motion.div
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05
                      key={level.level}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
<<<<<<< HEAD
                      onClick={() => setSelectedApprovalLevel(level)}
                      className="w-full flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all text-left group"
                    >
                      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0", level.color)}>
                        <level.icon size={20} />
=======
                      className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                        {level.level}
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-slate-900 mb-1">{level.name}</h5>
                        <p className="text-sm text-slate-600 mb-2">{level.description}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock size={12} />
                          <span>Avg. Time: {level.avgTime}</span>
                        </div>
                      </div>
<<<<<<< HEAD
                      <ChevronRight className="text-slate-400 group-hover:text-indigo-600 shrink-0 transition-colors" size={20} />
                    </motion.button>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                  <p className="text-xs text-indigo-700">
                    💡 Click on any approval level to see detailed responsibilities, required actions, and escalation rules.
                  </p>
                </div>
=======
                      <ChevronRight className="text-slate-400 shrink-0" size={20} />
                    </motion.div>
                  ))}
                </div>
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05
              </div>

              {/* Workflow Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureCard
                  title="Customizable Approval Chains"
                  description="Configure approval paths based on document type, department, or urgency level"
                  icon={GitBranch}
                />
                <FeatureCard
                  title="Parallel or Sequential Approval"
                  description="Route documents to multiple approvers simultaneously or in sequence"
                  icon={Workflow}
                />
                <FeatureCard
                  title="Escalation Rules"
                  description="Automatic escalation to higher authority when deadlines are missed"
                  icon={TrendingUp}
                />
                <FeatureCard
                  title="Deadline Tracking"
                  description="SLA monitoring with alerts and notifications for pending approvals"
                  icon={Clock}
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Compliance Features */}
          <CollapsibleSection
            id="compliance"
            title="Compliance & Security Features"
            icon={Shield}
            expanded={expandedSection === 'compliance'}
            onToggle={toggleSection}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ComplianceCard
                  title="HIPAA Compliance"
                  icon={Shield}
                  features={[
                    'PHI encryption at rest and in transit',
                    'Access control and audit logs',
                    'Breach notification system',
                    'Business associate agreements'
                  ]}
                />
                <ComplianceCard
                  title="GDPR Data Handling"
                  icon={Globe}
                  features={[
                    'Right to access and erasure',
                    'Data portability',
                    'Consent management',
                    'Data anonymization tools'
                  ]}
                />
                <ComplianceCard
                  title="Document Retention"
                  icon={FileCheck}
                  features={[
                    'Automated retention policies',
                    'Legal hold capabilities',
                    'Secure archival storage',
                    'Scheduled destruction'
                  ]}
                />
              </div>

              {/* Automated Checks */}
              <div className="bg-white p-6 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4">Automated Compliance Checks</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <CheckItem text="Document against template comparison" />
                  <CheckItem text="Formatting consistency verification" />
                  <CheckItem text="Required fields completeness" />
                  <CheckItem text="Signature requirements validation" />
                  <CheckItem text="Date/time validity checks" />
                  <CheckItem text="Medical terminology accuracy" />
                  <CheckItem text="Paragraph structure matching" />
                  <CheckItem text="Logo placement and quality" />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* AI Integration */}
          <CollapsibleSection
            id="ai"
            title="AI Integration (Gemini AI)"
            icon={Sparkles}
            expanded={expandedSection === 'ai'}
            onToggle={toggleSection}
          >
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-indigo-600 text-white rounded-xl">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Powered by Google Gemini AI</h4>
                    <p className="text-sm text-slate-600">Advanced AI assistance throughout the correspondence lifecycle</p>
                  </div>
                </div>
<<<<<<< HEAD
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">94%</div>
                    <div className="text-xs text-slate-600">AI Accuracy Rate</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">18 min</div>
                    <div className="text-xs text-slate-600">Avg. Time Saved</div>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <div className="text-2xl font-bold text-indigo-600">1,240</div>
                    <div className="text-xs text-slate-600">Issues Prevented</div>
                  </div>
                </div>
              </div>

              {/* Interactive AI Demos */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Play size={18} className="text-indigo-600" />
                  Interactive AI Demonstrations
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  Click on any scenario below to see how Gemini AI assists in real-world healthcare correspondence tasks.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {AI_DEMO_SCENARIOS.map((demo) => (
                    <button
                      key={demo.id}
                      onClick={() => setSelectedAIDemo(demo)}
                      className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all text-left group"
                    >
                      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-3", demo.color)}>
                        <demo.icon size={24} />
                      </div>
                      <h5 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{demo.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">{demo.description}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-indigo-600 font-medium">
                        <Play size={12} />
                        <span>Try Demo</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Traditional AI Feature Cards */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4">Core AI Capabilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AIFeatureCard
                    title="Context-Aware Help"
                    description="Intelligent assistance based on current document context and user actions"
                    features={['Smart suggestions', 'Next step guidance', 'Status prediction']}
                  />
                  <AIFeatureCard
                    title="Content Generation"
                    description="AI-powered document drafting and content improvement"
                    features={['Auto-completion', 'Draft improvement', 'Template recommendations']}
                  />
                  <AIFeatureCard
                    title="Compliance Detection"
                    description="Automated identification of compliance violations and risks"
                    features={['Violation detection', 'Risk assessment', 'Correction suggestions']}
                  />
                  <AIFeatureCard
                    title="Natural Language Search"
                    description="Search documents using conversational queries"
                    features={['Semantic search', 'Key extraction', 'Document summarization']}
                  />
                  <AIFeatureCard
                    title="Medical Terminology"
                    description="Intelligent medical term handling and validation"
                    features={['Term explanation', 'Accuracy checking', 'Synonym suggestions']}
                  />
                  <AIFeatureCard
                    title="Sentiment Analysis"
                    description="Analyze tone and sentiment in patient communications"
                    features={['Tone detection', 'Empathy scoring', 'Language optimization']}
                  />
                </div>
              </div>

              {/* ROI Section */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-emerald-600" />
                  AI-Driven ROI & Impact
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-emerald-600">87%</div>
                    <div className="text-xs text-slate-600 mt-1">Error Reduction</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-600">50%</div>
                    <div className="text-xs text-slate-600 mt-1">Faster Processing</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-600">$125K</div>
                    <div className="text-xs text-slate-600 mt-1">Annual Savings</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-emerald-600">98%</div>
                    <div className="text-xs text-slate-600 mt-1">User Satisfaction</div>
                  </div>
                </div>
=======
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AIFeatureCard
                  title="Context-Aware Help"
                  description="Intelligent assistance based on current document context and user actions"
                  features={['Smart suggestions', 'Next step guidance', 'Status prediction']}
                />
                <AIFeatureCard
                  title="Content Generation"
                  description="AI-powered document drafting and content improvement"
                  features={['Auto-completion', 'Draft improvement', 'Template recommendations']}
                />
                <AIFeatureCard
                  title="Compliance Detection"
                  description="Automated identification of compliance violations and risks"
                  features={['Violation detection', 'Risk assessment', 'Correction suggestions']}
                />
                <AIFeatureCard
                  title="Natural Language Search"
                  description="Search documents using conversational queries"
                  features={['Semantic search', 'Key extraction', 'Document summarization']}
                />
                <AIFeatureCard
                  title="Medical Terminology"
                  description="Intelligent medical term handling and validation"
                  features={['Term explanation', 'Accuracy checking', 'Synonym suggestions']}
                />
                <AIFeatureCard
                  title="Sentiment Analysis"
                  description="Analyze tone and sentiment in patient communications"
                  features={['Tone detection', 'Empathy scoring', 'Language optimization']}
                />
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05
              </div>
            </div>
          </CollapsibleSection>

          {/* Document Generation */}
          <CollapsibleSection
            id="generation"
            title="Document Generation Module"
            icon={FileText}
            expanded={expandedSection === 'generation'}
            onToggle={toggleSection}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FeatureCard
                  title="Template-Based Generation"
                  description="Generate documents from pre-approved templates with dynamic field population"
                  icon={FileText}
                />
                <FeatureCard
                  title="Batch Processing"
                  description="Create multiple documents simultaneously with bulk data import"
                  icon={Zap}
                />
                <FeatureCard
                  title="Data Integration"
                  description="Auto-populate fields from patient records, EHR systems, and databases"
                  icon={GitBranch}
                />
                <FeatureCard
                  title="Multi-Format Export"
                  description="Export documents in PDF, DOCX, HTML, and other formats"
                  icon={Download}
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Advanced Features */}
          <CollapsibleSection
            id="advanced"
            title="Advanced Features & Integrations"
            icon={Zap}
            expanded={expandedSection === 'advanced'}
            onToggle={toggleSection}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <AdvancedFeatureCard
                  title="Digital Signatures"
                  icon={FileCheck}
                  description="Legally binding electronic signatures with certificate validation"
                />
                <AdvancedFeatureCard
                  title="Barcode/QR Generation"
                  icon={QrCode}
                  description="Automatic generation of tracking codes for document identification"
                />
                <AdvancedFeatureCard
                  title="Automated Routing"
                  icon={Workflow}
                  description="Intelligent document routing based on content and metadata"
                />
                <AdvancedFeatureCard
                  title="Bulk Operations"
                  icon={Zap}
                  description="Process multiple documents with single actions"
                />
                <AdvancedFeatureCard
                  title="Expiration Alerts"
                  icon={Bell}
                  description="Automated notifications for document expiration and renewal"
                />
                <AdvancedFeatureCard
                  title="Collaborative Editing"
                  icon={Users}
                  description="Real-time multi-user editing with conflict resolution"
                />
                <AdvancedFeatureCard
                  title="Mobile Responsive"
                  icon={Smartphone}
                  description="Full functionality on tablets and smartphones"
                />
                <AdvancedFeatureCard
                  title="Offline Capability"
                  icon={Download}
                  description="Work without internet connection with automatic sync"
                />
                <AdvancedFeatureCard
                  title="Email Integration"
                  icon={Mail}
                  description="Send and receive documents directly via email"
                />
                <AdvancedFeatureCard
                  title="Calendar Integration"
                  icon={Calendar}
                  description="Sync deadlines and approvals with calendar systems"
                />
                <AdvancedFeatureCard
                  title="Audit Trail"
                  icon={FileCheck}
                  description="Complete history of all document actions and changes"
                />
                <AdvancedFeatureCard
                  title="Version Control"
                  icon={GitBranch}
                  description="Track and manage document versions with rollback capability"
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Healthcare Correspondence Types */}
          <CollapsibleSection
            id="types"
            title="Healthcare Correspondence Types"
            icon={FileText}
            expanded={expandedSection === 'types'}
            onToggle={toggleSection}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <CorrespondenceType
                  title="Patient Letters"
                  examples={['Welcome letters', 'Appointment confirmations', 'Test result notifications', 'Discharge instructions']}
                />
                <CorrespondenceType
                  title="Insurance Correspondence"
                  examples={['Pre-authorization requests', 'Claims submissions', 'Appeal letters', 'Coverage verification']}
                />
                <CorrespondenceType
                  title="Referral Letters"
                  examples={['Specialist referrals', 'Consultation requests', 'Transfer of care', 'Follow-up recommendations']}
                />
                <CorrespondenceType
                  title="Lab & Diagnostic Reports"
                  examples={['Laboratory results', 'Radiology reports', 'Pathology findings', 'Diagnostic summaries']}
                />
                <CorrespondenceType
                  title="Legal Documents"
                  examples={['Medical records requests', 'Subpoena responses', 'Incident reports', 'Consent forms']}
                />
                <CorrespondenceType
                  title="Administrative Memos"
                  examples={['Policy updates', 'Staff communications', 'Vendor correspondence', 'Regulatory notices']}
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Database Schema Link */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Database size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Database Schema & Structure</h3>
                    <p className="text-slate-300 text-sm mt-1">Explore the complete database architecture</p>
                  </div>
                </div>
                <p className="text-slate-300 text-sm mb-6 max-w-2xl">
                  View detailed table schemas, relationships, sample data, and AI-generated SQL for the healthcare 
                  correspondence management system. Includes 9 core tables with 36,000+ records.
                </p>
                <Link 
                  href="/database"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-slate-100 transition-all"
                >
                  <Database size={20} />
                  View Database Schema
                  <ChevronRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

<<<<<<< HEAD
      {/* Approval Level Detail Modal */}
      {selectedApprovalLevel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", selectedApprovalLevel.color)}>
                    <selectedApprovalLevel.icon size={28} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-slate-900">{selectedApprovalLevel.name}</h3>
                      <span className="text-xs font-bold px-2 py-1 bg-indigo-600 text-white rounded-full">
                        Level {selectedApprovalLevel.level}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">{selectedApprovalLevel.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedApprovalLevel(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content with Tabs */}
            <div className="flex-1 overflow-y-auto">
              {/* Tabs */}
              <div className="flex border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
                <button 
                  onClick={() => setAiDemoResult(null)}
                  className={cn(
                    "flex-1 px-6 py-3 text-sm font-medium transition-all",
                    !aiDemoResult ? "text-indigo-600 border-b-2 border-indigo-600 bg-white" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  Details & Requirements
                </button>
                <button 
                  onClick={() => setAiDemoResult('workflow')}
                  className={cn(
                    "flex-1 px-6 py-3 text-sm font-medium transition-all",
                    aiDemoResult === 'workflow' ? "text-indigo-600 border-b-2 border-indigo-600 bg-white" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  Sample Workflow
                </button>
              </div>

              <div className="p-6 space-y-6">
                {!aiDemoResult ? (
                  <>
                    {/* SLA and Timing */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                          <Clock size={16} />
                          <span className="text-xs font-bold uppercase tracking-wider">Average Time</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{selectedApprovalLevel.avgTime}</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                          <AlertCircle size={16} />
                          <span className="text-xs font-bold uppercase tracking-wider">SLA Target</span>
                        </div>
                        <div className="text-2xl font-bold text-slate-900">{selectedApprovalLevel.slaTarget}</div>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-indigo-600" />
                        Key Responsibilities
                      </h4>
                      <div className="space-y-2">
                        {selectedApprovalLevel.responsibilities.map((resp: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </div>
                            <p className="text-sm text-slate-700">{resp}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Required Actions */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <FileCheck size={18} className="text-emerald-600" />
                        Required Actions
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedApprovalLevel.requiredActions.map((action: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-700">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Typical Reviewers */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Users size={18} className="text-blue-600" />
                        Typical Reviewers
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedApprovalLevel.typicalReviewers.map((reviewer: string, idx: number) => (
                          <span key={idx} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
                            {reviewer}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Escalation Rules */}
                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="flex items-center gap-2 text-amber-700 mb-2">
                        <AlertCircle size={18} />
                        <h4 className="font-bold">Escalation Rules</h4>
                      </div>
                      <p className="text-sm text-amber-800">{selectedApprovalLevel.escalationRules}</p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Sample Workflow Tab */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 rounded-xl border border-indigo-200">
                      <h4 className="font-bold text-slate-900 mb-2">{selectedApprovalLevel.sampleWorkflow.documentType}</h4>
                      <p className="text-sm text-slate-600">{selectedApprovalLevel.sampleWorkflow.scenario}</p>
                    </div>

                    {/* Workflow Timeline */}
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Clock size={18} className="text-indigo-600" />
                        Workflow Timeline
                      </h4>
                      <div className="space-y-3 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                        {selectedApprovalLevel.sampleWorkflow.steps.map((step: any, idx: number) => (
                          <div key={idx} className="flex gap-4 relative">
                            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0 relative z-10">
                              {idx + 1}
                            </div>
                            <div className="flex-1 pb-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-bold text-slate-900">{step.action}</span>
                                <span className="text-xs text-slate-500 font-mono">{step.time}</span>
                              </div>
                              <span className="text-xs text-slate-600">{step.user}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Assistance */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-200">
                      <div className="flex items-center gap-2 text-purple-700 mb-3">
                        <Sparkles size={18} />
                        <h4 className="font-bold">AI Assistance in This Workflow</h4>
                      </div>
                      <div className="space-y-2">
                        {selectedApprovalLevel.sampleWorkflow.aiAssistance.map((assistance: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-purple-800">
                            <Zap size={14} className="shrink-0 mt-0.5" />
                            <span>{assistance}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
              <button 
                onClick={() => setSelectedApprovalLevel(null)}
                className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-100 transition-all"
              >
                Close
              </button>
              <div className="flex gap-3">
                {!aiDemoResult && (
                  <button 
                    onClick={() => setAiDemoResult('workflow')}
                    className="px-6 py-2 bg-indigo-100 text-indigo-700 rounded-xl text-sm font-medium hover:bg-indigo-200 transition-all"
                  >
                    View Sample Workflow
                  </button>
                )}
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm">
                  View in Workflows
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* AI Demo Modal */}
      {selectedAIDemo && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", selectedAIDemo.color)}>
                    <selectedAIDemo.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedAIDemo.title}</h3>
                    <p className="text-sm text-slate-600">{selectedAIDemo.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setSelectedAIDemo(null)
                    setAiDemoLoading(false)
                    setAiDemoResult(null)
                  }}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Input Section */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <FileText size={18} className="text-slate-600" />
                  Input
                </h4>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-mono text-sm text-slate-700">
                  {selectedAIDemo.input}
                </div>
              </div>

              {/* AI Processing Button */}
              {!aiDemoResult && (
                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      setAiDemoLoading(true)
                      setTimeout(() => {
                        setAiDemoLoading(false)
                        setAiDemoResult(selectedAIDemo.output)
                      }, 2000)
                    }}
                    disabled={aiDemoLoading}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg flex items-center gap-3 disabled:opacity-50"
                  >
                    {aiDemoLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>AI Processing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} />
                        <span>Run Gemini AI Analysis</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Output Section */}
              {aiDemoResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Sparkles size={18} className="text-indigo-600" />
                      AI Output
                    </h4>
                    <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                      <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans">{aiDemoResult}</pre>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <TrendingUp size={18} className="text-emerald-600" />
                      Key Benefits
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedAIDemo.benefits.map((benefit: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-700">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl text-white">
                    <h4 className="font-bold mb-4">Performance Metrics</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(selectedAIDemo.metrics).map(([key, value]) => (
                        <div key={key}>
                          <div className="text-2xl font-bold text-emerald-400">{String(value)}</div>
                          <div className="text-xs text-slate-300 mt-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between">
              <button 
                onClick={() => {
                  setSelectedAIDemo(null)
                  setAiDemoLoading(false)
                  setAiDemoResult(null)
                }}
                className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-100 transition-all"
              >
                Close
              </button>
              {aiDemoResult && (
                <button 
                  onClick={() => {
                    setAiDemoLoading(false)
                    setAiDemoResult(null)
                  }}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm"
                >
                  Try Again
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

=======
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05
      <AIAssistant />
    </div>
  )
}

// Component Definitions

function StatCard({ title, value, change, icon: Icon, color }: any) {
  const colorMap: any = {
    indigo: "bg-indigo-50 text-indigo-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  }

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-2.5 rounded-xl", colorMap[color])}>
          <Icon size={20} />
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          {change}
        </span>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
      </div>
    </motion.div>
  )
}

function CollapsibleSection({ id, title, icon: Icon, expanded, onToggle, children }: any) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <button
        onClick={() => onToggle(id)}
        className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Icon size={20} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} className="text-slate-400" />
        </motion.div>
      </button>
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-6"
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}

function StatusCard({ status, description, features }: any) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
      <h5 className="font-bold text-slate-900 mb-2">{status}</h5>
      <p className="text-sm text-slate-600 mb-3">{description}</p>
      <ul className="space-y-1">
        {features.map((feature: string) => (
          <li key={feature} className="text-xs text-slate-500 flex items-center gap-2">
            <CheckCircle2 size={12} className="text-emerald-500" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

function MetricBox({ label, value, trend }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-slate-500">{label}</span>
        {trend === 'up' ? (
          <TrendingUp size={14} className="text-emerald-500" />
        ) : (
          <TrendingUp size={14} className="text-emerald-500 rotate-180" />
        )}
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
    </div>
  )
}

function FeatureCard({ title, description, icon: Icon }: any) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
          <Icon size={18} />
        </div>
        <div>
          <h5 className="font-bold text-slate-900 mb-1">{title}</h5>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  )
}

function ComplianceCard({ title, icon: Icon, features }: any) {
  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
          <Icon size={20} />
        </div>
        <h5 className="font-bold text-slate-900">{title}</h5>
      </div>
      <ul className="space-y-2">
        {features.map((feature: string) => (
          <li key={feature} className="text-sm text-slate-600 flex items-start gap-2">
            <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CheckItem({ text }: any) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
      <span>{text}</span>
    </div>
  )
}

function AIFeatureCard({ title, description, features }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border border-indigo-200 hover:shadow-md transition-all">
      <h5 className="font-bold text-slate-900 mb-2">{title}</h5>
      <p className="text-sm text-slate-600 mb-3">{description}</p>
      <div className="flex flex-wrap gap-1">
        {features.map((feature: string) => (
          <span key={feature} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md">
            {feature}
          </span>
        ))}
      </div>
    </div>
  )
}

function AdvancedFeatureCard({ title, icon: Icon, description }: any) {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={18} className="text-indigo-600" />
        <h5 className="font-bold text-slate-900 text-sm">{title}</h5>
      </div>
      <p className="text-xs text-slate-600">{description}</p>
    </div>
  )
}

function CorrespondenceType({ title, examples }: any) {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200">
      <h5 className="font-bold text-slate-900 mb-3">{title}</h5>
      <ul className="space-y-1">
        {examples.map((example: string) => (
          <li key={example} className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-indigo-600 shrink-0">•</span>
            <span>{example}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
