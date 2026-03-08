'use client'

import React, { useState } from 'react'
import { 
  LayoutDashboard, 
  FileText, 
  Files, 
  GitBranch, 
  ShieldCheck, 
  Search, 
  BarChart3, 
  Settings,
  LogOut,
  Plus,
  Bell,
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NewDocumentWizard } from './NewDocumentWizard'

const NAV_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Documents', icon: FileText, href: '/documents' },
  { name: 'Templates', icon: Files, href: '/templates' },
  { name: 'Workflows', icon: GitBranch, href: '/workflows' },
  { name: 'Compliance', icon: ShieldCheck, href: '/compliance' },
  { name: 'Discovery', icon: Search, href: '/discovery' },
  { name: 'Analytics', icon: BarChart3, href: '/analytics' },
]

const SECONDARY_NAV = [
  { name: 'Info & Guide', icon: Settings, href: '/info' },
  { name: 'Database Schema', icon: Settings, href: '/database' },
]

export function Sidebar() {
  const pathname = usePathname()
  const [showNewDocWizard, setShowNewDocWizard] = useState(false)

  return (
    <>
      <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col sticky top-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 leading-tight">HealthCorr</h1>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Management</p>
            </div>
          </div>

          <button 
            onClick={() => setShowNewDocWizard(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium transition-all shadow-md shadow-indigo-100 mb-8"
          >
            <Plus size={18} />
            <span>New Document</span>
          </button>

          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isActive 
                      ? "bg-indigo-50 text-indigo-600" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon size={20} className={isActive ? "text-indigo-600" : "text-slate-400"} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-2">Resources</div>
            <nav className="space-y-1">
              {SECONDARY_NAV.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive 
                        ? "bg-indigo-50 text-indigo-600" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon size={20} className={isActive ? "text-indigo-600" : "text-slate-400"} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-slate-100 space-y-1">
          <Link
            href="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
          >
            <Settings size={20} className="text-slate-400" />
            <span>Settings</span>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <NewDocumentWizard 
        isOpen={showNewDocWizard} 
        onClose={() => setShowNewDocWizard(false)} 
      />
    </>
  )
}

export function TopNav() {
  return (
    <header className="h-16 border-bottom border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-slate-500">Welcome back, <span className="text-slate-900 font-semibold">Dr. Sarah</span></h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all">
            <Bell size={20} />
          </button>
          <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
        </div>
        
        <div className="h-8 w-px bg-slate-200 mx-2" />
        
        <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 transition-all">
          <span className="text-sm font-medium text-slate-700">Sarah Smith</span>
          <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <User size={18} />
          </div>
        </button>
      </div>
    </header>
  )
}
