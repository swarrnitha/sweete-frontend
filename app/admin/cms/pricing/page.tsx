'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Plus, Edit2, Trash2, IndianRupee } from 'lucide-react';

const initialPlans = [
  { id: 1, name: 'Starter', price: 1499, period: 'Monthly', features: '1 hoarding, Basic analytics, Email support', popular: false },
  { id: 2, name: 'Professional', price: 2999, period: 'Monthly', features: '3 hoardings, Advanced analytics, Priority support, Creative management', popular: true },
  { id: 3, name: 'Premium', price: 4999, period: 'Monthly', features: 'Unlimited hoardings, Real-time analytics, Dedicated account manager, Custom creatives, API access', popular: false },
];

export default function PricingCMSPage() {
  const [plans, setPlans] = useState(initialPlans);
  const [editing, setEditing] = useState<{ id: number | null; name: string; price: string; period: string; features: string; popular: boolean }>({ id: null, name: '', price: '', period: 'Monthly', features: '', popular: false });

  const startAdd = () => setEditing({ id: null, name: '', price: '', period: 'Monthly', features: '', popular: false });
  const startEdit = (p: typeof initialPlans[0]) => setEditing({ id: p.id, name: p.name, price: p.price.toString(), period: p.period, features: p.features, popular: p.popular });

  const save = () => {
    if (!editing.name || !editing.price) { toast.error('Name and price are required.'); return; }
    if (editing.id) {
      setPlans(prev => prev.map(p => p.id === editing.id ? { ...p, name: editing.name, price: parseInt(editing.price), period: editing.period, features: editing.features, popular: editing.popular } : p));
      toast.success('Plan updated.');
    } else {
      setPlans(prev => [...prev, { id: Date.now(), name: editing.name, price: parseInt(editing.price), period: editing.period, features: editing.features, popular: editing.popular }]);
      toast.success('Plan added.');
    }
    setEditing({ id: null, name: '', price: '', period: 'Monthly', features: '', popular: false });
  };

  const remove = (id: number, name: string) => {
    setPlans(prev => prev.filter(p => p.id !== id));
    toast.success(`"${name}" deleted.`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">Pricing Plans Editor</h1><p className="text-foreground/50 text-sm">{plans.length} pricing plans</p></div>
        <div className="flex gap-2">
          <button onClick={startAdd} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Plan</button>
        </div>
      </div>

      {(editing.id !== undefined) && (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4 flex items-end gap-3 flex-wrap">
          <div className="w-36"><label className="block text-xs font-medium mb-1">Name</label><input type="text" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
          <div className="w-28"><label className="block text-xs font-medium mb-1">Price (₹)</label><input type="number" value={editing.price} onChange={e => setEditing(p => ({ ...p, price: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
          <div className="w-28"><label className="block text-xs font-medium mb-1">Period</label><select value={editing.period} onChange={e => setEditing(p => ({ ...p, period: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm"><option>Monthly</option><option>Yearly</option><option>Quarterly</option></select></div>
          <div className="w-56"><label className="block text-xs font-medium mb-1">Features (comma separated)</label><input type="text" value={editing.features} onChange={e => setEditing(p => ({ ...p, features: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
          <div className="flex items-center gap-2 pb-2">
            <label className="flex items-center gap-1.5 text-xs cursor-pointer"><input type="checkbox" checked={editing.popular} onChange={e => setEditing(p => ({ ...p, popular: e.target.checked }))} className="w-4 h-4 rounded border-stone-300 text-primary" /> Popular</label>
          </div>
          <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold">{editing.id ? 'Update' : 'Save'}</button>
          <button onClick={() => setEditing({ id: null, name: '', price: '', period: 'Monthly', features: '', popular: false })} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium">Cancel</button>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {plans.map(p => (
          <div key={p.id} className={`bg-white rounded-2xl border overflow-hidden ${p.popular ? 'border-primary ring-2 ring-primary/20' : 'border-stone-200'}`}>
            {p.popular && <div className="bg-primary text-white text-xs font-semibold text-center py-1">Most Popular</div>}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{p.name}</h3>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(p)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600 hover:bg-blue-50"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => remove(p.id, p.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-bold">₹{p.price}</span>
                <span className="text-foreground/40 text-sm">/{p.period.toLowerCase()}</span>
              </div>
              <div className="mt-3 text-sm text-foreground/60">
                {p.features.split(', ').map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5 py-0.5"><span className="w-1.5 h-1.5 rounded-full bg-primary/40" />{f}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
