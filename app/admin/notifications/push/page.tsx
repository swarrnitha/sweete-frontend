'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Send, Bell, BellRing, Calendar, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

const history = [
  { id: 1, title: 'New Hoarding Available', message: 'Premium hoardings now available in Connaught Place, Delhi.', audience: 'All Advertisers', sentAt: '2026-07-18 10:30 AM', delivered: 245, opened: 182, status: 'Sent' },
  { id: 2, title: 'Payment Reminder', message: 'Your subscription payment is due in 3 days.', audience: 'Pending Payments', sentAt: '2026-07-17 09:00 AM', delivered: 38, opened: 31, status: 'Sent' },
  { id: 3, title: 'Booking Confirmed', message: 'Your booking for Marine Drive Premium has been confirmed.', audience: 'Single User (ID: 101)', sentAt: '2026-07-15 02:15 PM', delivered: 1, opened: 1, status: 'Sent' },
];

const statusStyles: Record<string, string> = {
  Sent: 'bg-accent/10 text-accent border-accent/20',
  Draft: 'bg-stone-100 text-stone-600 border-stone-200',
};

export default function PushPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [audience, setAudience] = useState('all');

  const send = () => {
    if (!title || !message) { toast.error('Title and message are required.'); return; }
    toast.success(`Push notification "${title}" sent to ${audience === 'all' ? 'all advertisers' : audience}!`);
    setTitle('');
    setMessage('');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Push Notifications</h1>
        <p className="text-foreground/50 text-sm">Compose and send push notifications</p>
      </div>

      <div className="max-w-3xl space-y-5">
        {/* Composer */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><BellRing className="w-5 h-5 text-primary" /><h2 className="font-semibold">Compose Notification</h2></div>
          <div className="space-y-3">
            <div><label className="block text-xs font-medium mb-1">Title</label><input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. New Hoarding Available" /></div>
            <div><label className="block text-xs font-medium mb-1">Message</label><textarea rows={3} value={message} onChange={e => setMessage(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Enter your notification message..." /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium mb-1">Audience</label><select value={audience} onChange={e => setAudience(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"><option value="all">All Advertisers</option><option value="active">Active Advertisers</option><option value="pending">Pending Verification</option><option value="overdue">Overdue Payments</option></select></div>
              <div className="flex items-end">
                <button onClick={send} className="w-full px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5"><Send className="w-4 h-4" /> Send Notification</button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase mb-2">Preview</p>
          <div className="bg-white rounded-xl p-3 shadow-sm border border-stone-100 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Bell className="w-4 h-4 text-primary" /></div>
              <div>
                <p className="text-sm font-semibold">{title || 'Notification Title'}</p>
                <p className="text-xs text-foreground/50">{message || 'Your notification message will appear here.'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="p-4 border-b border-stone-100">
            <div className="flex items-center gap-2"><BellRing className="w-4 h-4 text-foreground/40" /><h2 className="font-semibold text-sm">Sent History</h2></div>
          </div>
          <div className="divide-y divide-stone-100">
            {history.map(h => (
              <div key={h.id} className="p-4 hover:bg-stone-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{h.title}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${statusStyles[h.status]}`}>{h.status}</span>
                    </div>
                    <p className="text-xs text-foreground/50 mt-0.5">{h.message}</p>
                    <div className="flex items-center gap-3 text-xs text-foreground/40 mt-1.5">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{h.audience}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{h.sentAt}</span>
                    </div>
                  </div>
                  <div className="text-right text-xs text-foreground/40 shrink-0 ml-4">
                    <div className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-accent" />{h.delivered} delivered</div>
                    <div className="flex items-center gap-1"><Eye className="w-3 h-3" />{h.opened} opened</div>
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

function Eye(props: any) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }
