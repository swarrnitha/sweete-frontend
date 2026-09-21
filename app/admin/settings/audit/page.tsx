'use client';
import { useState, useMemo } from 'react';
import { Search, User, Calendar, Shield, LogIn, Edit3, Trash2, Settings, Eye } from 'lucide-react';

const logs = [
  { id: 1, user: 'Admin User', email: 'admin@hoardify.com', role: 'Super Admin', action: 'Login', details: 'Logged in from IP 192.168.1.100', timestamp: '2026-07-18 10:30:00', severity: 'Info' },
  { id: 2, user: 'Admin User', email: 'admin@hoardify.com', role: 'Super Admin', action: 'Update', details: 'Updated hoarding #12 "Marine Drive Premium" pricing', timestamp: '2026-07-18 10:15:00', severity: 'Info' },
  { id: 3, user: 'Moderator Jane', email: 'jane@hoardify.com', role: 'Moderator', action: 'Approve', details: 'Approved creative #8 "Summer Sale Banner"', timestamp: '2026-07-18 09:45:00', severity: 'Info' },
  { id: 4, user: 'System', email: '—', role: 'System', action: 'Settings Change', details: 'Payment gateway configuration updated', timestamp: '2026-07-18 08:00:00', severity: 'Warning' },
  { id: 5, user: 'Admin User', email: 'admin@hoardify.com', role: 'Super Admin', action: 'Delete', details: 'Deleted advertiser #9 "CityAds Network"', timestamp: '2026-07-17 16:20:00', severity: 'Critical' },
  { id: 6, user: 'Moderator John', email: 'john@hoardify.com', role: 'Moderator', action: 'Reject', details: 'Rejected booking #302 for "FC Road Billboard"', timestamp: '2026-07-17 14:30:00', severity: 'Info' },
  { id: 7, user: 'Admin User', email: 'admin@hoardify.com', role: 'Super Admin', action: 'Login', details: 'Logged in from IP 192.168.1.100', timestamp: '2026-07-17 10:00:00', severity: 'Info' },
  { id: 8, user: 'System', email: '—', role: 'System', action: 'Backup', details: 'Automated database backup completed (850 MB)', timestamp: '2026-07-17 03:00:00', severity: 'Info' },
  { id: 9, user: 'Moderator Jane', email: 'jane@hoardify.com', role: 'Moderator', action: 'Login', details: 'Logged in from IP 10.0.0.45', timestamp: '2026-07-16 11:15:00', severity: 'Info' },
  { id: 10, user: 'Admin User', email: 'admin@hoardify.com', role: 'Super Admin', action: 'Export', details: 'Exported revenue report Q2 2026 as PDF', timestamp: '2026-07-16 09:00:00', severity: 'Info' },
];

const actionIcons: Record<string, React.ReactNode> = {
  Login: <LogIn className="w-4 h-4" />,
  Update: <Edit3 className="w-4 h-4" />,
  Approve: <Eye className="w-4 h-4" />,
  'Settings Change': <Settings className="w-4 h-4" />,
  Delete: <Trash2 className="w-4 h-4" />,
  Reject: <Trash2 className="w-4 h-4" />,
  Backup: <Settings className="w-4 h-4" />,
  Export: <Eye className="w-4 h-4" />,
};

const severityStyles: Record<string, string> = {
  Info: 'bg-blue-50 text-blue-700 border-blue-200',
  Warning: 'bg-amber-50 text-amber-700 border-amber-200',
  Critical: 'bg-red-50 text-red-700 border-red-200',
};

export default function AuditLogsPage() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');

  const filtered = useMemo(() => logs.filter(l => {
    if (search && !l.user.toLowerCase().includes(search.toLowerCase()) && !l.action.toLowerCase().includes(search.toLowerCase()) && !l.details.toLowerCase().includes(search.toLowerCase())) return false;
    if (severityFilter && l.severity !== severityFilter) return false;
    return true;
  }), [search, severityFilter]);

  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold">Audit Logs</h1><p className="text-foreground/50 text-sm">{filtered.length} activity records</p></div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input type="text" placeholder="Search logs..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm" />
        </div>
        <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm">
          <option value="">All Severity</option>
          <option>Info</option>
          <option>Warning</option>
          <option>Critical</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="divide-y divide-stone-100">
          {filtered.map(l => (
            <div key={l.id} className="p-4 hover:bg-stone-50">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  l.severity === 'Critical' ? 'bg-red-100' : l.severity === 'Warning' ? 'bg-amber-100' : 'bg-stone-100'
                }`}>
                  {actionIcons[l.action] || <Shield className="w-4 h-4 text-foreground/30" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{l.user}</p>
                    <span className="text-xs text-foreground/40">{l.role}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${severityStyles[l.severity]}`}>{l.severity}</span>
                  </div>
                  <p className="text-sm text-foreground/70 mt-0.5"><span className="font-medium text-foreground">{l.action}:</span> {l.details}</p>
                  <div className="flex items-center gap-3 text-xs text-foreground/40 mt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{l.timestamp}</span>
                    <span>{l.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-foreground/40 text-sm">No logs match your filters.</div>}
      </div>
    </div>
  );
}
