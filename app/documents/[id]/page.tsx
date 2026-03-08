'use client'

import React, { useState, useEffect } from 'react'
import { Sidebar, TopNav } from '@/components/Navigation'
import { AIAssistant } from '@/components/AIAssistant'
import { 
  Save, 
  Send, 
  History, 
  FileCheck, 
  AlertCircle, 
  Sparkles, 
  ChevronRight,
  ChevronLeft,
  MoreHorizontal,
  Download,
  Share2,
  CheckCircle2,
  XCircle,
  FileText,
  Loader2,
  ShieldCheck
} from 'lucide-react'
import { MOCK_DOCUMENTS } from '@/lib/mock-data'
import { cn, formatDate, getStatusColor } from '@/lib/utils'
import { motion, AnimatePresence } from 'motion/react'
import { GoogleGenAI } from '@google/genai'

export default function DocumentEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const [doc, setDoc] = useState(MOCK_DOCUMENTS[0]) // Default to first for demo
  const [content, setContent] = useState(doc.content)
  
  // In Next.js 15, params is a Promise - we'll use the default doc for now
  // In production, you would: const { id } = await params; then fetch the doc
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [complianceResults, setComplianceResults] = useState<any>(null)
  const [activeSidebar, setActiveSidebar] = useState<'workflow' | 'compliance' | 'history'>('compliance')

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! })
      const model = 'gemini-3-flash-preview'
      
      const prompt = `Analyze the following healthcare document for compliance with HIPAA, medical terminology accuracy, and professional tone. 
      Return a JSON object with:
      - score: 0-100
      - issues: array of { type: string, severity: 'Low'|'Medium'|'High', message: string }
      - suggestions: array of strings
      
      Document Content:
      ${content}`

      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: { responseMimeType: 'application/json' }
      })

      const result = JSON.parse(response.text || '{}')
      setComplianceResults(result)
    } catch (error) {
      console.error('Analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        
        {/* Editor Toolbar */}
        <div className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <FileText size={18} />
              <span className="text-xs font-medium uppercase tracking-wider">Editor</span>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <h1 className="text-sm font-bold text-slate-900">{doc.title}</h1>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border",
              getStatusColor(doc.status)
            )}>
              {doc.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
              <History size={18} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
              <Download size={18} />
            </button>
            <div className="h-4 w-px bg-slate-200 mx-2" />
            <button className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Save size={14} />
              Save Draft
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all shadow-sm">
              <Send size={14} />
              Submit for Approval
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Editor Area */}
          <div className="flex-1 overflow-y-auto p-12 bg-slate-100/50 flex justify-center">
            <div className="w-full max-w-4xl bg-white shadow-xl shadow-slate-200/50 rounded-sm border border-slate-200 min-h-[1100px] p-16 flex flex-col">
              {/* Document Header Area */}
              <div className="mb-12 border-b border-slate-100 pb-8 flex justify-between items-start">
                <div>
                  <div className="text-2xl font-display font-bold text-slate-900 mb-1">HEALTHCORR MEDICAL CENTER</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-widest">Department of Clinical Services</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900">DATE: {formatDate(new Date())}</div>
                  <div className="text-xs text-slate-500">REF: {doc.id}</div>
                </div>
              </div>

              {/* Editable Content */}
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="flex-1 w-full resize-none border-none focus:ring-0 text-slate-800 leading-relaxed font-serif text-lg p-0 placeholder:text-slate-300"
                placeholder="Start typing your medical correspondence..."
              />

              {/* Document Footer */}
              <div className="mt-12 pt-8 border-t border-slate-100">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="h-10 w-48 border-b border-slate-300 mb-2" />
                    <div className="text-sm font-bold text-slate-900">{doc.author}</div>
                    <div className="text-xs text-slate-500">Attending Physician</div>
                  </div>
                  <div className="text-[10px] text-slate-300 font-mono">
                    CONFIDENTIAL HEALTHCARE INFORMATION • HIPAA PROTECTED
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - AI & Workflow */}
          <div className="w-80 border-l border-slate-200 bg-white flex flex-col shrink-0">
            {/* Sidebar Tabs */}
            <div className="flex border-b border-slate-100">
              <button 
                onClick={() => setActiveSidebar('compliance')}
                className={cn(
                  "flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all",
                  activeSidebar === 'compliance' ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-400 hover:text-slate-600"
                )}
              >
                Compliance
              </button>
              <button 
                onClick={() => setActiveSidebar('workflow')}
                className={cn(
                  "flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all",
                  activeSidebar === 'workflow' ? "text-indigo-600 border-b-2 border-indigo-600" : "text-slate-400 hover:text-slate-600"
                )}
              >
                Workflow
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {activeSidebar === 'compliance' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">AI Analysis</h3>
                    <button 
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 disabled:opacity-50"
                    >
                      {isAnalyzing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                      Run Check
                    </button>
                  </div>

                  {!complianceResults && !isAnalyzing && (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                        <ShieldCheck size={20} className="text-slate-300" />
                      </div>
                      <p className="text-xs text-slate-500 font-medium">No analysis performed yet. Click &quot;Run Check&quot; to verify compliance.</p>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="space-y-4">
                      <div className="h-24 bg-slate-50 animate-pulse rounded-2xl" />
                      <div className="h-12 bg-slate-50 animate-pulse rounded-xl" />
                      <div className="h-12 bg-slate-50 animate-pulse rounded-xl" />
                    </div>
                  )}

                  {complianceResults && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* Score */}
                      <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Compliance Score</div>
                          <div className="text-4xl font-bold">{complianceResults.score}%</div>
                          <div className="mt-2 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-400 rounded-full transition-all duration-1000" 
                              style={{ width: `${complianceResults.score}%` }} 
                            />
                          </div>
                        </div>
                        <Sparkles size={48} className="absolute -bottom-4 -right-4 text-white/5" />
                      </div>

                      {/* Issues */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Detected Issues</h4>
                        {complianceResults.issues.map((issue: any, i: number) => (
                          <div key={i} className="flex gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                            <div className={cn(
                              "shrink-0 w-6 h-6 rounded-lg flex items-center justify-center",
                              issue.severity === 'High' ? "bg-rose-50 text-rose-500" : "bg-amber-50 text-amber-500"
                            )}>
                              <AlertCircle size={14} />
                            </div>
                            <div>
                              <div className="text-[10px] font-bold text-slate-900 uppercase tracking-wider mb-0.5">{issue.type} • {issue.severity}</div>
                              <p className="text-xs text-slate-600 leading-relaxed">{issue.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Suggestions */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Suggestions</h4>
                        <div className="space-y-2">
                          {complianceResults.suggestions.map((s: string, i: number) => (
                            <div key={i} className="flex gap-2 text-xs text-slate-600 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50">
                              <div className="shrink-0 mt-0.5"><CheckCircle2 size={12} className="text-indigo-500" /></div>
                              <p>{s}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {activeSidebar === 'workflow' && (
                <div className="space-y-6">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Approval Workflow</h3>
                  
                  <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100">
                    <WorkflowStep 
                      name="Draft Creation" 
                      status="completed" 
                      assignee="Dr. Sarah Smith" 
                      date="Mar 05, 14:30" 
                    />
                    <WorkflowStep 
                      name="Clinical Review" 
                      status="current" 
                      assignee="Dr. Robert Wilson" 
                      date="Pending" 
                    />
                    <WorkflowStep 
                      name="Compliance Check" 
                      status="pending" 
                      assignee="Compliance Officer" 
                    />
                    <WorkflowStep 
                      name="Final Approval" 
                      status="pending" 
                      assignee="Medical Director" 
                    />
                  </div>

                  <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest mb-3">Workflow Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-all">
                        Approve & Advance
                      </button>
                      <button className="w-full py-2 bg-white border border-slate-200 text-rose-600 rounded-lg text-xs font-bold hover:bg-rose-50 transition-all">
                        Reject / Request Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AIAssistant />
    </div>
  )
}

function WorkflowStep({ name, status, assignee, date }: any) {
  return (
    <div className="relative flex gap-4">
      <div className={cn(
        "z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2",
        status === 'completed' ? "bg-emerald-500 border-emerald-500 text-white" : 
        status === 'current' ? "bg-white border-indigo-600 text-indigo-600" : 
        "bg-white border-slate-200 text-slate-300"
      )}>
        {status === 'completed' ? <CheckCircle2 size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
      </div>
      <div>
        <div className="text-xs font-bold text-slate-900">{name}</div>
        <div className="text-[10px] text-slate-500 font-medium">{assignee}</div>
        {date && <div className="text-[10px] text-slate-400 mt-1">{date}</div>}
      </div>
    </div>
  )
}
