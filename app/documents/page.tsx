'use client'

import React, { useState } from 'react'
import { Sidebar, TopNav } from '@/components/Navigation'
import { AIAssistant } from '@/components/AIAssistant'
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Download, 
  Trash2, 
  Eye,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { MOCK_DOCUMENTS } from '@/lib/mock-data'
import { cn, formatDate, getStatusColor } from '@/lib/utils'
import { motion } from 'motion/react'

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All Types')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showCompareModal, setShowCompareModal] = useState(false)
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('Uploading document:', file.name)
      // Handle file upload logic here
      setShowUploadModal(false)
      alert('Document uploaded successfully!')
    }
  }

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate database insert
    alert('Document created and saved to database!')
    setShowCreateModal(false)
  }

  const toggleDocSelection = (id: string) => {
    setSelectedDocs(prev => 
      prev.includes(id) 
        ? prev.filter(d => d !== id)
        : prev.length < 2 ? [...prev, id] : prev
    )
  }

  const handleDownload = (doc: any) => {
    // Create a blob and download
    const content = `Document: ${doc.title}\nType: ${doc.type}\nStatus: ${doc.status}\n\n${doc.content}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${doc.id}_${doc.title.replace(/\s+/g, '_')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredDocs = MOCK_DOCUMENTS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doc.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === 'All Types' || doc.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav />
        
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Header */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Document Library</h1>
              <p className="text-slate-500 mt-1">Manage, track, and approve healthcare correspondence.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <Plus size={18} />
                Upload Document
              </button>
              {selectedDocs.length === 2 && (
                <button 
                  onClick={() => setShowCompareModal(true)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-medium hover:bg-emerald-700 transition-all shadow-sm flex items-center gap-2"
                >
                  <Sparkles size={18} />
                  Compare Documents
                </button>
              )}
              <button 
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2"
              >
                <Plus size={18} />
                <span>Create Document</span>
              </button>
            </div>
          </div>

          {/* Selection Info */}
          {selectedDocs.length > 0 && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-indigo-600" />
                <span className="text-sm font-medium text-indigo-900">
                  {selectedDocs.length} document{selectedDocs.length > 1 ? 's' : ''} selected
                  {selectedDocs.length === 2 && ' - Ready to compare'}
                </span>
              </div>
              <button 
                onClick={() => setSelectedDocs([])}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
              >
                Clear Selection
              </button>
            </div>
          )}

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by title, ID, or patient name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-slate-400" />
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="text-sm font-medium text-slate-600 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 py-2 pl-3 pr-8"
              >
                <option>All Types</option>
                <option>Patient Letter</option>
                <option>Insurance Correspondence</option>
                <option>Referral Letter</option>
                <option>Discharge Summary</option>
              </select>
            </div>

            <div className="h-8 w-px bg-slate-100" />

            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all flex items-center gap-2 text-sm font-medium">
              <ArrowUpDown size={18} />
              <span>Sort</span>
            </button>
          </div>

          {/* Documents Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Document Name</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Compliance</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDocs.map((doc) => (
                    <tr 
                      key={doc.id} 
                      onClick={() => toggleDocSelection(doc.id)}
                      className={cn(
                        "hover:bg-slate-50/50 transition-colors group cursor-pointer",
                        selectedDocs.includes(doc.id) && "bg-indigo-50 border-l-4 border-indigo-600"
                      )}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {selectedDocs.includes(doc.id) && (
                            <CheckCircle2 size={18} className="text-indigo-600" />
                          )}
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white transition-colors">
                            <FileText size={20} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{doc.title}</div>
                            <div className="text-xs text-slate-500">{doc.id} • v{doc.version}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-600 px-2.5 py-1 bg-slate-100 rounded-full">
                          {doc.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border",
                          getStatusColor(doc.status)
                        )}>
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600 font-medium">{doc.patientName || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                (doc.complianceScore || 0) > 90 ? "bg-emerald-500" : "bg-amber-500"
                              )} 
                              style={{ width: `${doc.complianceScore || 0}%` }} 
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700">{doc.complianceScore || 0}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatDate(doc.updatedAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="View">
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => handleDownload(doc)}
                            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" 
                            title="Download"
                          >
                            <Download size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete">
                            <Trash2 size={18} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                            <MoreVertical size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">{filteredDocs.length}</span> of <span className="font-medium text-slate-900">{filteredDocs.length}</span> results
              </p>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30" disabled>
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-medium">1</button>
                </div>
                <button className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30" disabled>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
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
              <h3 className="text-lg font-bold text-slate-900">Upload Document</h3>
              <p className="text-sm text-slate-500 mt-1">Upload a correspondence document (.docx, .txt, .pdf)</p>
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

      {/* Create Document Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Create New Document</h3>
              <p className="text-sm text-slate-500 mt-1">Fill in the details to create a new correspondence document</p>
            </div>

            <form onSubmit={handleCreateDocument} className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Document Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="e.g., Patient Discharge Summary - John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Document Type</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                    <option>Patient Letter</option>
                    <option>Insurance Correspondence</option>
                    <option>Referral Letter</option>
                    <option>Discharge Summary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Patient ID</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                    placeholder="PT-2024-XXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Patient Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="Full patient name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Document Content</label>
                <textarea 
                  rows={6}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter document content..."
                />
              </div>

              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <Sparkles size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">AI Assistance</span>
                </div>
                <p className="text-xs text-indigo-700">
                  AI will automatically check compliance and suggest improvements after creation.
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
                onClick={handleCreateDocument}
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm"
              >
                Create Document
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Compare Documents Modal */}
      {showCompareModal && selectedDocs.length === 2 && (
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
                  <h3 className="text-lg font-bold text-slate-900">AI Document Comparison</h3>
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
                {selectedDocs.map(id => {
                  const doc = MOCK_DOCUMENTS.find(d => d.id === id)
                  return (
                    <div key={id} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-2">{doc?.title}</h4>
                      <div className="text-xs text-slate-500 space-y-1">
                        <div>Type: {doc?.type}</div>
                        <div>Status: {doc?.status}</div>
                        <div>Compliance: {doc?.complianceScore}%</div>
                        <div>Version: {doc?.version}</div>
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
                    <li>Both documents follow standard formatting guidelines</li>
                    <li>Similar compliance scores (within 5% range)</li>
                    <li>Same document type category</li>
                    <li>HIPAA-compliant language patterns</li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} className="text-amber-600" />
                    <h4 className="font-bold text-amber-900 text-sm">Key Differences</h4>
                  </div>
                  <ul className="text-sm text-amber-800 space-y-1 ml-6">
                    <li>Document 1 has more detailed medical terminology</li>
                    <li>Document 2 includes additional patient demographics</li>
                    <li>Different approval workflow stages</li>
                    <li>Version numbers indicate different revision histories</li>
                  </ul>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-indigo-600" />
                    <h4 className="font-bold text-indigo-900 text-sm">AI Recommendations</h4>
                  </div>
                  <ul className="text-sm text-indigo-800 space-y-1 ml-6">
                    <li>Consider standardizing medical terminology across both documents</li>
                    <li>Document 1 could benefit from additional patient context</li>
                    <li>Both documents are suitable for their intended purposes</li>
                    <li>Recommend using Document 1 as template for similar cases</li>
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
                Export Comparison
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <AIAssistant />
    </div>
  )
}
