'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Send, Mail, Users, Calendar, Eye, CheckCircle, FileText } from 'lucide-react';

const campaigns = [
  { id: 1, subject: 'Welcome to 100MM — Start Your Journey!', audience: 'New Signups', sentAt: '2026-07-15 10:00 AM', sent: 48, opened: 42, clicked: 28, status: 'Sent' },
  { id: 2, subject: 'Your Hoarding Booking is Confirmed!', audience: 'Booking Confirmed', sentAt: '2026-07-14 03:30 PM', sent: 12, opened: 12, clicked: 10, status: 'Sent' },
  { id: 3, subject: 'Payment Reminder: Invoice Due in 3 Days', audience: 'Overdue Accounts', sentAt: '2026-07-13 09:00 AM', sent: 8, opened: 6, clicked: 4, status: 'Sent' },
  { id: 4, subject: 'Exclusive Offer: Premium Hoardings at 20% Off', audience: 'All Advertisers', sentAt: null, sent: 0, opened: 0, clicked: 0, status: 'Draft' },
];

export default function EmailPage() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [audience, setAudience] = useState('all');
  const [template, setTemplate] = useState('blank');

  const send = () => {
    if (!subject || !content) { toast.error('Subject and content are required.'); return; }
    toast.success(`Email campaign "${subject}" queued for ${audience === 'all' ? 'all advertisers' : audience}!`);
    setSubject('');
    setContent('');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Email Campaigns</h1>
        <p className="text-foreground/50 text-sm">Send email campaigns and manage templates</p>
      </div>

      <div className="max-w-3xl space-y-5">
        {/* Composer */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Mail className="w-5 h-5 text-primary" /><h2 className="font-semibold">Compose Email</h2></div>
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium mb-1">Subject</label><input type="text" value={subject} onChange={e => setSubject(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Email subject line" /></div>
              <div><label className="block text-xs font-medium mb-1">Template</label><select value={template} onChange={e => setTemplate(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"><option value="blank">Blank</option><option value="welcome">Welcome Email</option><option value="booking">Booking Confirmation</option><option value="payment">Payment Reminder</option><option value="promo">Promotional</option></select></div>
            </div>
            <div><label className="block text-xs font-medium mb-1">Content</label><textarea rows={6} value={content} onChange={e => setContent(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono text-xs" placeholder="Enter email HTML or plain text content..." /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium mb-1">Audience</label><select value={audience} onChange={e => setAudience(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"><option value="all">All Advertisers</option><option value="active">Active Only</option><option value="pending">Pending Verification</option><option value="overdue">Overdue Payments</option><option value="new">New Signups (30 days)</option></select></div>
              <div className="flex items-end">
                <button onClick={send} className="w-full px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5"><Send className="w-4 h-4" /> Send Campaign</button>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign History */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="p-4 border-b border-stone-100">
            <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-foreground/40" /><h2 className="font-semibold text-sm">Campaign History</h2></div>
          </div>
          <div className="divide-y divide-stone-100">
            {campaigns.map(c => (
              <div key={c.id} className="p-4 hover:bg-stone-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{c.subject}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${c.status === 'Sent' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-stone-100 text-stone-600 border-stone-200'}`}>{c.status}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-foreground/40 mt-1">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{c.audience}</span>
                      {c.sentAt && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{c.sentAt}</span>}
                    </div>
                  </div>
                  {c.status === 'Sent' && (
                    <div className="flex items-center gap-4 text-xs text-foreground/40 shrink-0 ml-4">
                      <span className="flex items-center gap-1"><CheckCircle className="w-3 h-3 text-accent" />{c.sent}</span>
                      <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{c.opened}</span>
                      <span className="flex items-center gap-1">Clicked: {c.clicked}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
