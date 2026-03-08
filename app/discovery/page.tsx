'use client'

import React, { useState } from 'react'
import { Sidebar, TopNav } from '@/components/Navigation'
import { AIAssistant } from '@/components/AIAssistant'
import { 
  Search, 
  Filter, 
  Calendar,
  User,
  FileText,
  Tag,
  Clock,
  TrendingUp,
  Download,
  Eye,
  MoreVertical,
  Sparkles
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { motion } from 'motion/react'

const DISCOVERY_DATA = [
  {
    id: 'DISC-001',
    title: 'Patient Referral Communications - Q1 2024',
    category: 'Referrals',
    documentCount: 234,
    dateRange: '2024-01-01 to 2024-03-31',
    status: 'Active',
    relevance: 98,
    tags: ['Referral', 'Cardiology', 'Insurance']
  },
  {
    id: 'DISC-002',
    title: 'Insurance Authorization Letters',
    category: 'Insurance',
    documentCount: 156,
    dateRange: '2024-02-15 to 2024-03-15',
    status: 'Active',
    relevance: 95,
    tags: ['Authorization', 'Pre-approval', 'Claims']
  },
  {
    id: 'DISC-003',
    title: 'Lab Results Correspondence',
    category: 'Clinical',
    documentCount: 412,
    dateRange: '2024-01-01 to 2024-03-31',
    status: 'Archived',
    relevance: 92,
    tags: ['Lab Results', 'Pathology', 'Follow-up']
  },
  {
    id: 'DISC-004',
    title: 'Appointment Confirmation Letters',
    category: 'Administrative',
    documentCount: 567,
    dateRange: '2024-03-01 to 2024-03-31',
    status: 'Active',
    relevance: 88,
    tags: ['Appointments', 'Scheduling', 'Reminders']
  },
]

export default function DiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  const handleExportResults = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      collections: DISCOVERY_DATA,
      totalDocuments: DISCOVERY_DATA.reduce((sum, item) => sum + item.documentCount, 0),
      filters: {
        category: selectedCategory,
        searchQuery: searchQuery
      }
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `discovery-results-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Discovery</h1>
              <p className="text-slate-500 mt-1">Search and analyze correspondence patterns across your document repository.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleExportResults}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <Download size={16} />
                Export Results
              </button>
              <button 
                onClick={() => setShowAdvancedFilters(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2"
              >
                <Filter size={16} />
                Advanced Filters
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by keywords, document type, date range..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>All Categories</option>
                <option>Referrals</option>
                <option>Insurance</option>
                <option>Clinical</option>
                <option>Administrative</option>
              </select>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium">
                Last 30 Days
              </button>
              <button className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200">
                Last Quarter
              </button>
              <button className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200">
                Last Year
              </button>
              <button className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-200 flex items-center gap-1">
                <Calendar size={14} />
                Custom Range
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard 
              title="Total Collections" 
              value="4" 
              subtitle="Active discovery sets"
              icon={FileText}
              color="indigo"
            />
            <StatCard 
              title="Documents Found" 
              value="1,369" 
              subtitle="Across all collections"
              icon={Search}
              color="emerald"
            />
            <StatCard 
              title="Avg. Relevance" 
              value="93%" 
              subtitle="Match accuracy"
              icon={TrendingUp}
              color="blue"
            />
            <StatCard 
              title="Date Range" 
              value="Q1 2024" 
              subtitle="Primary period"
              icon={Calendar}
              color="amber"
            />
          </div>

          {/* Discovery Results */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Discovery Collections</h3>
              <p className="text-sm text-slate-500 mt-1">Organized sets of correspondence matching your search criteria</p>
            </div>
            
            <div className="divide-y divide-slate-100">
              {DISCOVERY_DATA.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 hover:bg-slate-50/50 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-slate-900">{item.title}</h4>
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
                          item.status === 'Active' 
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        )}>
                          {item.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <FileText size={14} />
                          {item.documentCount} documents
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {item.dateRange}
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag size={14} />
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        {item.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-500">Relevance Score:</span>
                        <div className="flex-1 max-w-xs h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-500 rounded-full" 
                            style={{ width: `${item.relevance}%` }} 
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{item.relevance}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Advanced Filters Modal */}
      {showAdvancedFilters && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
          >
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Advanced Filters</h3>
              <p className="text-sm text-slate-500 mt-1">Refine your discovery search with detailed criteria</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                    <option>Custom Range</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Document Type</label>
                  <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                    <option>All Types</option>
                    <option>Referrals</option>
                    <option>Insurance</option>
                    <option>Clinical</option>
                    <option>Administrative</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Relevance Score</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="0" max="100" defaultValue="80" className="flex-1" />
                  <span className="text-sm font-bold text-slate-900 w-12">80%+</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Document Count Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="number" 
                    placeholder="Min documents"
                    className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                  <input 
                    type="number" 
                    placeholder="Max documents"
                    className="px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <span className="text-sm">Active</span>
                  </label>
                  <label className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input type="checkbox" className="rounded border-slate-300 text-indigo-600" />
                    <span className="text-sm">Archived</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tags (comma-separated)</label>
                <input 
                  type="text" 
                  placeholder="e.g., Referral, Cardiology, Insurance"
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <Sparkles size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">AI-Powered Search</span>
                </div>
                <p className="text-xs text-indigo-700">
                  Use natural language queries for semantic search across all documents.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowAdvancedFilters(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Filters applied successfully!')
                  setShowAdvancedFilters(false)
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <AIAssistant />
    </div>
  )
}

function StatCard({ title, value, subtitle, icon: Icon, color }: any) {
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
        <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
      </div>
    </motion.div>
  )
}
