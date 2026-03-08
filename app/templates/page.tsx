'use client'

import React, { useState } from 'react'
import { Sidebar, TopNav } from '@/components/Navigation'
import { AIAssistant } from '@/components/AIAssistant'
import { 
  Files, 
  Plus, 
  Search, 
  Copy, 
  Edit3, 
  Trash2, 
  Layout, 
  Type, 
  Calendar,
  User,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

const MOCK_TEMPLATES = [
  {
    id: 'TPL-001',
    name: 'Standard Discharge Summary',
    category: 'Clinical',
    lastUsed: '2h ago',
    usageCount: 142,
    placeholders: ['Patient Name', 'Admission Date', 'Diagnosis', 'Medications']
  },
  {
    id: 'TPL-002',
    name: 'Insurance Appeal Letter',
    category: 'Billing',
    lastUsed: '1d ago',
    usageCount: 85,
    placeholders: ['Claim ID', 'Insurance Provider', 'Reason for Appeal']
  },
  {
    id: 'TPL-003',
    name: 'Specialist Referral',
    category: 'Clinical',
    lastUsed: '5h ago',
    usageCount: 210,
    placeholders: ['Referring Physician', 'Specialist Name', 'Clinical Reason']
  },
  {
    id: 'TPL-004',
    name: 'Patient Welcome Pack',
    category: 'Admin',
    lastUsed: '3d ago',
    usageCount: 45,
    placeholders: ['Practice Name', 'Contact Info']
  }
]

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([])
  const [showCompareModal, setShowCompareModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [viewingTemplate, setViewingTemplate] = useState<any>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('Uploading template:', file.name)
      setShowUploadModal(false)
      alert('Template uploaded successfully!')
    }
  }

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate database insert
    alert('Template created and saved to database!')
    setShowCreateModal(false)
  }

  const handleDownload = (template: any) => {
    const content = `Template: ${template.name}\nCategory: ${template.category}\n\nContent would be here...`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${template.name.replace(/\s+/g, '_')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleView = (template: any) => {
    setViewingTemplate(template)
    setShowViewModal(true)
  }

  const handleCompare = () => {
    if (selectedTemplates.length === 2) {
      setShowCompareModal(true)
    }
  }

  const toggleTemplateSelection = (id: string) => {
    setSelectedTemplates(prev => 
      prev.includes(id) 
        ? prev.filter(t => t !== id)
        : prev.length < 2 ? [...prev, id] : prev
    )
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
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Template Library</h1>
              <p className="text-slate-500 mt-1">Standardized document structures for consistent healthcare communication.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                <span>Upload Template</span>
              </button>
              {selectedTemplates.length === 2 && (
                <button 
                  onClick={handleCompare}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-all shadow-sm flex items-center gap-2"
                >
                  <Sparkles size={18} />
                  <span>AI Compare</span>
                </button>
              )}
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2"
              >
                <Plus size={18} />
                <span>Create Template</span>
              </button>
            </div>
          </div>

          {/* Search & Categories */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200">
              {['All', 'Clinical', 'Billing', 'Admin', 'Legal'].map((cat) => (
                <button
                  key={cat}
                  className={cn(
                    "px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
                    cat === 'All' ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Selection Info */}
          {selectedTemplates.length > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-indigo-600" />
                <span className="text-sm font-medium text-indigo-900">
                  {selectedTemplates.length} template{selectedTemplates.length > 1 ? 's' : ''} selected
                  {selectedTemplates.length === 2 && ' - Ready to compare'}
                </span>
              </div>
              <button 
                onClick={() => setSelectedTemplates([])}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Clear Selection
              </button>
            </div>
          )}

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_TEMPLATES.map((tpl) => (
              <motion.div
                key={tpl.id}
                whileHover={{ y: -4 }}
                className={cn(
                  "bg-white rounded-2xl border-2 shadow-sm overflow-hidden flex flex-col group cursor-pointer",
                  selectedTemplates.includes(tpl.id) 
                    ? "border-indigo-500 ring-2 ring-indigo-200" 
                    : "border-slate-200"
                )}
                onClick={() => toggleTemplateSelection(tpl.id)}
              >
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                      <Layout size={24} />
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedTemplates.includes(tpl.id) && (
                        <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                          <CheckCircle2 size={14} />
                        </div>
                      )}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded">
                        {tpl.category}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{tpl.name}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Used {tpl.lastUsed}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{tpl.usageCount} uses</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dynamic Fields</div>
                    <div className="flex flex-wrap gap-1.5">
                      {tpl.placeholders.map((p) => (
                        <span key={p} className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleView(tpl)
                      }}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" 
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownload(tpl)
                      }}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-lg transition-all" 
                      title="Download"
                    >
                      <Download size={16} />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" 
                      title="Edit"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" 
                      title="Duplicate"
                    >
                      <Copy size={16} />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-white rounded-lg transition-all" 
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 bg-white border border-slate-200 text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
                  >
                    Use Template <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Empty State / Create New */}
            <button className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-400 transition-all group">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                <Plus size={24} />
              </div>
              <span className="font-bold text-sm">Add New Template</span>
              <span className="text-xs mt-1">Or import from existing library</span>
            </button>
          </div>
        </div>
      </main>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
          >
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Upload Template</h3>
              <p className="text-sm text-slate-500 mt-1">Upload a document template file (.docx, .txt, .pdf)</p>
            </div>

            <div className="p-6">
              <label className="block">
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 transition-all cursor-pointer">
                  <Plus size={32} className="mx-auto text-slate-400 mb-3" />
                  <p className="text-sm font-medium text-slate-700 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500">DOCX, TXT, PDF up to 10MB</p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".docx,.txt,.pdf"
                  onChange={handleUpload}
                />
              </label>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Create New Template</h3>
              <p className="text-sm text-slate-500 mt-1">Design a reusable template for healthcare correspondence</p>
            </div>

            <form onSubmit={handleCreateTemplate} className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Template Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Standard Discharge Summary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                    <option>Clinical</option>
                    <option>Billing</option>
                    <option>Admin</option>
                    <option>Legal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                    <option>Active</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Dynamic Fields (Placeholders)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Patient Name, Date, Diagnosis (comma-separated)"
                />
                <p className="text-xs text-slate-500 mt-1">These fields will be auto-populated when using the template</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Template Content</label>
                <textarea 
                  rows={8}
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                  placeholder="Enter template content with placeholders like {{Patient Name}}, {{Date}}, etc."
                />
              </div>

              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <Sparkles size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">AI Assistance</span>
                </div>
                <p className="text-xs text-indigo-700">
                  AI will validate template structure and suggest improvements for compliance.
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
                onClick={handleCreateTemplate}
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm"
              >
                Create Template
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingTemplate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{viewingTemplate.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{viewingTemplate.category} • {viewingTemplate.id}</p>
              </div>
              <button 
                onClick={() => setShowViewModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto max-h-[60vh] bg-slate-50">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <div className="prose prose-slate max-w-none">
                  <h2>Template Preview</h2>
                  <p>This is a preview of the <strong>{viewingTemplate.name}</strong> template.</p>
                  
                  <h3>Dynamic Fields:</h3>
                  <ul>
                    {viewingTemplate.placeholders.map((p: string) => (
                      <li key={p}><code>{`{{${p}}}`}</code></li>
                    ))}
                  </ul>

                  <h3>Sample Content:</h3>
                  <p>Dear <code>{`{{Patient Name}}`}</code>,</p>
                  <p>This letter serves to inform you about your recent medical consultation on <code>{`{{Date}}`}</code>.</p>
                  <p>Please contact our office if you have any questions.</p>
                  <p>Sincerely,<br />Medical Team</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => handleDownload(viewingTemplate)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-all shadow-sm flex items-center gap-2"
              >
                <Download size={16} />
                Download
              </button>
              <button 
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Compare Modal */}
      {showCompareModal && selectedTemplates.length === 2 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[85vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">AI Template Comparison</h3>
                  <p className="text-sm text-slate-500 mt-1">Analyzing differences and similarities</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-2 gap-6 mb-6">
                {selectedTemplates.map(id => {
                  const tpl = MOCK_TEMPLATES.find(t => t.id === id)
                  return (
                    <div key={id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2">{tpl?.name}</h4>
                      <div className="text-xs text-slate-500 space-y-1">
                        <div>Category: {tpl?.category}</div>
                        <div>Usage: {tpl?.usageCount} times</div>
                        <div>Fields: {tpl?.placeholders.length}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <h4 className="font-bold text-emerald-900 text-sm">Similarities</h4>
                  </div>
                  <ul className="text-sm text-emerald-800 space-y-1 ml-6">
                    <li>Both templates include patient identification fields</li>
                    <li>Similar professional tone and structure</li>
                    <li>HIPAA-compliant language patterns</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="text-amber-600" />
                    <h4 className="font-bold text-amber-900 text-sm">Key Differences</h4>
                  </div>
                  <ul className="text-sm text-amber-800 space-y-1 ml-6">
                    <li>Template 1 has more detailed medical terminology</li>
                    <li>Template 2 includes insurance-specific fields</li>
                    <li>Different approval workflow requirements</li>
                  </ul>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-indigo-600" />
                    <h4 className="font-bold text-indigo-900 text-sm">AI Recommendations</h4>
                  </div>
                  <ul className="text-sm text-indigo-800 space-y-1 ml-6">
                    <li>Consider merging common fields into a base template</li>
                    <li>Template 1 is better for clinical documentation</li>
                    <li>Template 2 is more suitable for administrative correspondence</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowCompareModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm">
                Create Merged Template
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <AIAssistant />
    </div>
  )
}
