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
  FileText
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

      <AIAssistant />
    </div>
  )
}

function DesignerStep({ icon: Icon, name, role, color }: any) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4 relative"
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
          24h SLA
        </div>
        <button className="p-2 text-slate-300 hover:text-slate-600 transition-all">
          <MoreVertical size={16} />
        </button>
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
