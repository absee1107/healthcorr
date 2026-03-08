'use client'

import React, { useState } from 'react'
import { Sidebar, TopNav } from '@/components/Navigation'
import { AIAssistant } from '@/components/AIAssistant'
import { 
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  FileText,
  Users,
  CheckCircle2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import { motion } from 'motion/react'

const MONTHLY_VOLUME = [
  { month: 'Jan', incoming: 245, outgoing: 198, total: 443 },
  { month: 'Feb', incoming: 289, outgoing: 234, total: 523 },
  { month: 'Mar', incoming: 312, outgoing: 267, total: 579 },
  { month: 'Apr', incoming: 298, outgoing: 245, total: 543 },
  { month: 'May', incoming: 334, outgoing: 289, total: 623 },
  { month: 'Jun', incoming: 356, outgoing: 312, total: 668 },
]

const RESPONSE_TIME_TREND = [
  { week: 'Week 1', avgHours: 18 },
  { week: 'Week 2', avgHours: 16 },
  { week: 'Week 3', avgHours: 14 },
  { week: 'Week 4', avgHours: 12 },
]

const DOCUMENT_TYPES = [
  { name: 'Referrals', value: 35, color: '#4f46e5' },
  { name: 'Insurance', value: 25, color: '#06b6d4' },
  { name: 'Lab Results', value: 20, color: '#10b981' },
  { name: 'Appointments', value: 15, color: '#f59e0b' },
  { name: 'Other', value: 5, color: '#64748b' },
]

const DEPARTMENT_PERFORMANCE = [
  { department: 'Cardiology', processed: 234, avgTime: '14h', compliance: 98 },
  { department: 'Orthopedics', processed: 198, avgTime: '16h', compliance: 96 },
  { department: 'Neurology', processed: 176, avgTime: '12h', compliance: 99 },
  { department: 'Pediatrics', processed: 156, avgTime: '18h', compliance: 94 },
  { department: 'General', processed: 289, avgTime: '15h', compliance: 97 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6months')
  const [showCustomizeView, setShowCustomizeView] = useState(false)

  const handleExportReport = () => {
    const reportData = {
      exportedAt: new Date().toISOString(),
      timeRange: timeRange,
      monthlyVolume: MONTHLY_VOLUME,
      responseTimeTrend: RESPONSE_TIME_TREND,
      documentTypes: DOCUMENT_TYPES,
      departmentPerformance: DEPARTMENT_PERFORMANCE
    }
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`
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
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Analytics</h1>
              <p className="text-slate-500 mt-1">Comprehensive insights into correspondence management performance.</p>
            </div>
            <div className="flex gap-3">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="30days">Last 30 Days</option>
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <button 
                onClick={handleExportReport}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <Download size={16} />
                Export Report
              </button>
              <button 
                onClick={() => setShowCustomizeView(true)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2"
              >
                <Filter size={16} />
                Customize View
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Total Correspondence" 
              value="3,779" 
              change="+12.5%" 
              isPositive={true}
              icon={FileText}
              color="indigo"
            />
            <MetricCard 
              title="Avg. Response Time" 
              value="14.2 hrs" 
              change="-2.3 hrs" 
              isPositive={true}
              icon={Clock}
              color="emerald"
            />
            <MetricCard 
              title="Active Users" 
              value="47" 
              change="+3 this month" 
              isPositive={true}
              icon={Users}
              color="blue"
            />
            <MetricCard 
              title="Completion Rate" 
              value="96.8%" 
              change="+1.2%" 
              isPositive={true}
              icon={CheckCircle2}
              color="amber"
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monthly Volume Trend */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-slate-900">Correspondence Volume Trend</h3>
                  <p className="text-xs text-slate-500 mt-1">Incoming vs Outgoing correspondence over time</p>
                </div>
                <div className="flex gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded-sm" />
                    <span className="text-slate-600">Incoming</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
                    <span className="text-slate-600">Outgoing</span>
                  </div>
                </div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MONTHLY_VOLUME}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748b' }} 
                    />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                      }}
                    />
                    <Bar dataKey="incoming" fill="#4f46e5" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="outgoing" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Document Type Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-6">Document Type Distribution</h3>
              <div className="h-72 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={DOCUMENT_TYPES}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {DOCUMENT_TYPES.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {DOCUMENT_TYPES.map((type) => (
                  <div key={type.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: type.color }} />
                      <span className="text-slate-600">{type.name}</span>
                    </div>
                    <span className="font-semibold text-slate-900">{type.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Response Time Trend */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-slate-900">Average Response Time Trend</h3>
                <p className="text-xs text-slate-500 mt-1">Weekly average response time in hours</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="text-emerald-600" size={16} />
                <span className="text-emerald-600 font-semibold">-33% improvement</span>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={RESPONSE_TIME_TREND}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="week" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgHours" 
                    stroke="#4f46e5" 
                    strokeWidth={3}
                    dot={{ fill: '#4f46e5', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Performance Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Department Performance</h3>
              <p className="text-sm text-slate-500 mt-1">Correspondence processing metrics by department</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Processed</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Time</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Compliance</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {DEPARTMENT_PERFORMANCE.map((dept, index) => (
                    <motion.tr 
                      key={dept.department}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-slate-900">{dept.department}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-600">{dept.processed} docs</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-slate-900">{dept.avgTime}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full",
                                dept.compliance > 95 ? "bg-emerald-500" : "bg-amber-500"
                              )} 
                              style={{ width: `${dept.compliance}%` }} 
                            />
                          </div>
                          <span className="text-xs font-bold text-slate-700">{dept.compliance}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full",
                          dept.compliance > 97 
                            ? "bg-emerald-50 text-emerald-600" 
                            : dept.compliance > 95 
                            ? "bg-blue-50 text-blue-600"
                            : "bg-amber-50 text-amber-600"
                        )}>
                          {dept.compliance > 97 ? 'Excellent' : dept.compliance > 95 ? 'Good' : 'Fair'}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Customize View Modal */}
      {showCustomizeView && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
          >
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Customize Analytics View</h3>
              <p className="text-sm text-slate-500 mt-1">Select which metrics and charts to display</p>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 mb-3">Key Metrics</h4>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <span className="text-sm font-medium">Total Correspondence</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <span className="text-sm font-medium">Response Time</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <span className="text-sm font-medium">Active Users</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <span className="text-sm font-medium">Completion Rate</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-3">Charts & Visualizations</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <div>
                      <div className="text-sm font-medium">Volume Trend Chart</div>
                      <div className="text-xs text-slate-500">Incoming vs outgoing correspondence</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <div>
                      <div className="text-sm font-medium">Document Type Distribution</div>
                      <div className="text-xs text-slate-500">Pie chart breakdown</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <div>
                      <div className="text-sm font-medium">Response Time Trend</div>
                      <div className="text-xs text-slate-500">Weekly average analysis</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100">
                    <input type="checkbox" defaultChecked className="rounded border-slate-300 text-indigo-600" />
                    <div>
                      <div className="text-sm font-medium">Department Performance</div>
                      <div className="text-xs text-slate-500">Detailed metrics table</div>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-3">Display Options</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Chart Style</label>
                    <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                      <option>Modern (Default)</option>
                      <option>Classic</option>
                      <option>Minimal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Color Scheme</label>
                    <select className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500">
                      <option>Indigo (Default)</option>
                      <option>Blue</option>
                      <option>Green</option>
                      <option>Purple</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowCustomizeView(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('View customization saved!')
                  setShowCustomizeView(false)
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm"
              >
                Apply Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <AIAssistant />
    </div>
  )
}

function MetricCard({ title, value, change, isPositive, icon: Icon, color }: any) {
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
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
      </div>
    </motion.div>
  )
}
