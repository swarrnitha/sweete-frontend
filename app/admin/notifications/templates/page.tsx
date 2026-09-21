'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Mail, MessageSquare, Bell, Edit2, Eye, Plus } from 'lucide-react';

const initialTemplates = [
  { id: 1, name: 'Welcome Email', channel: 'Email', subject: 'Welcome to 100MM!', content: 'Hi {{name}},\n\nWelcome to 100MM! We are excited to have you on board.\n\nStart exploring premium hoarding spaces today.\n\nTeam 100MM', variables: ['name'], lastUpdated: '2026-07-10' },
  { id: 2, name: 'Booking Confirmation', channel: 'Email', subject: 'Booking Confirmed — {{hoarding}}', content: 'Hi {{name}},\n\nYour booking for {{hoarding}} has been confirmed.\nPeriod: {{startDate}} to {{endDate}}\nAmount: ₹{{amount}}\n\nThank you for choosing 100MM.', variables: ['name', 'hoarding', 'startDate', 'endDate', 'amount'], lastUpdated: '2026-07-12' },
  { id: 3, name: 'Payment Reminder SMS', channel: 'SMS', subject: null, content: 'Hi {{name}}, your payment of ₹{{amount}} for {{hoarding}} is due in {{days}} days. Pay now to avoid interruption.', variables: ['name', 'amount', 'hoarding', 'days'], lastUpdated: '2026-07-14' },
  { id: 4, name: 'Push: New Hoarding Alert', channel: 'Push', subject: 'New Hoarding Available!', content: 'Premium hoardings now available in {{city}}. Book now!', variables: ['city'], lastUpdated: '2026-07-15' },
  { id: 5, name: 'Invoice Notification', channel: 'Email', subject: 'Invoice {{invoiceId}} from 100MM', content: 'Hi {{name}},\n\nPlease find attached invoice {{invoiceId}} for ₹{{amount}}.\nDue date: {{dueDate}}\n\nTeam 100MM', variables: ['name', 'invoiceId', 'amount', 'dueDate'], lastUpdated: '2026-07-08' },
];

const channelIcons: Record<string, React.ReactNode> = {
  Email: <Mail className="w-4 h-4" />,
  SMS: <MessageSquare className="w-4 h-4" />,
  Push: <Bell className="w-4 h-4" />,
};

const channelStyles: Record<string, string> = {
  Email: 'bg-blue-50 text-blue-700 border-blue-200',
  SMS: 'bg-green-50 text-green-700 border-green-200',
  Push: 'bg-purple-50 text-purple-700 border-purple-200',
};

export default function TemplatesPage() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [activeTab, setActiveTab] = useState<'Email' | 'SMS' | 'Push' | 'All'>('All');
  const [editing, setEditing] = useState<{ id: number | null; name: string; channel: string; subject: string; content: string; variables: string }>({ id: null, name: '', channel: 'Email', subject: '', content: '', variables: '' });
  const [previewId, setPreviewId] = useState<number | null>(null);

  const filtered = activeTab === 'All' ? templates : templates.filter(t => t.channel === activeTab);

  const startAdd = () => setEditing({ id: null, name: '', channel: 'Email', subject: '', content: '', variables: '' });
  const startEdit = (t: typeof initialTemplates[0]) => setEditing({ id: t.id, name: t.name, channel: t.channel, subject: t.subject || '', content: t.content, variables: t.variables.join(', ') });

  const saveTemplate = () => {
    if (!editing.name || !editing.content) { toast.error('Name and content are required.'); return; }
    if (editing.id) {
      setTemplates(prev => prev.map(t => t.id === editing.id ? { ...t, name: editing.name, channel: editing.channel, subject: editing.subject, content: editing.content, variables: editing.variables.split(',').map(v => v.trim()), lastUpdated: new Date().toISOString().split('T')[0] } : t));
      toast.success('Template updated.');
    } else {
      setTemplates(prev => [...prev, { id: Date.now(), name: editing.name, channel: editing.channel as 'Email' | 'SMS' | 'Push', subject: editing.subject || null, content: editing.content, variables: editing.variables.split(',').map(v => v.trim()), lastUpdated: new Date().toISOString().split('T')[0] }]);
      toast.success('Template created.');
    }
    setEditing({ id: null, name: '', channel: 'Email', subject: '', content: '', variables: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">Notification Templates</h1><p className="text-foreground/50 text-sm">{templates.length} templates across Email, SMS, and Push</p></div>
        <button onClick={startAdd} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Plus className="w-4 h-4" /> New Template</button>
      </div>

      {/* Channel Tabs */}
      <div className="flex gap-1 mb-4 bg-stone-100 rounded-lg p-1 w-fit">
        {['All', 'Email', 'SMS', 'Push'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeTab === tab ? 'bg-white shadow-sm' : 'text-foreground/50 hover:text-foreground'}`}>{tab}</button>
        ))}
      </div>

      {/* Inline Editor */}
      {(editing.id !== undefined) && (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div><label className="block text-xs font-medium mb-1">Template Name</label><input type="text" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">Channel</label><select value={editing.channel} onChange={e => setEditing(p => ({ ...p, channel: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm"><option>Email</option><option>SMS</option><option>Push</option></select></div>
            <div><label className="block text-xs font-medium mb-1">Subject / Title</label><input type="text" value={editing.subject} onChange={e => setEditing(p => ({ ...p, subject: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" placeholder="For Email/Push" /></div>
          </div>
          <div><label className="block text-xs font-medium mb-1">Content <span className="text-foreground/40">(Use {'{{variable}}'} for dynamic values)</span></label>
            <textarea rows={4} value={editing.content} onChange={e => setEditing(p => ({ ...p, content: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm font-mono resize-none" />
          </div>
          <div><label className="block text-xs font-medium mb-1">Variables (comma separated)</label><input type="text" value={editing.variables} onChange={e => setEditing(p => ({ ...p, variables: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" placeholder="name, hoarding, amount" /></div>
          <div className="flex gap-3">
            <button onClick={saveTemplate} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold">{editing.id ? 'Update' : 'Save'}</button>
            <button onClick={() => setEditing({ id: null, name: '', channel: 'Email', subject: '', content: '', variables: '' })} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium">Cancel</button>
          </div>
        </div>
      )}

      {/* Template Cards */}
      <div className="space-y-3">
        {filtered.map(t => (
          <div key={t.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{t.name}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${channelStyles[t.channel]}`}>{channelIcons[t.channel]} {t.channel}</span>
                  </div>
                  {t.subject && <p className="text-xs text-foreground/50 mt-0.5">Subject: {t.subject}</p>}
                  <div className="mt-2 bg-stone-50 rounded-xl p-3">
                    <pre className="text-xs text-foreground/60 whitespace-pre-wrap font-sans">{t.content.substring(0, 200)}{t.content.length > 200 ? '...' : ''}</pre>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-foreground/40 mt-2">
                    <span>Variables: {t.variables.map(v => <code key={v} className="bg-primary/5 text-primary px-1.5 py-0.5 rounded text-[10px] ml-1">{'{{' + v + '}}'}</code>)}</span>
                    <span>Updated: {t.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-4">
                  <button onClick={() => setPreviewId(previewId === t.id ? null : t.id)} className="p-1.5 rounded-lg text-foreground/30 hover:text-primary hover:bg-primary/5"><Eye className="w-4 h-4" /></button>
                  <button onClick={() => startEdit(t)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600 hover:bg-blue-50"><Edit2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
            {previewId === t.id && (
              <div className="border-t border-stone-100 bg-stone-50 p-4">
                <div className="max-w-md mx-auto bg-white rounded-xl border border-stone-200 p-4">
                  {t.subject && <p className="text-sm font-semibold mb-2">{t.subject}</p>}
                  <p className="text-sm text-foreground/70 whitespace-pre-wrap">{t.content}</p>
                  <div className="mt-3 text-xs text-foreground/40 border-t border-stone-100 pt-2">
                    Available variables: {t.variables.map(v => <code key={v} className="bg-primary/5 text-primary px-1.5 py-0.5 rounded text-[10px] ml-1">{'{{' + v + '}}'}</code>)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
