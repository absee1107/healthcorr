'use client'

import React, { useState } from 'react'
import { Sidebar, TopNav } from '@/components/Navigation'
import { AIAssistant } from '@/components/AIAssistant'
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileWarning,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Info,
  XCircle
} from 'lucide-react'
import { MOCK_DOCUMENTS } from '@/lib/mock-data'
import { cn, formatDate } from '@/lib/utils'
import { motion } from 'motion/react'

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState('All Checks')
  const [isScanning, setIsScanning] = useState(false)
  const [showScanHistory, setShowScanHistory] = useState(false)
  const [showConfigureAI, setShowConfigureAI] = useState(false)

  const handleRunScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setIsScanning(false)
      alert('Full system scan completed! 1,240 documents checked. 48 issues found.')
    }, 3000)
  }

  const complianceIssues = [
    {
      id: 'ISS-001',
      document: 'Discharge Summary - John Doe',
      type: 'Formatting',
      severity: 'Medium',
      description: 'Logo placement does not meet the 2024 branding guidelines.',
      status: 'Open'
    },
    {
      id: 'ISS-002',
      document: 'Insurance Claim Appeal - Aetna',
      type: 'HIPAA',
      severity: 'High',
      description: 'Potential exposure of full SSN in the header section.',
      status: 'In Progress'
    },
    {
      id: 'ISS-003',
      document: 'Patient Welcome Letter',
      type: 'Terminology',
      severity: 'Low',
      description: 'Use of non-standard medical abbreviations detected.',
      status: 'Open'
    },
    {
      id: 'ISS-004',
      document: 'Referral Letter - Cardiology',
      type: 'HIPAA',
      severity: 'Critical',
      description: 'Missing patient consent documentation reference.',
      status: 'Open'
    },
    {
      id: 'ISS-005',
      document: 'Lab Results Notification',
      type: 'Formatting',
      severity: 'Low',
      description: 'Inconsistent date format usage.',
      status: 'Resolved'
    },
  ]

  const filteredIssues = complianceIssues.filter(issue => {
    if (activeTab === 'All Checks') return true
    if (activeTab === 'Critical') return issue.severity === 'High' || issue.severity === 'Critical'
    if (activeTab === 'Warnings') return issue.severity === 'Medium' || issue.severity === 'Low'
    if (activeTab === 'Resolved') return issue.status === 'Resolved'
    return true
  })

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav />
        
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Header */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Compliance & Quality</h1>
              <p className="text-slate-500 mt-1">AI-powered regulatory verification and quality assurance.</p>
            </div>
            <button 
              onClick={handleRunScan}
              disabled={isScanning}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles size={18} />
                  </motion.div>
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Run Full System Scan</span>
                </>
              )}
            </button>
          </div>

          {/* Compliance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                  <CheckCircle2 size={24} />
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">94.5% Overall</span>
              </div>
              <h3 className="text-sm font-medium text-slate-500">Passing Checks</h3>
              <p className="text-2xl font-bold text-slate-900 mt-1">1,172 / 1,240</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                  <AlertTriangle size={24} />
                </div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">12 Critical</span>
              </div>
              <h3 className="text-sm font-medium text-slate-500">Active Issues</h3>
              <p className="text-2xl font-bold text-slate-900 mt-1">48 Issues</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">Last Scan: 2h ago</span>
              </div>
              <h3 className="text-sm font-medium text-slate-500">Regulatory Status</h3>
              <p className="text-2xl font-bold text-slate-900 mt-1">Compliant</p>
            </div>
          </div>

          {/* Active Issues Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <h3 className="font-semibold text-slate-900">Compliance Issues</h3>
                <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg">
                  {['All Checks', 'Critical', 'Warnings', 'Resolved'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "px-3 py-1.5 text-xs font-medium rounded-md transition-all",
                        activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input 
                    type="text" 
                    placeholder="Search issues..."
                    className="pl-9 pr-4 py-1.5 bg-slate-50 border-none rounded-lg text-xs focus:ring-1 focus:ring-indigo-500 w-48"
                  />
                </div>
                <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg">
                  <Filter size={16} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Issue ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredIssues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 text-sm font-mono text-slate-500">{issue.id}</td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-slate-900">{issue.document}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-slate-600 px-2.5 py-1 bg-slate-100 rounded-full">
                          {issue.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={cn(
                            "w-2 h-2 rounded-full",
                            issue.severity === 'Critical' ? "bg-rose-600" :
                            issue.severity === 'High' ? "bg-rose-500" : 
                            issue.severity === 'Medium' ? "bg-amber-500" : "bg-blue-500"
                          )} />
                          <span className={cn(
                            "text-xs font-bold",
                            issue.severity === 'Critical' ? "text-rose-700" :
                            issue.severity === 'High' ? "text-rose-600" : 
                            issue.severity === 'Medium' ? "text-amber-600" : "text-blue-600"
                          )}>
                            {issue.severity}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-600 max-w-xs truncate">{issue.description}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border",
                          issue.status === 'Resolved' ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                          issue.status === 'Open' ? "bg-slate-50 text-slate-600 border-slate-200" : 
                          "bg-blue-50 text-blue-600 border-blue-200"
                        )}>
                          {issue.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-indigo-600 hover:text-indigo-700 text-sm font-bold flex items-center gap-1 ml-auto">
                          Resolve <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Compliance Assistant Card */}
          <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                  <Sparkles size={24} />
                </div>
                <span className="font-bold uppercase tracking-widest text-xs text-indigo-100">AI Compliance Assistant</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Automate your HIPAA & GDPR checks</h2>
              <p className="text-indigo-100 mb-8 leading-relaxed">
                Our Gemini-powered AI scans every document for PII exposure, medical terminology accuracy, and formatting consistency. 
                Enable real-time scanning to catch issues before they reach the approval stage.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setShowConfigureAI(true)}
                  className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg"
                >
                  Configure AI Rules
                </button>
                <button 
                  onClick={() => setShowScanHistory(true)}
                  className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-400 transition-all border border-indigo-400"
                >
                  View Scan History
                </button>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-400/20 rounded-full -mr-10 -mb-10 blur-2xl" />
            <ShieldCheck className="absolute top-1/2 right-12 -translate-y-1/2 text-white/5 w-64 h-64 rotate-12" />
          </div>
        </div>
      </main>

      {/* Scan History Modal */}
      {showScanHistory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Scan History</h3>
                <p className="text-sm text-slate-500 mt-1">Previous compliance scan results</p>
              </div>
              <button 
                onClick={() => setShowScanHistory(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                {[
                  { date: '2024-03-08 14:30', docs: 1240, issues: 48, score: 94.5 },
                  { date: '2024-03-07 09:15', docs: 1235, issues: 52, score: 94.2 },
                  { date: '2024-03-06 16:45', docs: 1228, issues: 45, score: 94.8 },
                  { date: '2024-03-05 11:20', docs: 1220, issues: 58, score: 93.8 },
                  { date: '2024-03-04 08:30', docs: 1215, issues: 61, score: 93.5 },
                ].map((scan, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{scan.date}</div>
                      <div className="text-sm text-slate-600 mt-1">
                        {scan.docs} documents scanned • {scan.issues} issues found
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Compliance Score</div>
                        <div className="text-2xl font-bold text-slate-900">{scan.score}%</div>
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setShowScanHistory(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Configure AI Rules Modal */}
      {showConfigureAI && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Configure AI Compliance Rules</h3>
                <p className="text-sm text-slate-500 mt-1">Customize automated compliance checking</p>
              </div>
              <button 
                onClick={() => setShowConfigureAI(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 mb-3">HIPAA Compliance Checks</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">PHI Detection</div>
                      <div className="text-xs text-slate-500">Scan for unprotected personal health information</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">SSN Exposure</div>
                      <div className="text-xs text-slate-500">Check for full social security numbers</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Consent Documentation</div>
                      <div className="text-xs text-slate-500">Verify patient consent references</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-3">Formatting & Style</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Logo Placement</div>
                      <div className="text-xs text-slate-500">Verify branding guidelines compliance</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Date Format Consistency</div>
                      <div className="text-xs text-slate-500">Check for standardized date formats</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-3">Medical Terminology</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Abbreviation Standards</div>
                      <div className="text-xs text-slate-500">Validate medical abbreviations</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <div>
                      <div className="text-sm font-medium text-slate-900">Terminology Accuracy</div>
                      <div className="text-xs text-slate-500">Check medical term usage</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowConfigureAI(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('AI rules updated successfully!')
                  setShowConfigureAI(false)
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm"
              >
                Save Configuration
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <AIAssistant />
    </div>
  )
}
