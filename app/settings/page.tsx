'use client'

import React, { useState } from 'react'
import { Sidebar, TopNav } from '@/components/Navigation'
import { AIAssistant } from '@/components/AIAssistant'
import { 
  Users,
  Shield,
  Plus,
  Search,
  Edit3,
  Trash2,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Eye,
  FileEdit,
  Download,
  Settings as SettingsIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'

const MOCK_USERS = [
  {
    id: 1,
    username: 'sarah.smith',
    fullName: 'Dr. Sarah Smith',
    email: 'sarah.smith@healthcorr.com',
    role: 'Admin',
    isActive: true,
    permissions: {
      documents: { view: true, modify: true, delete: true },
      templates: { view: true, modify: true, delete: true },
      users: { view: true, modify: true, delete: true }
    },
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    username: 'robert.wilson',
    fullName: 'Dr. Robert Wilson',
    email: 'robert.wilson@healthcorr.com',
    role: 'Physician',
    isActive: true,
    permissions: {
      documents: { view: true, modify: true, delete: false },
      templates: { view: true, modify: false, delete: false },
      users: { view: false, modify: false, delete: false }
    },
    createdAt: '2024-02-10'
  },
  {
    id: 3,
    username: 'emily.chen',
    fullName: 'Emily Chen',
    email: 'emily.chen@healthcorr.com',
    role: 'Compliance Officer',
    isActive: true,
    permissions: {
      documents: { view: true, modify: true, delete: false },
      templates: { view: true, modify: true, delete: false },
      users: { view: true, modify: false, delete: false }
    },
    createdAt: '2024-01-20'
  },
  {
    id: 4,
    username: 'michael.brown',
    fullName: 'Michael Brown',
    email: 'michael.brown@healthcorr.com',
    role: 'Viewer',
    isActive: false,
    permissions: {
      documents: { view: true, modify: false, delete: false },
      templates: { view: true, modify: false, delete: false },
      users: { view: false, modify: false, delete: false }
    },
    createdAt: '2024-03-01'
  }
]

const ROLES = [
  {
    name: 'Admin',
    description: 'Full system access with user management',
    color: 'indigo',
    userCount: 1
  },
  {
    name: 'Physician',
    description: 'Create and modify documents, limited template access',
    color: 'blue',
    userCount: 1
  },
  {
    name: 'Compliance Officer',
    description: 'Review and approve documents, manage templates',
    color: 'emerald',
    userCount: 1
  },
  {
    name: 'Viewer',
    description: 'Read-only access to documents and templates',
    color: 'slate',
    userCount: 1
  }
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showPermissionModal, setShowPermissionModal] = useState(false)

  const filteredUsers = MOCK_USERS.filter(user => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNav />
        
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Header */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings & Administration</h1>
              <p className="text-slate-500 mt-1">Manage users, roles, and system permissions.</p>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm flex items-center gap-2">
              <Plus size={18} />
              Add New User
            </button>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 w-fit">
            <button
              onClick={() => setActiveTab('users')}
              className={cn(
                "px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-lg transition-all",
                activeTab === 'users' ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Users size={16} className="inline mr-2" />
              Users
            </button>
            <button
              onClick={() => setActiveTab('roles')}
              className={cn(
                "px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-lg transition-all",
                activeTab === 'roles' ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <Shield size={16} className="inline mr-2" />
              Roles
            </button>
          </div>

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search users by name, email, or username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/50">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Permissions</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredUsers.map((user, index) => (
                        <motion.tr 
                          key={user.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-slate-50/50 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                {user.fullName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-slate-900">{user.fullName}</div>
                                <div className="text-xs text-slate-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "text-xs font-medium px-2.5 py-1 rounded-full",
                              user.role === 'Admin' ? "bg-indigo-50 text-indigo-600" :
                              user.role === 'Physician' ? "bg-blue-50 text-blue-600" :
                              user.role === 'Compliance Officer' ? "bg-emerald-50 text-emerald-600" :
                              "bg-slate-100 text-slate-600"
                            )}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border flex items-center gap-1 w-fit",
                              user.isActive 
                                ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            )}>
                              {user.isActive ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => {
                                setSelectedUser(user)
                                setShowPermissionModal(true)
                              }}
                              className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                            >
                              <Shield size={14} />
                              View Permissions
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit">
                                <Edit3 size={16} />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all" title="Delete">
                                <Trash2 size={16} />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                                <MoreVertical size={16} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Roles Tab */}
          {activeTab === 'roles' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ROLES.map((role, index) => (
                <motion.div
                  key={role.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "p-3 rounded-xl",
                      role.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
                      role.color === 'blue' ? "bg-blue-50 text-blue-600" :
                      role.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      <Shield size={24} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full">
                      {role.userCount} {role.userCount === 1 ? 'user' : 'users'}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{role.name}</h3>
                  <p className="text-sm text-slate-600 mb-6">{role.description}</p>

                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-100 transition-all">
                      Edit Role
                    </button>
                    <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-all">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Add New Role Card */}
              <button className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-400 transition-all group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Plus size={24} />
                </div>
                <span className="font-bold text-sm">Create New Role</span>
                <span className="text-xs mt-1">Define custom permissions</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Permission Modal */}
      {showPermissionModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">User Permissions</h3>
                <p className="text-sm text-slate-500 mt-1">{selectedUser.fullName} • {selectedUser.role}</p>
              </div>
              <button 
                onClick={() => setShowPermissionModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
              {/* Documents Permissions */}
              <PermissionSection 
                title="Documents" 
                icon={FileEdit}
                permissions={selectedUser.permissions.documents}
              />

              {/* Templates Permissions */}
              <PermissionSection 
                title="Templates" 
                icon={Download}
                permissions={selectedUser.permissions.templates}
              />

              {/* Users Permissions */}
              <PermissionSection 
                title="User Management" 
                icon={Users}
                permissions={selectedUser.permissions.users}
              />
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setShowPermissionModal(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-all shadow-sm">
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <AIAssistant />
    </div>
  )
}

function PermissionSection({ title, icon: Icon, permissions }: any) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-slate-900">
        <Icon size={18} />
        <h4 className="font-bold text-sm uppercase tracking-wider">{title}</h4>
      </div>
      <div className="grid grid-cols-3 gap-4 pl-7">
        <PermissionToggle label="View" enabled={permissions.view} icon={Eye} />
        <PermissionToggle label="Modify" enabled={permissions.modify} icon={FileEdit} />
        <PermissionToggle label="Delete" enabled={permissions.delete} icon={Trash2} />
      </div>
    </div>
  )
}

function PermissionToggle({ label, enabled, icon: Icon }: any) {
  return (
    <div className={cn(
      "p-3 rounded-xl border-2 transition-all",
      enabled 
        ? "bg-emerald-50 border-emerald-200" 
        : "bg-slate-50 border-slate-200"
    )}>
      <div className="flex items-center gap-2 mb-1">
        <Icon size={14} className={enabled ? "text-emerald-600" : "text-slate-400"} />
        <span className="text-xs font-bold text-slate-900">{label}</span>
      </div>
      <div className={cn(
        "text-[10px] font-bold uppercase tracking-wider",
        enabled ? "text-emerald-600" : "text-slate-400"
      )}>
        {enabled ? 'Allowed' : 'Denied'}
      </div>
    </div>
  )
}
