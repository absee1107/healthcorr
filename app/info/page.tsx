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
  Database
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
  { level: 1, name: 'Draft Review', description: 'Initial content and structure review', avgTime: '4 hours' },
  { level: 2, name: 'Clinical Review', description: 'Medical accuracy and terminology check', avgTime: '8 hours' },
  { level: 3, name: 'Compliance Check', description: 'HIPAA, GDPR, and regulatory compliance', avgTime: '6 hours' },
  { level: 4, name: 'Legal Review', description: 'Legal implications and liability assessment', avgTime: '12 hours' },
  { level: 5, name: 'Final Approval', description: 'Executive sign-off and authorization', avgTime: '4 hours' },
  { level: 6, name: 'Execution', description: 'Document distribution and archival', avgTime: '2 hours' },
]

export default function InfoPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('lifecycle')

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
                    <motion.div
                      key={level.level}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                        {level.level}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-bold text-slate-900 mb-1">{level.name}</h5>
                        <p className="text-sm text-slate-600 mb-2">{level.description}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock size={12} />
                          <span>Avg. Time: {level.avgTime}</span>
                        </div>
                      </div>
                      <ChevronRight className="text-slate-400 shrink-0" size={20} />
                    </motion.div>
                  ))}
                </div>
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
