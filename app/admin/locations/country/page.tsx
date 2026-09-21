'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Globe } from 'lucide-react';

const initial = [
  { id: 1, name: 'India', code: 'IN', dialCode: '+91', status: 'Active', hoardings: 450 },
  { id: 2, name: 'United Arab Emirates', code: 'AE', dialCode: '+971', status: 'Active', hoardings: 120 },
  { id: 3, name: 'Singapore', code: 'SG', dialCode: '+65', status: 'Active', hoardings: 85 },
  { id: 4, name: 'Indonesia', code: 'ID', dialCode: '+62', status: 'Inactive', hoardings: 0 },
];

export default function CountryPage() {
  const [countries, setCountries] = useState(initial);
  const [editing, setEditing] = useState<{ id: number | null; name: string; code: string; dialCode: string }>({ id: null, name: '', code: '', dialCode: '' });

  const startAdd = () => setEditing({ id: null, name: '', code: '', dialCode: '' });
  const startEdit = (c: typeof initial[0]) => setEditing({ id: c.id, name: c.name, code: c.code, dialCode: c.dialCode });

  const save = () => {
    if (!editing.name || !editing.code) { toast.error('Name and Code are required.'); return; }
    if (editing.id) {
      setCountries(prev => prev.map(c => c.id === editing.id ? { ...c, name: editing.name, code: editing.code, dialCode: editing.dialCode } : c));
      toast.success('Country updated.');
    } else {
      setCountries(prev => [...prev, { id: Date.now(), name: editing.name, code: editing.code, dialCode: editing.dialCode, status: 'Active', hoardings: 0 }]);
      toast.success('Country added.');
    }
    setEditing({ id: null, name: '', code: '', dialCode: '' });
  };

  const remove = (id: number, name: string) => {
    setCountries(prev => prev.filter(c => c.id !== id));
    toast.success(`"${name}" deleted.`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Countries</h1>
            <p className="text-foreground/50 text-sm">{countries.length} countries</p>
          </div>
        </div>
        <button onClick={startAdd} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Country</button>
      </div>

      {/* Inline Add/Edit Form */}
      {(editing.id !== undefined) && (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4 flex items-end gap-3">
          <div className="flex-1"><label className="block text-xs font-medium mb-1">Country Name</label><input type="text" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. India" /></div>
          <div className="w-20"><label className="block text-xs font-medium mb-1">Code</label><input type="text" value={editing.code} onChange={e => setEditing(p => ({ ...p, code: e.target.value.toUpperCase() }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="IN" /></div>
          <div className="w-28"><label className="block text-xs font-medium mb-1">Dial Code</label><input type="text" value={editing.dialCode} onChange={e => setEditing(p => ({ ...p, dialCode: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="+91" /></div>
          <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">{editing.id ? 'Update' : 'Save'}</button>
          <button onClick={() => setEditing({ id: null, name: '', code: '', dialCode: '' })} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors">Cancel</button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">ID</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Name</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Code</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Dial Code</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Status</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Hoardings</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Actions</th>
          </tr></thead>
          <tbody>
            {countries.map(c => (
              <tr key={c.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                <td className="p-3 text-sm font-mono text-foreground/50">#{c.id}</td>
                <td className="p-3 text-sm font-medium">{c.name}</td>
                <td className="p-3 text-sm font-mono uppercase">{c.code}</td>
                <td className="p-3 text-sm">{c.dialCode}</td>
                <td className="p-3"><span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${c.status === 'Active' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-stone-100 text-stone-500 border-stone-200'}`}>{c.status}</span></td>
                <td className="p-3 text-sm text-foreground/60">{c.hoardings}</td>
                <td className="p-3 text-right"><div className="flex items-center justify-end gap-1">
                  <button onClick={() => startEdit(c)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => remove(c.id, c.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
