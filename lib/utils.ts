import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'draft': return 'bg-slate-100 text-slate-700 border-slate-200'
    case 'under review': return 'bg-blue-50 text-blue-700 border-blue-100'
    case 'pending approval': return 'bg-amber-50 text-amber-700 border-amber-100'
    case 'approved': return 'bg-emerald-50 text-emerald-700 border-emerald-100'
    case 'rejected': return 'bg-rose-50 text-rose-700 border-rose-100'
    case 'completed': return 'bg-indigo-50 text-indigo-700 border-indigo-100'
    default: return 'bg-slate-100 text-slate-700 border-slate-200'
  }
}
