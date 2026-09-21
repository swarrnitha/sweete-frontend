'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Dubai', 'Abu Dhabi'];

const initial = [
  { id: 1, name: 'Mumbai', state: 'Maharashtra', hoardings: 120 },
  { id: 2, name: 'Pune', state: 'Maharashtra', hoardings: 45 },
  { id: 3, name: 'New Delhi', state: 'Delhi', hoardings: 85 },
  { id: 4, name: 'Bangalore', state: 'Karnataka', hoardings: 62 },
  { id: 5, name: 'Chennai', state: 'Tamil Nadu', hoardings: 38 },
  { id: 6, name: 'Hyderabad', state: 'Telangana', hoardings: 35 },
  { id: 7, name: 'Nagpur', state: 'Maharashtra', hoardings: 15 },
  { id: 8, name: 'Dubai City', state: 'Dubai', hoardings: 80 },
  { id: 9, name: 'Abu Dhabi City', state: 'Abu Dhabi', hoardings: 40 },
];

export default function CityPage() {
  const [cities, setCities] = useState(initial);
  const [stateFilter, setStateFilter] = useState('');
  const [editing, setEditing] = useState<{ id: number | null; name: string; state: string }>({ id: null, name: '', state: 'Maharashtra' });

  const filtered = stateFilter ? cities.filter(c => c.state === stateFilter) : cities;

  const startAdd = () => setEditing({ id: null, name: '', state: 'Maharashtra' });
  const startEdit = (c: typeof initial[0]) => setEditing({ id: c.id, name: c.name, state: c.state });

  const save = () => {
    if (!editing.name) { toast.error('City name is required.'); return; }
    if (editing.id) {
      setCities(prev => prev.map(c => c.id === editing.id ? { ...c, name: editing.name, state: editing.state } : c));
      toast.success('City updated.');
    } else {
      setCities(prev => [...prev, { id: Date.now(), name: editing.name, state: editing.state, hoardings: 0 }]);
      toast.success('City added.');
    }
    setEditing({ id: null, name: '', state: 'Maharashtra' });
  };

  const remove = (id: number, name: string) => {
    setCities(prev => prev.filter(c => c.id !== id));
    toast.success(`"${name}" deleted.`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Cities</h1>
          <p className="text-foreground/50 text-sm">{filtered.length} cities</p>
        </div>
        <button onClick={startAdd} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add City</button>
      </div>

      <div className="flex gap-3 mb-4">
        <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">All States</option>
          {states.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {(editing.id !== undefined) && (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4 flex items-end gap-3">
          <div className="flex-1"><label className="block text-xs font-medium mb-1">City Name</label><input type="text" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Mumbai" /></div>
          <div className="w-40"><label className="block text-xs font-medium mb-1">State</label><select value={editing.state} onChange={e => setEditing(p => ({ ...p, state: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm">{states.map(s => <option key={s}>{s}</option>)}</select></div>
          <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">{editing.id ? 'Update' : 'Save'}</button>
          <button onClick={() => setEditing({ id: null, name: '', state: 'Maharashtra' })} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors">Cancel</button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">ID</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Name</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">State</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Hoardings</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                <td className="p-3 text-sm font-mono text-foreground/50">#{c.id}</td>
                <td className="p-3 text-sm font-medium">{c.name}</td>
                <td className="p-3 text-sm text-foreground/60">{c.state}</td>
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
