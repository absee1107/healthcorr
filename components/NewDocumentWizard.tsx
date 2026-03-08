'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { 
  X,
  FileText,
  User,
  Building2,
  Stethoscope,
  FileCheck,
  Send,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  AlertCircle,
  Clock,
  Shield,
  Scale,
  GitBranch
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NewDocumentWizardProps {
  isOpen: boolean
  onClose: () => void
}

const DOCUMENT_TYPES = [
  { id: 'patient-letter', name: 'Patient Letter', icon: User, description: 'General correspondence to patients' },
  { id: 'discharge-summary', name: 'Discharge Summary', icon: FileText, description: 'Post-treatment patient summary' },
  { id: 'referral', name: 'Referral Letter', icon: Stethoscope, description: 'Specialist referral documentation' },
  { id: 'insurance', name: 'Insurance Correspondence', icon: Building2, description: 'Claims and authorization letters' },
  { id: 'lab-results', name: 'Lab Results', icon: FileCheck, description: 'Laboratory test notifications' },
  { id: 'legal', name: 'Legal Document', icon: Scale, description: 'Legal and compliance documentation' },
]

const DEPARTMENTS = [
  { id: 'cardiology', name: 'Cardiology', color: 'bg-rose-100 text-rose-700' },
  { id: 'orthopedics', name: 'Orthopedics', color: 'bg-blue-100 text-blue-700' },
  { id: 'neurology', name: 'Neurology', color: 'bg-purple-100 text-purple-700' },
  { id: 'pediatrics', name: 'Pediatrics', color: 'bg-pink-100 text-pink-700' },
  { id: 'general', name: 'General Medicine', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'oncology', name: 'Oncology', color: 'bg-amber-100 text-amber-700' },
]

const WORKFLOW_STEPS = [
  { id: 1, name: 'Draft Creation', icon: FileText, role: 'Document Creator', estimatedTime: '30 min' },
  { id: 2, name: 'Clinical Review', icon: Stethoscope, role: 'Attending Physician', estimatedTime: '2-4 hours' },
  { id: 3, name: 'Compliance Check', icon: Shield, role: 'Compliance Officer', estimatedTime: '1-2 hours' },
  { id: 4, name: 'Legal Review', icon: Scale, role: 'Legal Department', estimatedTime: '4-8 hours' },
  { id: 5, name: 'Final Approval', icon: CheckCircle2, role: 'Medical Director', estimatedTime: '2-4 hours' },
  { id: 6, name: 'Distribution', icon: Send, role: 'Automated System', estimatedTime: 'Immediate' },
]

export function NewDocumentWizard({ isOpen, onClose }: NewDocumentWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    documentType: '',
    title: '',
    patientId: '',
    patientName: '',
    department: '',
    priority: 'standard',
    content: '',
    template: '',
    assignedTo: '',
  })

  const totalSteps = 5

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Submitting document:', formData)
    alert('Document created successfully and submitted to workflow!')
    onClose()
    // Reset form
    setCurrentStep(1)
    setFormData({
      documentType: '',
      title: '',
      patientId: '',
      patientName: '',
      department: '',
      priority: 'standard',
      content: '',
      template: '',
      assignedTo: '',
    })
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.documentType !== ''
      case 2:
        return formData.title !== '' && formData.patientName !== ''
      case 3:
        return formData.department !== ''
      case 4:
        return formData.content !== ''
      case 5:
        return true
      default:
        return false
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-600 text-white rounded-xl">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">New Healthcare Correspondence</h2>
                <p className="text-sm text-slate-600">Complete lifecycle document creation</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4, 5].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all",
                    currentStep >= step 
                      ? "bg-indigo-600 text-white" 
                      : "bg-slate-200 text-slate-400"
                  )}>
                    {currentStep > step ? <CheckCircle2 size={20} /> : step}
                  </div>
                  <span className={cn(
                    "text-xs mt-2 font-medium",
                    currentStep >= step ? "text-indigo-600" : "text-slate-400"
                  )}>
                    Step {step}
                  </span>
                </div>
                {step < 5 && (
                  <div className={cn(
                    "flex-1 h-1 mx-2 rounded-full transition-all",
                    currentStep > step ? "bg-indigo-600" : "bg-slate-200"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <StepOne formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 2 && (
              <StepTwo formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 3 && (
              <StepThree formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 4 && (
              <StepFour formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 5 && (
              <StepFive formData={formData} />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="text-sm text-slate-600">
            Step {currentStep} of {totalSteps}
          </div>

          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg"
            >
              <Send size={16} />
              Submit Document
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}


// Step 1: Document Type Selection
function StepOne({ formData, setFormData }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Select Document Type</h3>
        <p className="text-sm text-slate-600">Choose the type of healthcare correspondence you want to create</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {DOCUMENT_TYPES.map((type) => (
          <button
            key={type.id}
            onClick={() => setFormData({ ...formData, documentType: type.id })}
            className={cn(
              "p-4 rounded-xl border-2 text-left transition-all hover:shadow-md",
              formData.documentType === type.id
                ? "border-indigo-600 bg-indigo-50"
                : "border-slate-200 hover:border-slate-300"
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "p-2 rounded-lg",
                formData.documentType === type.id
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600"
              )}>
                <type.icon size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 mb-1">{type.name}</h4>
                <p className="text-xs text-slate-600">{type.description}</p>
              </div>
              {formData.documentType === type.id && (
                <CheckCircle2 size={20} className="text-indigo-600" />
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
        <div className="flex items-center gap-2 text-indigo-600 mb-1">
          <Sparkles size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">AI Assistance</span>
        </div>
        <p className="text-xs text-indigo-700">
          Based on your selection, we'll recommend the best template and workflow for your document.
        </p>
      </div>
    </motion.div>
  )
}

// Step 2: Document Details
function StepTwo({ formData, setFormData }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Document Details</h3>
        <p className="text-sm text-slate-600">Provide basic information about the correspondence</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Document Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Patient Discharge Summary - John Doe"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Patient ID</label>
            <input
              type="text"
              value={formData.patientId}
              onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
              placeholder="PT-2024-XXX"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Patient Name *</label>
            <input
              type="text"
              required
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
              placeholder="Full patient name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Priority Level</label>
          <div className="grid grid-cols-3 gap-3">
            {['standard', 'urgent', 'critical'].map((priority) => (
              <button
                key={priority}
                onClick={() => setFormData({ ...formData, priority })}
                className={cn(
                  "px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all",
                  formData.priority === priority
                    ? priority === 'critical' ? "border-rose-600 bg-rose-50 text-rose-700" :
                      priority === 'urgent' ? "border-amber-600 bg-amber-50 text-amber-700" :
                      "border-indigo-600 bg-indigo-50 text-indigo-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                )}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Select Template (Optional)</label>
          <select
            value={formData.template}
            onChange={(e) => setFormData({ ...formData, template: e.target.value })}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Start from scratch</option>
            <option value="discharge-standard">Standard Discharge Summary</option>
            <option value="referral-specialist">Specialist Referral Template</option>
            <option value="insurance-appeal">Insurance Appeal Letter</option>
            <option value="patient-welcome">Patient Welcome Pack</option>
          </select>
        </div>
      </div>
    </motion.div>
  )
}

// Step 3: Department & Assignment
function StepThree({ formData, setFormData }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Department & Assignment</h3>
        <p className="text-sm text-slate-600">Select the department and assign the document</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-3">Select Department *</label>
        <div className="grid grid-cols-2 gap-3">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept.id}
              onClick={() => setFormData({ ...formData, department: dept.id })}
              className={cn(
                "px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all text-left",
                formData.department === dept.id
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-200 hover:border-slate-300"
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn(
                  "px-2 py-1 rounded-lg text-xs font-bold",
                  formData.department === dept.id ? "bg-indigo-600 text-white" : dept.color
                )}>
                  {dept.name}
                </span>
                {formData.department === dept.id && (
                  <CheckCircle2 size={16} className="text-indigo-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Assign To (Optional)</label>
        <select
          value={formData.assignedTo}
          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Auto-assign based on workflow</option>
          <option value="dr-wilson">Dr. Robert Wilson - Attending Physician</option>
          <option value="dr-chen">Dr. Emily Chen - Compliance Officer</option>
          <option value="dr-brown">Dr. Michael Brown - Department Head</option>
          <option value="legal-team">Legal Department Team</option>
        </select>
      </div>

      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <div className="flex items-center gap-2 text-amber-700 mb-1">
          <AlertCircle size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Department Routing</span>
        </div>
        <p className="text-xs text-amber-700">
          This document will be routed through the {formData.department ? DEPARTMENTS.find(d => d.id === formData.department)?.name : 'selected'} department's standard approval workflow.
        </p>
      </div>
    </motion.div>
  )
}

// Step 4: Content Creation
function StepFour({ formData, setFormData }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Document Content</h3>
        <p className="text-sm text-slate-600">Write or paste the correspondence content</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Content *</label>
        <textarea
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={12}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
          placeholder="Enter the document content here...

Dear {{Patient Name}},

This letter serves to inform you about...

Sincerely,
Medical Team"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-slate-500">
            Use {`{{placeholders}}`} for dynamic fields
          </p>
          <p className="text-xs text-slate-500">
            {formData.content.length} characters
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
          <Sparkles size={16} />
          AI Improve
        </button>
        <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
          <Shield size={16} />
          Check Compliance
        </button>
      </div>
    </motion.div>
  )
}

// Step 5: Review & Workflow Preview
function StepFive({ formData }: any) {
  const selectedType = DOCUMENT_TYPES.find(t => t.id === formData.documentType)
  const selectedDept = DEPARTMENTS.find(d => d.id === formData.department)

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-2">Review & Submit</h3>
        <p className="text-sm text-slate-600">Review your document and see the approval workflow</p>
      </div>

      {/* Document Summary */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <h4 className="font-bold text-slate-900 mb-3">Document Summary</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-slate-500">Type:</span>
            <span className="ml-2 font-medium text-slate-900">{selectedType?.name}</span>
          </div>
          <div>
            <span className="text-slate-500">Priority:</span>
            <span className={cn(
              "ml-2 font-bold uppercase text-xs px-2 py-0.5 rounded",
              formData.priority === 'critical' ? "bg-rose-100 text-rose-700" :
              formData.priority === 'urgent' ? "bg-amber-100 text-amber-700" :
              "bg-blue-100 text-blue-700"
            )}>
              {formData.priority}
            </span>
          </div>
          <div>
            <span className="text-slate-500">Title:</span>
            <span className="ml-2 font-medium text-slate-900">{formData.title}</span>
          </div>
          <div>
            <span className="text-slate-500">Patient:</span>
            <span className="ml-2 font-medium text-slate-900">{formData.patientName}</span>
          </div>
          <div>
            <span className="text-slate-500">Department:</span>
            <span className={cn("ml-2 font-medium px-2 py-0.5 rounded text-xs", selectedDept?.color)}>
              {selectedDept?.name}
            </span>
          </div>
          <div>
            <span className="text-slate-500">Content Length:</span>
            <span className="ml-2 font-medium text-slate-900">{formData.content.length} chars</span>
          </div>
        </div>
      </div>

      {/* Workflow Preview */}
      <div className="bg-white rounded-xl p-4 border border-slate-200">
        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
          <GitBranch size={18} className="text-indigo-600" />
          Approval Workflow Lifecycle
        </h4>
        
        <div className="space-y-3">
          {WORKFLOW_STEPS.map((step, index) => (
            <div key={step.id} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                  <step.icon size={18} />
                </div>
                {index < WORKFLOW_STEPS.length - 1 && (
                  <div className="w-0.5 h-8 bg-slate-200 my-1" />
                )}
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-bold text-slate-900 text-sm">{step.name}</h5>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} />
                    {step.estimatedTime}
                  </div>
                </div>
                <p className="text-xs text-slate-600">{step.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
        <div className="flex items-center gap-2 text-emerald-700 mb-1">
          <CheckCircle2 size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Ready to Submit</span>
        </div>
        <p className="text-xs text-emerald-700">
          Your document will be created and automatically routed through the approval workflow. 
          You'll receive notifications at each stage.
        </p>
      </div>
    </motion.div>
  )
}
