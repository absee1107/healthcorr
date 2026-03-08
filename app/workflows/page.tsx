'use client'

import React, { useState } from 'react'
import { Sidebar, TopNav } from '@/components/Navigation'
import { AIAssistant } from '@/components/AIAssistant'
import { 
  GitBranch, 
  Plus, 
  Settings2, 
  User, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MoreVertical,
  ShieldCheck,
  Stethoscope,
  Scale,
<<<<<<< HEAD
  FileText,
  X,
  AlertCircle,
  FileCheck,
  Users,
  ChevronRight
=======
  FileText
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

const MOCK_WORKFLOWS = [
  {
    id: 'WF-001',
    name: 'Standard Clinical Approval',
    description: 'Default workflow for all medical summaries and referral letters.',
    steps: 4,
    activeDocuments: 12,
    lastModified: '3d ago'
  },
  {
    id: 'WF-002',
    name: 'Urgent Discharge Process',
    description: 'Accelerated workflow for high-priority discharge summaries.',
    steps: 2,
    activeDocuments: 5,
    lastModified: '1w ago'
  },
  {
    id: 'WF-003',
    name: 'Insurance & Billing Review',
    description: 'Compliance-focused workflow for financial correspondence.',
    steps: 5,
    activeDocuments: 8,
    lastModified: '2d ago'
  }
]

export default function WorkflowsPage() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(MOCK_WORKFLOWS[0])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAddStepModal, setShowAddStepModal] = useState(false)
<<<<<<< HEAD
  const [selectedStep, setSelectedStep] = useState<any>(null)

  const workflowSteps = [
    {
      name: 'Draft Creation',
      icon: FileText,
      role: 'Document Creator',
      color: 'bg-slate-100 text-slate-600',
      sla: '24h',
      description: 'Initial document creation with template selection',
      responsibilities: [
        'Select appropriate template',
        'Fill in required fields',
        'Add patient information',
        'Save draft for review'
      ],
      requiredActions: [
        'Complete all mandatory fields',
        'Verify patient demographics',
        'Submit for clinical review',
        'Add relevant attachments'
      ],
      escalation: 'Auto-save every 5 minutes, alert if inactive for 2 hours',
      typicalUsers: ['Medical Secretary', 'Administrative Staff', 'Nurse Coordinator']
    },
    {
      name: 'Clinical Review',
      icon: Stethoscope,
      role: 'Attending Physician',
      color: 'bg-indigo-100 text-indigo-600',
      sla: '24h',
      description: 'Medical accuracy and clinical appropriateness verification',
      responsibilities: [
        'Verify medical accuracy',
        'Check diagnosis codes',
        'Review treatment plans',
        'Validate clinical terminology'
      ],
      requiredActions: [
        'Approve or request changes',
        'Add clinical notes',
        'Verify medication details',
        'Sign off on medical content'
      ],
      escalation: 'Escalate to Department Head after 36 hours',
      typicalUsers: ['Attending Physician', 'Specialist', 'Resident Physician']
    },
    {
      name: 'Compliance Check',
      icon: ShieldCheck,
      role: 'Compliance Officer',
      color: 'bg-emerald-100 text-emerald-600',
      sla: '24h',
      description: 'HIPAA and regulatory compliance verification',
      responsibilities: [
        'Run compliance scans',
        'Verify PHI handling',
        'Check regulatory requirements',
        'Review consent forms'
      ],
      requiredActions: [
        'Review AI compliance report',
        'Approve or flag violations',
        'Document compliance check',
        'Add compliance notes'
      ],
      escalation: 'Immediate alert for critical violations',
      typicalUsers: ['Compliance Officer', 'Privacy Officer', 'Risk Manager']
    },
    {
      name: 'Final Legal Approval',
      icon: Scale,
      role: 'Legal Dept',
      color: 'bg-amber-100 text-amber-600',
      sla: '24h',
      description: 'Legal review and final authorization',
      responsibilities: [
        'Legal liability assessment',
        'Contract review',
        'Risk evaluation',
        'Final authorization'
      ],
      requiredActions: [
        'Approve for distribution',
        'Add legal disclaimers',
        'Digital signature',
        'Authorize execution'
      ],
      escalation: 'Escalate to General Counsel after 48 hours',
      typicalUsers: ['Legal Counsel', 'Risk Attorney', 'Medical Director']
    }
  ]
=======
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Workflow created and saved to database!')
    setShowCreateModal(false)
  }

  const handleAddApprovalLevel = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Approval level added to workflow!')
    setShowAddStepModal(false)
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
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Workflow Designer</h1>
              <p className="text-slate-500 mt-1">Configure and manage document approval chains and automation rules.</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2"
            >
              <Plus size={18} />
              <span>Create Workflow</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Workflows List */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Active Workflows</h3>
              <div className="space-y-3">
                {MOCK_WORKFLOWS.map((wf) => (
                  <button
                    key={wf.id}
                    onClick={() => setSelectedWorkflow(wf)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl border transition-all group",
                      selectedWorkflow.id === wf.id 
                        ? "bg-white border-indigo-600 shadow-md shadow-indigo-100" 
                        : "bg-white border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className={cn(
                        "p-2 rounded-lg transition-colors",
                        selectedWorkflow.id === wf.id ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                      )}>
                        <GitBranch size={18} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{wf.steps} Steps</span>
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">{wf.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{wf.description}</p>
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>{wf.activeDocuments} Active Docs</span>
                      <span>Mod {wf.lastModified}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Designer */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workflow Visualization: {selectedWorkflow.name}</h3>
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all">
                  <Settings2 size={18} />
                </button>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 min-h-[600px] relative overflow-hidden">
                {/* Visual Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
                />

                <div className="relative z-10 flex flex-col items-center gap-12">
<<<<<<< HEAD
                  {workflowSteps.map((step, index) => (
                    <React.Fragment key={step.name}>
                      <button
                        onClick={() => setSelectedStep(step)}
                        className="w-full"
                      >
                        <DesignerStep 
                          icon={step.icon} 
                          name={step.name} 
                          role={step.role} 
                          color={step.color}
                          sla={step.sla}
                        />
                      </button>
                      {index < workflowSteps.length - 1 && <ArrowDown />}
                    </React.Fragment>
                  ))}
=======
                  <DesignerStep 
                    icon={FileText} 
                    name="Draft Creation" 
                    role="Creator" 
                    color="bg-slate-100 text-slate-600" 
                  />
                  <ArrowDown />
                  <DesignerStep 
                    icon={Stethoscope} 
                    name="Clinical Review" 
                    role="Attending Physician" 
                    color="bg-indigo-100 text-indigo-600" 
                  />
                  <ArrowDown />
                  <DesignerStep 
                    icon={ShieldCheck} 
                    name="Compliance Check" 
                    role="Compliance Officer" 
                    color="bg-emerald-100 text-emerald-600" 
                  />
                  <ArrowDown />
                  <DesignerStep 
                    icon={Scale} 
                    name="Final Legal Approval" 
                    role="Legal Dept" 
                    color="bg-amber-100 text-amber-600" 
                  />
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05
                  
                  <div className="w-full max-w-md p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-400 transition-all cursor-pointer group"
                    onClick={() => setShowAddStepModal(true)}
                  >
                    <Plus size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest">Add Approval Level</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
          >
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Create New Workflow</h3>
              <p className="text-sm text-slate-500 mt-1">Design a custom approval workflow for your documents</p>
            </div>

            <form onSubmit={handleCreateWorkflow} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Workflow Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Standard Clinical Approval"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                <textarea 
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe when this workflow should be used..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Document Types</label>
                  <select multiple className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 h-32">
                    <option>Patient Letter</option>
                    <option>Insurance Correspondence</option>
                    <option>Referral Letter</option>
                    <option>Discharge Summary</option>
                    <option>Legal Document</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Priority Level</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                    <option>Standard</option>
                    <option>Urgent</option>
                    <option>Critical</option>
                  </select>
                  
                  <label className="block text-sm font-medium text-slate-700 mb-2 mt-4">Approval Type</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                    <option>Sequential</option>
                    <option>Parallel</option>
                    <option>Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <GitBranch size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">Workflow Configuration</span>
                </div>
                <p className="text-xs text-indigo-700">
                  After creation, you can add approval levels and configure escalation rules.
                </p>
              </div>
            </form>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowCreateModal(false)}
                type="button"
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleCreateWorkflow}
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm"
              >
                Create Workflow
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Approval Level Modal */}
      {showAddStepModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
          >
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add Approval Level</h3>
              <p className="text-sm text-slate-500 mt-1">Configure a new step in the workflow</p>
            </div>

            <form onSubmit={handleAddApprovalLevel} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Step Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Clinical Review"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Assigned Role</label>
                <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                  <option>Attending Physician</option>
                  <option>Compliance Officer</option>
                  <option>Legal Department</option>
                  <option>Medical Director</option>
                  <option>Department Head</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">SLA (Hours)</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="24"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Step Order</label>
                  <input 
                    type="number" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="1"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm text-slate-700">Enable auto-escalation on deadline miss</span>
                </label>
              </div>
            </form>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowAddStepModal(false)}
                type="button"
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddApprovalLevel}
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm"
              >
                Add Level
              </button>
            </div>
          </motion.div>
        </div>
      )}

<<<<<<< HEAD
      {/* Step Detail Modal */}
      {selectedStep && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", selectedStep.color)}>
                    <selectedStep.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedStep.name}</h3>
                    <p className="text-sm text-slate-600">{selectedStep.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStep(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Role and SLA */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <User size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Assigned Role</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">{selectedStep.role}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Clock size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">SLA Target</span>
                  </div>
                  <div className="text-lg font-bold text-slate-900">{selectedStep.sla}</div>
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-indigo-600" />
                  Key Responsibilities
                </h4>
                <div className="space-y-2">
                  {selectedStep.responsibilities.map((resp: string, idx: number) => (
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
                  {selectedStep.requiredActions.map((action: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700">{action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typical Users */}
              <div>
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Users size={18} className="text-blue-600" />
                  Typical Users
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStep.typicalUsers.map((user: string, idx: number) => (
                    <span key={idx} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
                      {user}
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
                <p className="text-sm text-amber-800">{selectedStep.escalation}</p>
              </div>

              {/* Workflow Integration */}
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="flex items-center gap-2 text-indigo-700 mb-2">
                  <GitBranch size={18} />
                  <h4 className="font-bold">Workflow Integration</h4>
                </div>
                <p className="text-sm text-indigo-800">
                  This step is part of the "{selectedWorkflow.name}" workflow and processes {selectedWorkflow.activeDocuments} active documents.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedStep(null)}
                className="px-6 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-100 transition-all"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm">
                Edit Step Configuration
              </button>
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

<<<<<<< HEAD
function DesignerStep({ icon: Icon, name, role, color, sla }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-indigo-300 flex items-center gap-4 relative transition-all cursor-pointer"
=======
function DesignerStep({ icon: Icon, name, role, color }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4 relative"
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05
    >
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-slate-900">{name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <User size={12} className="text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">{role}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1 px-2 py-1 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-400">
          <Clock size={10} />
<<<<<<< HEAD
          {sla} SLA
        </div>
        <div className="p-2 text-slate-300 hover:text-slate-600 transition-all">
          <MoreVertical size={16} />
        </div>
      </div>
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs">
        <ChevronRight size={12} />
=======
          24h SLA
        </div>
        <button className="p-2 text-slate-300 hover:text-slate-600 transition-all">
          <MoreVertical size={16} />
        </button>
>>>>>>> 51dd66adfe27c3d22c81b4fd75a5c036b26d9e05
      </div>
    </motion.div>
  )
}

function ArrowDown() {
  return (
    <div className="flex flex-col items-center gap-1 text-slate-200">
      <div className="w-0.5 h-8 bg-current rounded-full" />
      <ArrowRight size={16} className="rotate-90" />
    </div>
  )
}
