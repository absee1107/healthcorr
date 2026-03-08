'use client'

import React, { useState } from 'react'
import { Sidebar, TopNav } from '@/components/Navigation'
import { AIAssistant } from '@/components/AIAssistant'
import { 
  Database,
  Table,
  Sparkles,
  Download,
  Copy,
  Eye,
  Code,
  FileJson,
  Server,
  Layers,
  Link as LinkIcon,
  Key,
  ChevronDown,
  ChevronRight,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

// Database Schema Definitions
const DATABASE_SCHEMA = {
  tables: [
    {
      name: 'users',
      description: 'System users with authentication and role information',
      rowCount: 47,
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true, nullable: false, description: 'Unique user identifier' },
        { name: 'email', type: 'VARCHAR(255)', primaryKey: false, nullable: false, description: 'User email address' },
        { name: 'username', type: 'VARCHAR(100)', primaryKey: false, nullable: false, description: 'Unique username' },
        { name: 'hashed_password', type: 'VARCHAR(255)', primaryKey: false, nullable: false, description: 'Bcrypt hashed password' },
        { name: 'full_name', type: 'VARCHAR(255)', primaryKey: false, nullable: true, description: 'User full name' },
        { name: 'is_active', type: 'BOOLEAN', primaryKey: false, nullable: false, description: 'Account active status' },
        { name: 'is_superuser', type: 'BOOLEAN', primaryKey: false, nullable: false, description: 'Admin privileges flag' },
        { name: 'created_at', type: 'TIMESTAMP', primaryKey: false, nullable: false, description: 'Account creation timestamp' },
        { name: 'updated_at', type: 'TIMESTAMP', primaryKey: false, nullable: true, description: 'Last update timestamp' },
      ],
      relationships: [
        { type: 'ONE_TO_MANY', target: 'documents', foreignKey: 'creator_id' },
        { type: 'MANY_TO_MANY', target: 'roles', through: 'user_roles' },
      ]
    },

    {
      name: 'documents',
      description: 'Healthcare correspondence documents with metadata and status',
      rowCount: 1369,
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true, nullable: false, description: 'Unique document identifier' },
        { name: 'title', type: 'VARCHAR(500)', primaryKey: false, nullable: false, description: 'Document title' },
        { name: 'document_type', type: 'VARCHAR(100)', primaryKey: false, nullable: false, description: 'Type of correspondence' },
        { name: 'status', type: 'VARCHAR(50)', primaryKey: false, nullable: false, description: 'Current workflow status' },
        { name: 'content', type: 'TEXT', primaryKey: false, nullable: false, description: 'Document content body' },
        { name: 'version', type: 'INTEGER', primaryKey: false, nullable: false, description: 'Document version number' },
        { name: 'patient_name', type: 'VARCHAR(255)', primaryKey: false, nullable: true, description: 'Associated patient name' },
        { name: 'patient_id', type: 'VARCHAR(50)', primaryKey: false, nullable: true, description: 'Patient identifier' },
        { name: 'compliance_score', type: 'DECIMAL(5,2)', primaryKey: false, nullable: true, description: 'AI compliance score (0-100)' },
        { name: 'creator_id', type: 'INTEGER', primaryKey: false, nullable: false, description: 'User who created document' },
        { name: 'template_id', type: 'INTEGER', primaryKey: false, nullable: true, description: 'Source template reference' },
        { name: 'created_at', type: 'TIMESTAMP', primaryKey: false, nullable: false, description: 'Creation timestamp' },
        { name: 'updated_at', type: 'TIMESTAMP', primaryKey: false, nullable: false, description: 'Last modification timestamp' },
        { name: 'approved_at', type: 'TIMESTAMP', primaryKey: false, nullable: true, description: 'Approval timestamp' },
        { name: 'archived_at', type: 'TIMESTAMP', primaryKey: false, nullable: true, description: 'Archive timestamp' },
      ],
      relationships: [
        { type: 'MANY_TO_ONE', target: 'users', foreignKey: 'creator_id' },
        { type: 'MANY_TO_ONE', target: 'templates', foreignKey: 'template_id' },
        { type: 'ONE_TO_MANY', target: 'workflow_steps', foreignKey: 'document_id' },
        { type: 'ONE_TO_MANY', target: 'audit_logs', foreignKey: 'document_id' },
      ]
    },
    {
      name: 'templates',
      description: 'Document templates for standardized correspondence',
      rowCount: 24,
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true, nullable: false, description: 'Unique template identifier' },
        { name: 'name', type: 'VARCHAR(255)', primaryKey: false, nullable: false, description: 'Template name' },
        { name: 'category', type: 'VARCHAR(100)', primaryKey: false, nullable: false, description: 'Template category' },
        { name: 'content', type: 'TEXT', primaryKey: false, nullable: false, description: 'Template content with placeholders' },
        { name: 'placeholders', type: 'JSON', primaryKey: false, nullable: true, description: 'Dynamic field definitions' },
        { name: 'usage_count', type: 'INTEGER', primaryKey: false, nullable: false, description: 'Number of times used' },
        { name: 'is_active', type: 'BOOLEAN', primaryKey: false, nullable: false, description: 'Template active status' },
        { name: 'created_by', type: 'INTEGER', primaryKey: false, nullable: false, description: 'Creator user ID' },
        { name: 'created_at', type: 'TIMESTAMP', primaryKey: false, nullable: false, description: 'Creation timestamp' },
        { name: 'updated_at', type: 'TIMESTAMP', primaryKey: false, nullable: true, description: 'Last update timestamp' },
      ],
      relationships: [
        { type: 'ONE_TO_MANY', target: 'documents', foreignKey: 'template_id' },
        { type: 'MANY_TO_ONE', target: 'users', foreignKey: 'created_by' },
      ]
    },

    {
      name: 'workflow_steps',
      description: 'Approval workflow tracking for documents',
      rowCount: 5847,
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true, nullable: false, description: 'Unique step identifier' },
        { name: 'document_id', type: 'INTEGER', primaryKey: false, nullable: false, description: 'Associated document' },
        { name: 'step_name', type: 'VARCHAR(100)', primaryKey: false, nullable: false, description: 'Workflow step name' },
        { name: 'step_order', type: 'INTEGER', primaryKey: false, nullable: false, description: 'Step sequence number' },
        { name: 'status', type: 'VARCHAR(50)', primaryKey: false, nullable: false, description: 'Step status' },
        { name: 'assignee_id', type: 'INTEGER', primaryKey: false, nullable: false, description: 'Assigned user ID' },
        { name: 'completed_by', type: 'INTEGER', primaryKey: false, nullable: true, description: 'User who completed step' },
        { name: 'comments', type: 'TEXT', primaryKey: false, nullable: true, description: 'Approval/rejection comments' },
        { name: 'deadline', type: 'TIMESTAMP', primaryKey: false, nullable: true, description: 'Step deadline' },
        { name: 'completed_at', type: 'TIMESTAMP', primaryKey: false, nullable: true, description: 'Completion timestamp' },
        { name: 'created_at', type: 'TIMESTAMP', primaryKey: false, nullable: false, description: 'Step creation timestamp' },
      ],
      relationships: [
        { type: 'MANY_TO_ONE', target: 'documents', foreignKey: 'document_id' },
        { type: 'MANY_TO_ONE', target: 'users', foreignKey: 'assignee_id' },
        { type: 'MANY_TO_ONE', target: 'users', foreignKey: 'completed_by' },
      ]
    },
    {
      name: 'compliance_checks',
      description: 'AI-powered compliance verification results',
      rowCount: 3421,
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true, nullable: false, description: 'Unique check identifier' },
        { name: 'document_id', type: 'INTEGER', primaryKey: false, nullable: false, description: 'Checked document' },
        { name: 'check_type', type: 'VARCHAR(100)', primaryKey: false, nullable: false, description: 'Type of compliance check' },
        { name: 'score', type: 'DECIMAL(5,2)', primaryKey: false, nullable: false, description: 'Compliance score (0-100)' },
        { name: 'issues', type: 'JSON', primaryKey: false, nullable: true, description: 'Detected issues array' },
        { name: 'suggestions', type: 'JSON', primaryKey: false, nullable: true, description: 'AI improvement suggestions' },
        { name: 'checked_by_ai', type: 'BOOLEAN', primaryKey: false, nullable: false, description: 'AI vs manual check flag' },
        { name: 'created_at', type: 'TIMESTAMP', primaryKey: false, nullable: false, description: 'Check timestamp' },
      ],
      relationships: [
        { type: 'MANY_TO_ONE', target: 'documents', foreignKey: 'document_id' },
      ]
    },
    {
      name: 'audit_logs',
      description: 'Complete audit trail of all system actions',
      rowCount: 12456,
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true, nullable: false, description: 'Unique log identifier' },
        { name: 'user_id', type: 'INTEGER', primaryKey: false, nullable: false, description: 'User who performed action' },
        { name: 'action', type: 'VARCHAR(100)', primaryKey: false, nullable: false, description: 'Action type' },
        { name: 'resource_type', type: 'VARCHAR(50)', primaryKey: false, nullable: false, description: 'Affected resource type' },
        { name: 'resource_id', type: 'INTEGER', primaryKey: false, nullable: true, description: 'Affected resource ID' },
        { name: 'document_id', type: 'INTEGER', primaryKey: false, nullable: true, description: 'Related document ID' },
        { name: 'changes', type: 'JSON', primaryKey: false, nullable: true, description: 'Change details' },
        { name: 'ip_address', type: 'VARCHAR(45)', primaryKey: false, nullable: true, description: 'User IP address' },
        { name: 'user_agent', type: 'TEXT', primaryKey: false, nullable: true, description: 'Browser user agent' },
        { name: 'created_at', type: 'TIMESTAMP', primaryKey: false, nullable: false, description: 'Action timestamp' },
      ],
      relationships: [
        { type: 'MANY_TO_ONE', target: 'users', foreignKey: 'user_id' },
        { type: 'MANY_TO_ONE', target: 'documents', foreignKey: 'document_id' },
      ]
    },

    {
      name: 'roles',
      description: 'User roles for access control',
      rowCount: 4,
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true, nullable: false, description: 'Unique role identifier' },
        { name: 'name', type: 'VARCHAR(100)', primaryKey: false, nullable: false, description: 'Role name' },
        { name: 'description', type: 'TEXT', primaryKey: false, nullable: true, description: 'Role description' },
        { name: 'created_at', type: 'TIMESTAMP', primaryKey: false, nullable: false, description: 'Creation timestamp' },
      ],
      relationships: [
        { type: 'MANY_TO_MANY', target: 'users', through: 'user_roles' },
        { type: 'MANY_TO_MANY', target: 'permissions', through: 'role_permissions' },
      ]
    },
    {
      name: 'permissions',
      description: 'Granular permission definitions',
      rowCount: 18,
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true, nullable: false, description: 'Unique permission identifier' },
        { name: 'name', type: 'VARCHAR(100)', primaryKey: false, nullable: false, description: 'Permission name' },
        { name: 'resource', type: 'VARCHAR(50)', primaryKey: false, nullable: false, description: 'Resource type' },
        { name: 'action', type: 'VARCHAR(50)', primaryKey: false, nullable: false, description: 'Action type (view/modify/delete)' },
        { name: 'description', type: 'TEXT', primaryKey: false, nullable: true, description: 'Permission description' },
      ],
      relationships: [
        { type: 'MANY_TO_MANY', target: 'roles', through: 'role_permissions' },
      ]
    },
    {
      name: 'ai_interactions',
      description: 'AI assistant interaction logs and analytics',
      rowCount: 8934,
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true, nullable: false, description: 'Unique interaction identifier' },
        { name: 'user_id', type: 'INTEGER', primaryKey: false, nullable: false, description: 'User who interacted' },
        { name: 'document_id', type: 'INTEGER', primaryKey: false, nullable: true, description: 'Related document' },
        { name: 'interaction_type', type: 'VARCHAR(100)', primaryKey: false, nullable: false, description: 'Type of AI interaction' },
        { name: 'prompt', type: 'TEXT', primaryKey: false, nullable: false, description: 'User prompt/query' },
        { name: 'response', type: 'TEXT', primaryKey: false, nullable: false, description: 'AI response' },
        { name: 'model_used', type: 'VARCHAR(100)', primaryKey: false, nullable: false, description: 'AI model identifier' },
        { name: 'tokens_used', type: 'INTEGER', primaryKey: false, nullable: true, description: 'Token count' },
        { name: 'response_time_ms', type: 'INTEGER', primaryKey: false, nullable: true, description: 'Response time in milliseconds' },
        { name: 'user_rating', type: 'INTEGER', primaryKey: false, nullable: true, description: 'User feedback rating (1-5)' },
        { name: 'created_at', type: 'TIMESTAMP', primaryKey: false, nullable: false, description: 'Interaction timestamp' },
      ],
      relationships: [
        { type: 'MANY_TO_ONE', target: 'users', foreignKey: 'user_id' },
        { type: 'MANY_TO_ONE', target: 'documents', foreignKey: 'document_id' },
      ]
    },
    {
      name: 'notifications',
      description: 'System notifications and alerts',
      rowCount: 4567,
      columns: [
        { name: 'id', type: 'INTEGER', primaryKey: true, nullable: false, description: 'Unique notification identifier' },
        { name: 'user_id', type: 'INTEGER', primaryKey: false, nullable: false, description: 'Recipient user' },
        { name: 'type', type: 'VARCHAR(50)', primaryKey: false, nullable: false, description: 'Notification type' },
        { name: 'title', type: 'VARCHAR(255)', primaryKey: false, nullable: false, description: 'Notification title' },
        { name: 'message', type: 'TEXT', primaryKey: false, nullable: false, description: 'Notification message' },
        { name: 'document_id', type: 'INTEGER', primaryKey: false, nullable: true, description: 'Related document' },
        { name: 'is_read', type: 'BOOLEAN', primaryKey: false, nullable: false, description: 'Read status' },
        { name: 'read_at', type: 'TIMESTAMP', primaryKey: false, nullable: true, description: 'Read timestamp' },
        { name: 'created_at', type: 'TIMESTAMP', primaryKey: false, nullable: false, description: 'Creation timestamp' },
      ],
      relationships: [
        { type: 'MANY_TO_ONE', target: 'users', foreignKey: 'user_id' },
        { type: 'MANY_TO_ONE', target: 'documents', foreignKey: 'document_id' },
      ]
    },
  ]
}

// Sample Data for Preview
const SAMPLE_DATA: any = {
  users: [
    { id: 1, email: 'sarah.smith@healthcorr.com', username: 'sarah.smith', full_name: 'Dr. Sarah Smith', is_active: true, is_superuser: true, created_at: '2024-01-15 10:30:00' },
    { id: 2, email: 'robert.wilson@healthcorr.com', username: 'robert.wilson', full_name: 'Dr. Robert Wilson', is_active: true, is_superuser: false, created_at: '2024-02-10 14:20:00' },
    { id: 3, email: 'emily.chen@healthcorr.com', username: 'emily.chen', full_name: 'Emily Chen', is_active: true, is_superuser: false, created_at: '2024-01-20 09:15:00' },
  ],
  documents: [
    { id: 1, title: 'Patient Discharge Summary - John Doe', document_type: 'Discharge Summary', status: 'Approved', patient_name: 'John Doe', patient_id: 'PT-2024-001', compliance_score: 98.5, creator_id: 1, version: 2, created_at: '2024-03-05 11:00:00' },
    { id: 2, title: 'Insurance Pre-Authorization Request', document_type: 'Insurance Correspondence', status: 'Pending Approval', patient_name: 'Jane Smith', patient_id: 'PT-2024-002', compliance_score: 95.2, creator_id: 2, version: 1, created_at: '2024-03-06 14:30:00' },
    { id: 3, title: 'Specialist Referral - Cardiology', document_type: 'Referral Letter', status: 'Under Review', patient_name: 'Michael Brown', patient_id: 'PT-2024-003', compliance_score: 97.8, creator_id: 1, version: 1, created_at: '2024-03-07 09:45:00' },
  ],
  templates: [
    { id: 1, name: 'Standard Discharge Summary', category: 'Clinical', usage_count: 142, is_active: true, created_by: 1, created_at: '2024-01-10 08:00:00' },
    { id: 2, name: 'Insurance Appeal Letter', category: 'Billing', usage_count: 85, is_active: true, created_by: 1, created_at: '2024-01-12 10:30:00' },
    { id: 3, name: 'Specialist Referral', category: 'Clinical', usage_count: 210, is_active: true, created_by: 2, created_at: '2024-01-15 13:20:00' },
  ],
  workflow_steps: [
    { id: 1, document_id: 1, step_name: 'Clinical Review', step_order: 2, status: 'completed', assignee_id: 2, completed_by: 2, comments: 'Approved - all medical details verified', deadline: '2024-03-06 17:00:00', completed_at: '2024-03-05 15:30:00' },
    { id: 2, document_id: 2, step_name: 'Compliance Check', step_order: 3, status: 'current', assignee_id: 3, completed_by: null, comments: null, deadline: '2024-03-08 17:00:00', completed_at: null },
    { id: 3, document_id: 3, step_name: 'Draft Review', step_order: 1, status: 'current', assignee_id: 1, completed_by: null, comments: null, deadline: '2024-03-07 17:00:00', completed_at: null },
  ],
  compliance_checks: [
    { id: 1, document_id: 1, check_type: 'HIPAA Compliance', score: 98.5, checked_by_ai: true, created_at: '2024-03-05 11:05:00' },
    { id: 2, document_id: 2, check_type: 'Medical Terminology', score: 95.2, checked_by_ai: true, created_at: '2024-03-06 14:35:00' },
    { id: 3, document_id: 3, check_type: 'Formatting Guidelines', score: 97.8, checked_by_ai: true, created_at: '2024-03-07 09:50:00' },
  ],
  audit_logs: [
    { id: 1, user_id: 1, action: 'CREATE', resource_type: 'document', resource_id: 1, document_id: 1, ip_address: '192.168.1.100', created_at: '2024-03-05 11:00:00' },
    { id: 2, user_id: 2, action: 'APPROVE', resource_type: 'workflow_step', resource_id: 1, document_id: 1, ip_address: '192.168.1.101', created_at: '2024-03-05 15:30:00' },
    { id: 3, user_id: 1, action: 'UPDATE', resource_type: 'document', resource_id: 1, document_id: 1, ip_address: '192.168.1.100', created_at: '2024-03-05 16:45:00' },
  ],
}

export default function DatabasePage() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [showSchema, setShowSchema] = useState(false)
  const [showSampleData, setShowSampleData] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)

  const selectedTableData = DATABASE_SCHEMA.tables.find(t => t.name === selectedTable)

  const generateAISchema = () => {
    setAiGenerating(true)
    setTimeout(() => {
      setAiGenerating(false)
      alert('AI Schema generation complete! Check the console for SQL output.')
      console.log('Generated SQL Schema:', generateSQLSchema())
    }, 2000)
  }

  const generateSQLSchema = () => {
    return DATABASE_SCHEMA.tables.map(table => {
      const columns = table.columns.map(col => 
        `  ${col.name} ${col.type}${col.primaryKey ? ' PRIMARY KEY' : ''}${!col.nullable ? ' NOT NULL' : ''}`
      ).join(',\n')
      
      return `CREATE TABLE ${table.name} (\n${columns}\n);\n\n-- ${table.description}\n-- Row count: ${table.rowCount}`
    }).join('\n\n')
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
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Database Schema & Data</h1>
              <p className="text-slate-500 mt-1">Healthcare correspondence database structure with AI-generated schema and sample data.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={generateAISchema}
                disabled={aiGenerating}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
              >
                {aiGenerating ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
                {aiGenerating ? 'Generating...' : 'AI Generate Schema'}
              </button>
              <button 
                onClick={() => {
                  const sql = generateSQLSchema()
                  navigator.clipboard.writeText(sql)
                  alert('SQL Schema copied to clipboard!')
                }}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <Copy size={18} />
                Copy SQL
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2">
                <Download size={18} />
                Export Schema
              </button>
            </div>
          </div>

          {/* Database Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Total Tables" value={DATABASE_SCHEMA.tables.length.toString()} icon={Table} color="indigo" />
            <StatCard title="Total Records" value="36,665" icon={Database} color="emerald" />
            <StatCard title="Relationships" value="24" icon={LinkIcon} color="blue" />
            <StatCard title="Indexes" value="42" icon={Key} color="amber" />
          </div>

          {/* Schema Overview */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">Database Tables</h3>
                <p className="text-sm text-slate-500 mt-1">Click on a table to view detailed schema and sample data</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSchema(!showSchema)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    showSchema ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                  )}
                >
                  <Code size={14} className="inline mr-1" />
                  Schema
                </button>
                <button
                  onClick={() => setShowSampleData(!showSampleData)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                    showSampleData ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                  )}
                >
                  <Eye size={14} className="inline mr-1" />
                  Data
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {DATABASE_SCHEMA.tables.map((table, index) => (
                <motion.div
                  key={table.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedTable(table.name)}
                  className={cn(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md",
                    selectedTable === table.name 
                      ? "border-indigo-500 bg-indigo-50" 
                      : "border-slate-200 bg-white hover:border-indigo-300"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-slate-100 text-slate-600 rounded-lg">
                      <Table size={20} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {table.rowCount.toLocaleString()} rows
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">{table.name}</h4>
                  <p className="text-xs text-slate-600 mb-3">{table.description}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>{table.columns.length} columns</span>
                    <span>•</span>
                    <span>{table.relationships.length} relations</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Table Details */}
          {selectedTableData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-indigo-600 text-white rounded-xl">
                    <Table size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedTableData.name}</h3>
                    <p className="text-sm text-slate-600">{selectedTableData.description}</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Layers size={16} className="text-indigo-600" />
                    <span className="text-slate-600">{selectedTableData.columns.length} Columns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LinkIcon size={16} className="text-indigo-600" />
                    <span className="text-slate-600">{selectedTableData.relationships.length} Relationships</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database size={16} className="text-indigo-600" />
                    <span className="text-slate-600">{selectedTableData.rowCount.toLocaleString()} Records</span>
                  </div>
                </div>
              </div>

              {/* Column Schema */}
              {showSchema && (
                <div className="p-6 border-b border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Code size={18} className="text-indigo-600" />
                    Column Schema
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Column Name</th>
                          <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Data Type</th>
                          <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Constraints</th>
                          <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedTableData.columns.map((col, index) => (
                          <tr key={index} className="hover:bg-slate-50">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {col.primaryKey && <Key size={14} className="text-amber-500" />}
                                <span className="font-mono text-sm font-semibold text-slate-900">{col.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-sm font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                                {col.type}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-1">
                                {col.primaryKey && (
                                  <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">PK</span>
                                )}
                                {!col.nullable && (
                                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">NOT NULL</span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-slate-600">{col.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Relationships */}
              <div className="p-6 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <LinkIcon size={18} className="text-indigo-600" />
                  Relationships
                </h4>
                <div className="space-y-2">
                  {selectedTableData.relationships.map((rel, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className={cn(
                        "px-2 py-1 rounded text-xs font-bold",
                        rel.type === 'ONE_TO_MANY' ? "bg-blue-100 text-blue-700" :
                        rel.type === 'MANY_TO_ONE' ? "bg-emerald-100 text-emerald-700" :
                        "bg-purple-100 text-purple-700"
                      )}>
                        {rel.type.replace('_', ' ')}
                      </div>
                      <ChevronRight size={16} className="text-slate-400" />
                      <span className="font-mono text-sm font-semibold text-slate-900">{rel.target}</span>
                      {rel.foreignKey && (
                        <>
                          <span className="text-slate-400">via</span>
                          <span className="font-mono text-sm text-indigo-600">{rel.foreignKey}</span>
                        </>
                      )}
                      {rel.through && (
                        <>
                          <span className="text-slate-400">through</span>
                          <span className="font-mono text-sm text-purple-600">{rel.through}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Data */}
              {showSampleData && SAMPLE_DATA[selectedTableData.name] && (
                <div className="p-6">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Eye size={18} className="text-indigo-600" />
                    Sample Data (First 3 Rows)
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50">
                          {Object.keys(SAMPLE_DATA[selectedTableData.name][0]).map((key) => (
                            <th key={key} className="px-4 py-3 text-xs font-bold text-slate-500 uppercase whitespace-nowrap">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {SAMPLE_DATA[selectedTableData.name].map((row: any, rowIndex: number) => (
                          <tr key={rowIndex} className="hover:bg-slate-50">
                            {Object.values(row).map((value: any, colIndex: number) => (
                              <td key={colIndex} className="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">
                                {typeof value === 'boolean' ? (
                                  value ? (
                                    <CheckCircle2 size={16} className="text-emerald-500" />
                                  ) : (
                                    <AlertCircle size={16} className="text-slate-400" />
                                  )
                                ) : value === null ? (
                                  <span className="text-slate-400 italic">null</span>
                                ) : (
                                  String(value)
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* AI Schema Suggestions */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-200 p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-600 text-white rounded-xl shrink-0">
                <Sparkles size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-2">AI-Generated Schema Recommendations</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Our AI has analyzed healthcare correspondence workflows and suggests the following optimizations:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <RecommendationCard
                    title="Add Document Versioning"
                    description="Track document history with version snapshots for audit compliance"
                    impact="High"
                  />
                  <RecommendationCard
                    title="Implement Full-Text Search"
                    description="Add search indexes on content fields for faster document discovery"
                    impact="Medium"
                  />
                  <RecommendationCard
                    title="Patient Data Encryption"
                    description="Encrypt PHI fields at rest for enhanced HIPAA compliance"
                    impact="Critical"
                  />
                  <RecommendationCard
                    title="Workflow Analytics Table"
                    description="Create aggregated metrics table for performance dashboards"
                    impact="Medium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SQL Generation */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                <FileJson size={20} className="text-indigo-600" />
                Generated SQL Schema
              </h3>
              <p className="text-sm text-slate-500 mt-1">Complete database schema in SQL format</p>
            </div>
            <div className="p-6">
              <div className="bg-slate-900 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-emerald-400 font-mono">
                  <code>{generateSQLSchema().substring(0, 500)}...</code>
                </pre>
              </div>
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(generateSQLSchema())
                    alert('Full SQL schema copied to clipboard!')
                  }}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-all flex items-center gap-2"
                >
                  <Copy size={16} />
                  Copy Full Schema
                </button>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-all flex items-center gap-2">
                  <Download size={16} />
                  Download as .sql
                </button>
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

function StatCard({ title, value, icon: Icon, color }: any) {
  const colorMap: any = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
  }

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
    >
      <div className={cn("p-2.5 rounded-xl w-fit mb-4", colorMap[color])}>
        <Icon size={20} />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
      </div>
    </motion.div>
  )
}

function RecommendationCard({ title, description, impact }: any) {
  const impactColors: any = {
    Critical: "bg-rose-100 text-rose-700 border-rose-200",
    High: "bg-amber-100 text-amber-700 border-amber-200",
    Medium: "bg-blue-100 text-blue-700 border-blue-200",
  }

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200">
      <div className="flex items-start justify-between mb-2">
        <h5 className="font-bold text-slate-900 text-sm">{title}</h5>
        <span className={cn("text-xs font-bold px-2 py-0.5 rounded border", impactColors[impact])}>
          {impact}
        </span>
      </div>
      <p className="text-xs text-slate-600">{description}</p>
    </div>
  )
}
