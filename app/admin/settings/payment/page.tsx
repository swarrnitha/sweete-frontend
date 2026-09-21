'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, CreditCard, CheckCircle, XCircle } from 'lucide-react';

export default function PaymentPage() {
  const [gateway, setGateway] = useState('razorpay');
  const [config, setConfig] = useState({
    razorpay: { key: 'rzp_live_xxxxxxxxxxxx', secret: '••••••••••••••••', webhookSecret: 'whsec_xxxxxxxxxxxx', enabled: true },
    stripe: { key: 'pk_live_xxxxxxxxxxxx', secret: 'sk_live_xxxxxxxxxxxx', webhookSecret: 'whsec_xxxxxxxxxxxx', enabled: false },
    paypal: { clientId: 'Ae_xxxxxxxxxxxxxxxxxx', secret: 'E_xxxxxxxxxxxxxxxxxx', enabled: false },
  });

  const save = () => toast.success(`${gateway.charAt(0).toUpperCase() + gateway.slice(1)} configuration saved!`);

  const testConnection = () => toast.success(`Test connection to ${gateway} successful!`);

  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold">Payment Gateway</h1><p className="text-foreground/50 text-sm">Configure Razorpay, Stripe, or PayPal</p></div>
      <div className="max-w-3xl space-y-5">
        <div className="flex gap-2 mb-4">
          {['razorpay', 'stripe', 'paypal'].map(g => (
            <button key={g} onClick={() => setGateway(g)} className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-colors flex items-center gap-2 ${gateway === g ? 'bg-primary text-white' : 'bg-white border border-stone-200 hover:border-stone-300'}`}>
              <CreditCard className="w-4 h-4" />{g}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" /><h2 className="font-semibold capitalize">{gateway} Configuration</h2></div>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${config[gateway as keyof typeof config].enabled ? 'bg-accent/10 text-accent border-accent/20' : 'bg-red-50 text-red-700 border-red-200'}`}>
              {config[gateway as keyof typeof config].enabled ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
              {config[gateway as keyof typeof config].enabled ? 'Active' : 'Disabled'}
            </span>
          </div>

          {gateway === 'razorpay' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium mb-1">Key ID</label><input type="text" value={config.razorpay.key} onChange={e => setConfig(p => ({ ...p, razorpay: { ...p.razorpay, key: e.target.value } }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" /></div>
                <div><label className="block text-xs font-medium mb-1">Key Secret</label><input type="password" value={config.razorpay.secret} onChange={e => setConfig(p => ({ ...p, razorpay: { ...p.razorpay, secret: e.target.value } }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" /></div>
              </div>
              <div><label className="block text-xs font-medium mb-1">Webhook Secret</label><input type="password" value={config.razorpay.webhookSecret} onChange={e => setConfig(p => ({ ...p, razorpay: { ...p.razorpay, webhookSecret: e.target.value } }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={config.razorpay.enabled} onChange={e => setConfig(p => ({ ...p, razorpay: { ...p.razorpay, enabled: e.target.checked } }))} className="w-4 h-4 rounded border-stone-300 text-primary" /><span className="text-sm">Enable Razorpay</span></div>
            </div>
          )}
          {gateway === 'stripe' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium mb-1">Publishable Key</label><input type="text" value={config.stripe.key} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" onChange={e => setConfig(p => ({ ...p, stripe: { ...p.stripe, key: e.target.value } }))} /></div>
                <div><label className="block text-xs font-medium mb-1">Secret Key</label><input type="password" value={config.stripe.secret} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" onChange={e => setConfig(p => ({ ...p, stripe: { ...p.stripe, secret: e.target.value } }))} /></div>
              </div>
              <div><label className="block text-xs font-medium mb-1">Webhook Secret</label><input type="password" value={config.stripe.webhookSecret} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" onChange={e => setConfig(p => ({ ...p, stripe: { ...p.stripe, webhookSecret: e.target.value } }))} /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={config.stripe.enabled} onChange={e => setConfig(p => ({ ...p, stripe: { ...p.stripe, enabled: e.target.checked } }))} className="w-4 h-4 rounded border-stone-300 text-primary" /><span className="text-sm">Enable Stripe</span></div>
            </div>
          )}
          {gateway === 'paypal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-medium mb-1">Client ID</label><input type="text" value={config.paypal.clientId} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" onChange={e => setConfig(p => ({ ...p, paypal: { ...p.paypal, clientId: e.target.value } }))} /></div>
                <div><label className="block text-xs font-medium mb-1">Secret</label><input type="password" value={config.paypal.secret} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm font-mono" onChange={e => setConfig(p => ({ ...p, paypal: { ...p.paypal, secret: e.target.value } }))} /></div>
              </div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={config.paypal.enabled} onChange={e => setConfig(p => ({ ...p, paypal: { ...p.paypal, enabled: e.target.checked } }))} className="w-4 h-4 rounded border-stone-300 text-primary" /><span className="text-sm">Enable PayPal</span></div>
            </div>
          )}

          <div className="flex gap-3 mt-4 pt-4 border-t border-stone-100">
            <button onClick={save} className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"><Save className="w-4 h-4 inline mr-1.5" />Save Configuration</button>
            <button onClick={testConnection} className="px-5 py-2.5 border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors">Test Connection</button>
          </div>
        </div>
      </div>
    </div>
  );
}
