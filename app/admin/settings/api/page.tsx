'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Key, Plus, Trash2, Copy, RefreshCw, Eye, EyeOff } from 'lucide-react';

const initial = [
  { id: 1, name: 'Production API Key', key: 'hfy_prod_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', created: '2026-01-15', lastUsed: '2026-07-18 11:30 AM', status: 'Active', permissions: ['Read', 'Write'] },
  { id: 2, name: 'Testing API Key', key: 'hfy_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', created: '2026-03-01', lastUsed: '2026-07-17 04:15 PM', status: 'Active', permissions: ['Read'] },
  { id: 3, name: 'Mobile App Key', key: 'hfy_mobile_xxxxxxxxxxxxxxxxxxxxxxxxxxxx', created: '2026-05-10', lastUsed: '2026-07-18 10:00 AM', status: 'Active', permissions: ['Read', 'Write'] },
  { id: 4, name: 'Old Integration Key', key: 'hfy_legacy_xxxxxxxxxxxxxxxxxxxxxxxxxxx', created: '2025-08-01', lastUsed: '2026-06-01 09:00 AM', status: 'Revoked', permissions: ['Read'] },
];

export default function APIKeysPage() {
  const [keys, setKeys] = useState(initial);
  const [visible, setVisible] = useState<number | null>(null);

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('API key copied to clipboard!');
  };

  const revoke = (id: number, name: string) => {
    setKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'Revoked' } : k));
    toast.success(`"${name}" revoked.`);
  };

  const regenerate = (id: number, name: string) => {
    setKeys(prev => prev.map(k => k.id === id ? { ...k, key: k.key.substring(0, k.key.lastIndexOf('_') + 1) + 'x'.repeat(32), lastUsed: new Date().toLocaleString() } : k));
    toast.success(`New key generated for "${name}"`);
  };

  const generateNew = () => {
    toast.success('New API key generated!');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">API Keys</h1><p className="text-foreground/50 text-sm">{keys.filter(k => k.status === 'Active').length} active keys</p></div>
        <button onClick={generateNew} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Plus className="w-4 h-4" /> Generate New Key</button>
      </div>

      <div className="space-y-3">
        {keys.map(k => (
          <div key={k.id} className="bg-white rounded-2xl border border-stone-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-foreground/30" />
                  <p className="font-semibold text-sm">{k.name}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${k.status === 'Active' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-red-50 text-red-700 border-red-200'}`}>{k.status}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <code className="text-xs font-mono bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200">
                    {visible === k.id ? k.key : k.key.substring(0, 20) + '••••••••••••••••••'}
                  </code>
                  <button onClick={() => setVisible(visible === k.id ? null : k.id)} className="p-1 rounded text-foreground/30 hover:text-foreground/60">
                    {visible === k.id ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => copyKey(k.key)} className="p-1 rounded text-foreground/30 hover:text-primary">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-xs text-foreground/40 mt-1.5">
                  <span>Created: {k.created}</span>
                  <span>Last used: {k.lastUsed}</span>
                  <span>Permissions: {k.permissions.join(', ')}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0 ml-4">
                {k.status === 'Active' && (
                  <>
                    <button onClick={() => regenerate(k.id, k.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-amber-600 hover:bg-amber-50" title="Regenerate"><RefreshCw className="w-4 h-4" /></button>
                    <button onClick={() => revoke(k.id, k.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600 hover:bg-red-50" title="Revoke"><Trash2 className="w-4 h-4" /></button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
