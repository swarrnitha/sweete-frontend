'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Database, Download, Upload, RefreshCw, Calendar, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react';

const backups = [
  { id: 1, name: 'hoardify_backup_2026-07-18_030000.sql', size: '850 MB', type: 'Automated', created: '2026-07-18 03:00 AM', status: 'Success', downloaded: 2 },
  { id: 2, name: 'hoardify_backup_2026-07-17_030000.sql', size: '845 MB', type: 'Automated', created: '2026-07-17 03:00 AM', status: 'Success', downloaded: 1 },
  { id: 3, name: 'hoardify_backup_2026-07-16_030000.sql', size: '840 MB', type: 'Automated', created: '2026-07-16 03:00 AM', status: 'Success', downloaded: 0 },
  { id: 4, name: 'hoardify_backup_2026-07-15_143000.sql', size: '838 MB', type: 'Manual', created: '2026-07-15 02:30 PM', status: 'Success', downloaded: 3 },
  { id: 5, name: 'hoardify_backup_2026-07-14_030000.sql', size: '832 MB', type: 'Automated', created: '2026-07-14 03:00 AM', status: 'Failed', downloaded: 0 },
];

export default function BackupPage() {
  const [schedule, setSchedule] = useState({
    enabled: true,
    frequency: 'Daily',
    time: '03:00',
    retentionDays: '30',
    includeFiles: true,
    includeDatabase: true,
  });

  const download = (name: string) => toast.success(`Downloading "${name}"...`);
  const restore = (name: string) => toast.success(`Restoring from "${name}"... This may take a few minutes.`);
  const deleteBackup = (name: string) => toast.success(`Backup "${name}" deleted.`);
  const backupNow = () => toast.success('Manual backup started...');

  const saveSchedule = () => toast.success('Backup schedule saved!');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">Backup</h1><p className="text-foreground/50 text-sm">Database backup and restore options</p></div>
        <button onClick={backupNow} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Database className="w-4 h-4" /> Backup Now</button>
      </div>

      <div className="max-w-4xl space-y-5">
        {/* Schedule */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Calendar className="w-5 h-5 text-primary" /><h2 className="font-semibold">Scheduled Backup</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-xs font-medium mb-1">Frequency</label><select value={schedule.frequency} onChange={e => setSchedule(p => ({ ...p, frequency: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"><option>Hourly</option><option>Daily</option><option>Weekly</option><option>Monthly</option></select></div>
            <div><label className="block text-xs font-medium mb-1">Time</label><input type="time" value={schedule.time} onChange={e => setSchedule(p => ({ ...p, time: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">Retention (days)</label><input type="number" value={schedule.retentionDays} onChange={e => setSchedule(p => ({ ...p, retentionDays: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={schedule.includeDatabase} onChange={e => setSchedule(p => ({ ...p, includeDatabase: e.target.checked }))} className="w-4 h-4 rounded border-stone-300 text-primary" /> Include Database</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={schedule.includeFiles} onChange={e => setSchedule(p => ({ ...p, includeFiles: e.target.checked }))} className="w-4 h-4 rounded border-stone-300 text-primary" /> Include Uploaded Files</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={schedule.enabled} onChange={e => setSchedule(p => ({ ...p, enabled: e.target.checked }))} className="w-4 h-4 rounded border-stone-300 text-primary" /> Enable Scheduled Backups</label>
          </div>
          <div className="mt-4 pt-4 border-t border-stone-100">
            <button onClick={saveSchedule} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"><Save className="w-4 h-4 inline mr-1.5" />Save Schedule</button>
          </div>
        </div>

        {/* Manual Backup */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Database className="w-5 h-5 text-primary" /><h2 className="font-semibold">Manual Backup</h2></div>
          <p className="text-sm text-foreground/60 mb-3">Create a manual backup of your database and uploaded files.</p>
          <button onClick={backupNow} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Database className="w-4 h-4" /> Create Backup Now</button>
        </div>

        {/* Backup History */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="p-4 border-b border-stone-100">
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-foreground/40" /><h2 className="font-semibold text-sm">Backup History</h2></div>
          </div>
          <div className="divide-y divide-stone-100">
            {backups.map(b => (
              <div key={b.id} className="p-4 hover:bg-stone-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-foreground/30" />
                      <p className="text-sm font-medium font-mono">{b.name}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${b.status === 'Success' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {b.status === 'Success' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}{b.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-foreground/40 mt-1">
                      <span>{b.size}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.created}</span>
                      <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${b.type === 'Automated' ? 'bg-stone-100 text-stone-600' : 'bg-primary/5 text-primary'}`}>{b.type}</span>
                      <span>{b.downloaded} download{b.downloaded !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-4">
                    <button onClick={() => download(b.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-primary hover:bg-primary/5" title="Download"><Download className="w-4 h-4" /></button>
                    <button onClick={() => restore(b.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-amber-600 hover:bg-amber-50" title="Restore"><Upload className="w-4 h-4" /></button>
                    <button onClick={() => deleteBackup(b.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600 hover:bg-red-50" title="Delete"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
