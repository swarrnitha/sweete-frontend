'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const countries = ['India', 'UAE', 'Singapore', 'Indonesia'];

const initial = [
  { id: 1, name: 'Maharashtra', country: 'India', code: 'MH', hoardings: 180 },
  { id: 2, name: 'Delhi', country: 'India', code: 'DL', hoardings: 95 },
  { id: 3, name: 'Karnataka', country: 'India', code: 'KA', hoardings: 72 },
  { id: 4, name: 'Tamil Nadu', country: 'India', code: 'TN', hoardings: 45 },
  { id: 5, name: 'Telangana', country: 'India', code: 'TS', hoardings: 38 },
  { id: 6, name: 'Dubai', country: 'UAE', code: 'DU', hoardings: 80 },
  { id: 7, name: 'Abu Dhabi', country: 'UAE', code: 'AD', hoardings: 40 },
];

export default function StatePage() {
  const [states, setStates] = useState(initial);
  const [countryFilter, setCountryFilter] = useState('');
  const [editing, setEditing] = useState<{ id: number | null; name: string; country: string; code: string }>({ id: null, name: '', country: 'India', code: '' });

  const filtered = countryFilter ? states.filter(s => s.country === countryFilter) : states;

  const startAdd = () => setEditing({ id: null, name: '', country: 'India', code: '' });
  const startEdit = (s: typeof initial[0]) => setEditing({ id: s.id, name: s.name, country: s.country, code: s.code });

  const save = () => {
    if (!editing.name || !editing.code) { toast.error('Name and Code are required.'); return; }
    if (editing.id) {
      setStates(prev => prev.map(s => s.id === editing.id ? { ...s, name: editing.name, country: editing.country, code: editing.code } : s));
      toast.success('State updated.');
    } else {
      setStates(prev => [...prev, { id: Date.now(), name: editing.name, country: editing.country, code: editing.code, hoardings: 0 }]);
      toast.success('State added.');
    }
    setEditing({ id: null, name: '', country: 'India', code: '' });
  };

  const remove = (id: number, name: string) => {
    setStates(prev => prev.filter(s => s.id !== id));
    toast.success(`"${name}" deleted.`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">States</h1>
          <p className="text-foreground/50 text-sm">{filtered.length} states</p>
        </div>
        <button onClick={startAdd} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add State</button>
      </div>

      <div className="flex gap-3 mb-4">
        <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">All Countries</option>
          {countries.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {(editing.id !== undefined) && (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4 flex items-end gap-3">
          <div className="flex-1"><label className="block text-xs font-medium mb-1">State Name</label><input type="text" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Maharashtra" /></div>
          <div className="w-36"><label className="block text-xs font-medium mb-1">Country</label><select value={editing.country} onChange={e => setEditing(p => ({ ...p, country: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm">{countries.map(c => <option key={c}>{c}</option>)}</select></div>
          <div className="w-20"><label className="block text-xs font-medium mb-1">Code</label><input type="text" value={editing.code} onChange={e => setEditing(p => ({ ...p, code: e.target.value.toUpperCase() }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="MH" /></div>
          <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">{editing.id ? 'Update' : 'Save'}</button>
          <button onClick={() => setEditing({ id: null, name: '', country: 'India', code: '' })} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors">Cancel</button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">ID</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Name</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Country</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Code</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Hoardings</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                <td className="p-3 text-sm font-mono text-foreground/50">#{s.id}</td>
                <td className="p-3 text-sm font-medium">{s.name}</td>
                <td className="p-3 text-sm text-foreground/60">{s.country}</td>
                <td className="p-3 text-sm font-mono uppercase">{s.code}</td>
                <td className="p-3 text-sm text-foreground/60">{s.hoardings}</td>
                <td className="p-3 text-right"><div className="flex items-center justify-end gap-1">
                  <button onClick={() => startEdit(s)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => remove(s.id, s.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
