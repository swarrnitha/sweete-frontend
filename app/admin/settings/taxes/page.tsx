'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Percent, Plus, Edit2, Trash2 } from 'lucide-react';

const initial = [
  { id: 1, name: 'GST 18%', type: 'GST', rate: 18, appliesTo: 'All bookings & subscriptions', isDefault: true },
  { id: 2, name: 'GST 12%', type: 'GST', rate: 12, appliesTo: 'Hoarding rental under ₹25,000/mo', isDefault: false },
  { id: 3, name: 'Service Tax', type: 'Service Tax', rate: 5, appliesTo: 'Creative design services', isDefault: false },
];

export default function TaxesPage() {
  const [taxes, setTaxes] = useState(initial);
  const [editing, setEditing] = useState<{ id: number | null; name: string; type: string; rate: string; appliesTo: string }>({ id: null, name: '', type: 'GST', rate: '', appliesTo: '' });

  const startAdd = () => setEditing({ id: null, name: '', type: 'GST', rate: '', appliesTo: '' });
  const startEdit = (t: typeof initial[0]) => setEditing({ id: t.id, name: t.name, type: t.type, rate: t.rate.toString(), appliesTo: t.appliesTo });

  const save = () => {
    if (!editing.name || !editing.rate) { toast.error('Name and rate are required.'); return; }
    if (editing.id) {
      setTaxes(prev => prev.map(t => t.id === editing.id ? { ...t, name: editing.name, type: editing.type, rate: parseFloat(editing.rate), appliesTo: editing.appliesTo } : t));
      toast.success('Tax rule updated.');
    } else {
      setTaxes(prev => [...prev, { id: Date.now(), name: editing.name, type: editing.type, rate: parseFloat(editing.rate), appliesTo: editing.appliesTo, isDefault: false }]);
      toast.success('Tax rule added.');
    }
    setEditing({ id: null, name: '', type: 'GST', rate: '', appliesTo: '' });
  };

  const remove = (id: number, name: string) => {
    if (taxes.find(t => t.id === id)?.isDefault) { toast.error('Cannot delete default tax rule.'); return; }
    setTaxes(prev => prev.filter(t => t.id !== id));
    toast.success(`"${name}" deleted.`);
  };

  const setDefault = (id: number) => {
    setTaxes(prev => prev.map(t => ({ ...t, isDefault: t.id === id })));
    toast.success('Default tax rule updated.');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6"><div><h1 className="text-2xl font-bold">Tax Settings</h1><p className="text-foreground/50 text-sm">GST / VAT configuration</p></div><button onClick={startAdd} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Tax Rule</button></div>
      <div className="max-w-3xl space-y-4">
        {(editing.id !== undefined) && (
          <div className="bg-white rounded-2xl border border-stone-200 p-4 flex items-end gap-3 flex-wrap">
            <div className="w-44"><label className="block text-xs font-medium mb-1">Name</label><input type="text" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
            <div className="w-28"><label className="block text-xs font-medium mb-1">Type</label><select value={editing.type} onChange={e => setEditing(p => ({ ...p, type: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm"><option>GST</option><option>VAT</option><option>Service Tax</option></select></div>
            <div className="w-24"><label className="block text-xs font-medium mb-1">Rate (%)</label><input type="number" value={editing.rate} onChange={e => setEditing(p => ({ ...p, rate: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
            <div className="flex-1"><label className="block text-xs font-medium mb-1">Applies To</label><input type="text" value={editing.appliesTo} onChange={e => setEditing(p => ({ ...p, appliesTo: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
            <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold">{editing.id ? 'Update' : 'Save'}</button>
            <button onClick={() => setEditing({ id: null, name: '', type: 'GST', rate: '', appliesTo: '' })} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium">Cancel</button>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="overflow-x-auto"><table className="w-full text-left">
            <thead><tr className="border-b border-stone-200 bg-stone-50">
              <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Name</th>
              <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Type</th>
              <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Rate</th>
              <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Applies To</th>
              <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Default</th>
              <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Actions</th>
            </tr></thead>
            <tbody>
              {taxes.map(t => (
                <tr key={t.id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="p-3 text-sm font-medium">{t.name}</td>
                  <td className="p-3 text-sm"><span className="text-xs px-2 py-0.5 rounded-full border bg-blue-50 text-blue-700 border-blue-200">{t.type}</span></td>
                  <td className="p-3 text-sm font-semibold">{t.rate}%</td>
                  <td className="p-3 text-sm text-foreground/60">{t.appliesTo}</td>
                  <td className="p-3">
                    {t.isDefault ? <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">Default</span>
                    : <button onClick={() => setDefault(t.id)} className="text-xs text-primary hover:text-primary/80 font-medium">Set as Default</button>}
                  </td>
                  <td className="p-3 text-right"><div className="flex items-center justify-end gap-1">
                    <button onClick={() => startEdit(t)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => remove(t.id, t.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      </div>
    </div>
  );
}
