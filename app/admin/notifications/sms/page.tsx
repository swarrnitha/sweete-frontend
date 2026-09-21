'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Send, MessageSquare, Users, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const deliveries = [
  { id: 1, message: 'Your booking for Marine Drive Premium is confirmed. Thank you!', to: '+91 98765 43210', sender: 'Rahul Sharma', sentAt: '2026-07-18 11:30 AM', status: 'Delivered', cost: '₹0.50' },
  { id: 2, message: 'Reminder: Your subscription payment of ₹4,999 is due in 3 days.', to: '+91 87654 32109', sender: 'Priya Patel', sentAt: '2026-07-17 09:00 AM', status: 'Delivered', cost: '₹0.50' },
  { id: 3, message: 'OTP for account verification: 834291. Valid for 10 minutes.', to: '+91 76543 21098', sender: 'Amit Verma', sentAt: '2026-07-16 02:15 PM', status: 'Delivered', cost: '₹0.50' },
  { id: 4, message: 'Your creative has been approved! Log in to view details.', to: '+91 65432 10987', sender: 'Sneha Reddy', sentAt: '2026-07-15 04:00 PM', status: 'Failed', cost: '—' },
];

export default function SMSPage() {
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('all');
  const [customNumbers, setCustomNumbers] = useState('');

  const send = () => {
    if (!message) { toast.error('Message is required.'); return; }
    toast.success(`SMS sent to ${recipients === 'custom' ? customNumbers.split(',').length + ' numbers' : recipients}!`);
    setMessage('');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">SMS Notifications</h1>
        <p className="text-foreground/50 text-sm">Send SMS messages and view delivery reports</p>
      </div>

      <div className="max-w-3xl space-y-5">
        {/* SMS Composer */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><MessageSquare className="w-5 h-5 text-primary" /><h2 className="font-semibold">Send SMS</h2></div>
          <div className="space-y-3">
            <div><label className="block text-xs font-medium mb-1">Message <span className="text-foreground/40">({message.length}/160 chars)</span></label>
              <textarea rows={3} value={message} onChange={e => setMessage(e.target.value)} maxLength={160} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder="Type your SMS message (max 160 characters)..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium mb-1">Recipients</label>
                <select value={recipients} onChange={e => setRecipients(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm">
                  <option value="all">All Advertisers</option>
                  <option value="active">Active Advertisers</option>
                  <option value="pending">Pending Verification</option>
                  <option value="overdue">Overdue Payments</option>
                  <option value="custom">Custom Numbers</option>
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={send} className="w-full px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5"><Send className="w-4 h-4" /> Send SMS</button>
              </div>
            </div>
            {recipients === 'custom' && (
              <div><label className="block text-xs font-medium mb-1">Phone Numbers (comma separated)</label><input type="text" value={customNumbers} onChange={e => setCustomNumbers(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" placeholder="+91 98765 43210, +91 87654 32109" /></div>
            )}
          </div>
        </div>

        {/* Delivery Reports */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="p-4 border-b border-stone-100">
            <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-foreground/40" /><h2 className="font-semibold text-sm">Delivery Reports</h2></div>
          </div>
          <div className="divide-y divide-stone-100">
            {deliveries.map(d => (
              <div key={d.id} className="p-4 hover:bg-stone-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground/80">{d.message}</p>
                    <div className="flex items-center gap-3 text-xs text-foreground/40 mt-1">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" />{d.to}</span>
                      <span>{d.sender}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{d.sentAt}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                      d.status === 'Delivered' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {d.status === 'Delivered' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}{d.status}
                    </span>
                    <p className="text-xs text-foreground/40 mt-0.5">Cost: {d.cost}</p>
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
