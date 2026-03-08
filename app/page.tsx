'use client'

import React from 'react'
import { Sidebar, TopNav } from '@/components/Navigation'
import { AIAssistant } from '@/components/AIAssistant'
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  ExternalLink
} from 'lucide-react'
import { MOCK_DOCUMENTS, MOCK_STATS } from '@/lib/mock-data'
import { cn, formatDate, getStatusColor } from '@/lib/utils'
import Link from 'next/link'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import { motion } from 'motion/react'

export default function Dashboard() {
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const handleExportReport = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      stats: MOCK_STATS,
      documents: MOCK_DOCUMENTS,
      summary: {
        totalDocuments: MOCK_STATS.totalDocuments,
        pendingApprovals: MOCK_STATS.pendingApprovals,
        complianceRate: MOCK_STATS.complianceRate,
        avgProcessingTime: MOCK_STATS.avgProcessingTime
      }
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dashboard-report-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleRefreshData = () => {
    setIsRefreshing(true)
    // Simulate data refresh from database
    setTimeout(() => {
      setIsRefreshing(false)
      alert('Data refreshed successfully! All tables have been updated.')
    }, 1500)
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
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Overview</h1>
              <p className="text-slate-500 mt-1">Real-time performance and document lifecycle metrics.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleExportReport}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
              >
                Export Report
              </button>
              <button 
                onClick={handleRefreshData}
                disabled={isRefreshing}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {isRefreshing && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock size={16} />
                  </motion.div>
                )}
                {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Documents" 
              value={MOCK_STATS.totalDocuments.toLocaleString()} 
              change="+12.5%" 
              isPositive={true}
              icon={FileText}
              color="indigo"
            />
            <StatCard 
              title="Pending Approvals" 
              value={MOCK_STATS.pendingApprovals.toString()} 
              change="-2 this week" 
              isPositive={true}
              icon={Clock}
              color="amber"
            />
            <StatCard 
              title="Compliance Rate" 
              value={`${MOCK_STATS.complianceRate}%`} 
              change="+0.8%" 
              isPositive={true}
              icon={CheckCircle2}
              color="emerald"
            />
            <StatCard 
              title="Avg. Processing" 
              value={MOCK_STATS.avgProcessingTime} 
              change="+0.2 days" 
              isPositive={false}
              icon={TrendingUp}
              color="blue"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-slate-900">Weekly Document Volume</h3>
                <select className="text-xs font-medium text-slate-500 bg-slate-50 border-none rounded-lg focus:ring-0">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={MOCK_STATS.weeklyVolume}>
                    <defs>
                      <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }} 
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#4f46e5" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorCount)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-6">Compliance Distribution</h3>
              <div className="space-y-6">
                <ComplianceMetric label="HIPAA Standards" percentage={98} color="bg-emerald-500" />
                <ComplianceMetric label="Medical Terminology" percentage={92} color="bg-indigo-500" />
                <ComplianceMetric label="Formatting Guidelines" percentage={85} color="bg-amber-500" />
                <ComplianceMetric label="Legal Requirements" percentage={95} color="bg-blue-500" />
              </div>
              <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-indigo-600 mb-1">
                  <AlertCircle size={16} />
                  <span className="text-xs font-bold uppercase tracking-wider">AI Insight</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Formatting compliance is down 5% this week. Consider updating the &quot;Patient Welcome&quot; template.
                </p>
              </div>
            </div>
          </div>

          {/* Recent Documents Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Recent Correspondence</h3>
              <Link href="/documents" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View All <ExternalLink size={14} />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Compliance</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_DOCUMENTS.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-white transition-colors">
                            <FileText size={20} />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{doc.title}</div>
                            <div className="text-xs text-slate-500">{doc.id} • {doc.author}</div>
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
                          <span className="text-xs font-bold text-slate-700">{doc.complianceScore}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {formatDate(doc.updatedAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <AIAssistant />
    </div>
  )
}

function StatCard({ title, value, change, isPositive, icon: Icon, color }: any) {
  const colorMap: any = {
    indigo: "bg-indigo-50 text-indigo-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
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
        <div className={cn(
          "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
          isPositive ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
        )}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
    </motion.div>
  )
}

function ComplianceMetric({ label, percentage, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="text-slate-500 uppercase tracking-wider">{label}</span>
        <span className="text-slate-900">{percentage}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full rounded-full", color)} 
        />
      </div>
    </div>
  )
}
