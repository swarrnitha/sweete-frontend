'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Mail, Send, CheckCircle, XCircle } from 'lucide-react';

export default function EmailConfigPage() {
  const [form, setForm] = useState({
    host: 'smtp.sendgrid.net',
    port: '587',
    username: 'apikey',
    password: 'SG.xxxxxxxxxxxxxxxxxxxxxx',
    fromEmail: 'noreply@hoardify.com',
    fromName: '100MM',
    encryption: 'TLS',
  });
  const [testEmail, setTestEmail] = useState('');

  const save = () => toast.success('Email configuration saved!');
  const test = () => {
    if (!testEmail) { toast.error('Enter a test email address.'); return; }
    toast.success(`Test email sent to ${testEmail}!`);
  };

  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold">Email Configuration</h1><p className="text-foreground/50 text-sm">SMTP settings for transactional emails</p></div>
      <div className="max-w-3xl space-y-5">
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Mail className="w-5 h-5 text-primary" /><h2 className="font-semibold">SMTP Settings</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium mb-1">SMTP Host</label><input type="text" value={form.host} onChange={e => setForm(p => ({ ...p, host: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" /></div>
            <div><label className="block text-xs font-medium mb-1">Port</label><input type="text" value={form.port} onChange={e => setForm(p => ({ ...p, port: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">Username</label><input type="text" value={form.username} onChange={e => setForm(p => ({ ...p, username: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" /></div>
            <div><label className="block text-xs font-medium mb-1">Password</label><input type="password" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" /></div>
            <div><label className="block text-xs font-medium mb-1">From Email</label><input type="email" value={form.fromEmail} onChange={e => setForm(p => ({ ...p, fromEmail: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">From Name</label><input type="text" value={form.fromName} onChange={e => setForm(p => ({ ...p, fromName: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">Encryption</label><select value={form.encryption} onChange={e => setForm(p => ({ ...p, encryption: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"><option>TLS</option><option>SSL</option><option>None</option></select></div>
          </div>
          <div className="mt-4 pt-4 border-t border-stone-100">
            <button onClick={save} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"><Save className="w-4 h-4 inline mr-1.5" />Save Configuration</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Send className="w-5 h-5 text-primary" /><h2 className="font-semibold">Test Email</h2></div>
          <div className="flex items-end gap-3">
            <div className="flex-1"><label className="block text-xs font-medium mb-1">Send test email to</label><input type="email" value={testEmail} onChange={e => setTestEmail(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" placeholder="admin@hoardify.com" /></div>
            <button onClick={test} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Send className="w-4 h-4" /> Send Test</button>
          </div>
        </div>
      </div>
    </div>
  );
}
