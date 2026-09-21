'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, MessageSquare, Send } from 'lucide-react';

export default function SMSConfigPage() {
  const [provider, setProvider] = useState('twilio');
  const [config, setConfig] = useState({
    twilio: { accountSid: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', authToken: '•••••••••••••••••••••••••', fromNumber: '+1234567890', enabled: true },
    msg91: { authKey: 'xxxxxxxxxxxxxxxxxxxx', senderId: 'HOARDIFY', route: '4', enabled: false },
  });
  const [testNumber, setTestNumber] = useState('');

  const save = () => toast.success(`${provider === 'twilio' ? 'Twilio' : 'MSG91'} configuration saved!`);
  const testSMS = () => {
    if (!testNumber) { toast.error('Enter a phone number.'); return; }
    toast.success(`Test SMS sent to ${testNumber}!`);
  };

  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold">SMS Configuration</h1><p className="text-foreground/50 text-sm">SMS provider credentials</p></div>
      <div className="max-w-3xl space-y-5">
        <div className="flex gap-2 mb-4">
          {['twilio', 'msg91'].map(p => (
            <button key={p} onClick={() => setProvider(p)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${provider === p ? 'bg-primary text-white' : 'bg-white border border-stone-200 hover:border-stone-300'}`}>
              <MessageSquare className="w-4 h-4 inline mr-1.5" />{p === 'twilio' ? 'Twilio' : 'MSG91'}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <h2 className="font-semibold capitalize mb-4">{provider === 'twilio' ? 'Twilio' : 'MSG91'} Settings</h2>
          {provider === 'twilio' ? (
            <div className="space-y-4">
              <div><label className="block text-xs font-medium mb-1">Account SID</label><input type="text" value={config.twilio.accountSid} onChange={e => setConfig(p => ({ ...p, twilio: { ...p.twilio, accountSid: e.target.value } }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" /></div>
              <div><label className="block text-xs font-medium mb-1">Auth Token</label><input type="password" value={config.twilio.authToken} onChange={e => setConfig(p => ({ ...p, twilio: { ...p.twilio, authToken: e.target.value } }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" /></div>
              <div><label className="block text-xs font-medium mb-1">From Number</label><input type="text" value={config.twilio.fromNumber} onChange={e => setConfig(p => ({ ...p, twilio: { ...p.twilio, fromNumber: e.target.value } }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={config.twilio.enabled} onChange={e => setConfig(p => ({ ...p, twilio: { ...p.twilio, enabled: e.target.checked } }))} className="w-4 h-4 rounded border-stone-300 text-primary" /><span className="text-sm">Enable Twilio</span></div>
            </div>
          ) : (
            <div className="space-y-4">
              <div><label className="block text-xs font-medium mb-1">Auth Key</label><input type="password" value={config.msg91.authKey} onChange={e => setConfig(p => ({ ...p, msg91: { ...p.msg91, authKey: e.target.value } }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" /></div>
              <div><label className="block text-xs font-medium mb-1">Sender ID</label><input type="text" value={config.msg91.senderId} onChange={e => setConfig(p => ({ ...p, msg91: { ...p.msg91, senderId: e.target.value } }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
              <div><label className="block text-xs font-medium mb-1">Route</label><select value={config.msg91.route} onChange={e => setConfig(p => ({ ...p, msg91: { ...p.msg91, route: e.target.value } }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"><option value="1">Promotional</option><option value="4">Transactional</option></select></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={config.msg91.enabled} onChange={e => setConfig(p => ({ ...p, msg91: { ...p.msg91, enabled: e.target.checked } }))} className="w-4 h-4 rounded border-stone-300 text-primary" /><span className="text-sm">Enable MSG91</span></div>
            </div>
          )}
          <div className="mt-4 pt-4 border-t border-stone-100">
            <button onClick={save} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"><Save className="w-4 h-4 inline mr-1.5" />Save Configuration</button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Send className="w-5 h-5 text-primary" /><h2 className="font-semibold">Test SMS</h2></div>
          <div className="flex items-end gap-3">
            <div className="flex-1"><label className="block text-xs font-medium mb-1">Send test SMS to</label><input type="text" value={testNumber} onChange={e => setTestNumber(e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" placeholder="+91 98765 43210" /></div>
            <button onClick={testSMS} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Send className="w-4 h-4" /> Send Test</button>
          </div>
        </div>
      </div>
    </div>
  );
}
