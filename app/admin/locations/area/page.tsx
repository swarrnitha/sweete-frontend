'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';

const countries = ['India', 'UAE', 'Singapore'];
const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Dubai', 'Abu Dhabi'];
const cities = ['Mumbai', 'Pune', 'New Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Nagpur', 'Dubai City', 'Abu Dhabi City'];

const initial = [
  { id: 1, name: 'Marine Drive', city: 'Mumbai', state: 'Maharashtra', country: 'India', hoardings: 8 },
  { id: 2, name: 'Bandra Kurla Complex', city: 'Mumbai', state: 'Maharashtra', country: 'India', hoardings: 12 },
  { id: 3, name: 'Connaught Place', city: 'New Delhi', state: 'Delhi', country: 'India', hoardings: 6 },
  { id: 4, name: 'MG Road', city: 'Bangalore', state: 'Karnataka', country: 'India', hoardings: 10 },
  { id: 5, name: 'Sarjapur Road', city: 'Bangalore', state: 'Karnataka', country: 'India', hoardings: 7 },
  { id: 6, name: 'Anna Nagar', city: 'Chennai', state: 'Tamil Nadu', country: 'India', hoardings: 5 },
  { id: 7, name: 'Jubilee Hills', city: 'Hyderabad', state: 'Telangana', country: 'India', hoardings: 9 },
  { id: 8, name: 'FC Road', city: 'Pune', state: 'Maharashtra', country: 'India', hoardings: 4 },
  { id: 9, name: 'Sheikh Zayed Road', city: 'Dubai City', state: 'Dubai', country: 'UAE', hoardings: 15 },
];

export default function AreaPage() {
  const [areas, setAreas] = useState(initial);
  const [cityFilter, setCityFilter] = useState('');
  const [editing, setEditing] = useState<{ id: number | null; name: string; city: string; state: string; country: string }>({ id: null, name: '', city: 'Mumbai', state: 'Maharashtra', country: 'India' });

  const filtered = cityFilter ? areas.filter(a => a.city === cityFilter) : areas;

  const startAdd = () => setEditing({ id: null, name: '', city: 'Mumbai', state: 'Maharashtra', country: 'India' });
  const startEdit = (a: typeof initial[0]) => setEditing({ id: a.id, name: a.name, city: a.city, state: a.state, country: a.country });

  const save = () => {
    if (!editing.name) { toast.error('Area name is required.'); return; }
    if (editing.id) {
      setAreas(prev => prev.map(a => a.id === editing.id ? { ...a, name: editing.name, city: editing.city, state: editing.state, country: editing.country } : a));
      toast.success('Area updated.');
    } else {
      setAreas(prev => [...prev, { id: Date.now(), name: editing.name, city: editing.city, state: editing.state, country: editing.country, hoardings: 0 }]);
      toast.success('Area added.');
    }
    setEditing({ id: null, name: '', city: 'Mumbai', state: 'Maharashtra', country: 'India' });
  };

  const remove = (id: number, name: string) => {
    setAreas(prev => prev.filter(a => a.id !== id));
    toast.success(`"${name}" deleted.`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Areas</h1>
          <p className="text-foreground/50 text-sm">{filtered.length} areas with city mapping</p>
        </div>
        <button onClick={startAdd} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Area</button>
      </div>

      <div className="flex gap-3 mb-4">
        <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">All Cities</option>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {(editing.id !== undefined) && (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4 flex items-end gap-3 flex-wrap">
          <div className="w-48"><label className="block text-xs font-medium mb-1">Area Name</label><input type="text" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Marine Drive" /></div>
          <div className="w-36"><label className="block text-xs font-medium mb-1">City</label><select value={editing.city} onChange={e => setEditing(p => ({ ...p, city: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm">{cities.map(c => <option key={c}>{c}</option>)}</select></div>
          <div className="w-36"><label className="block text-xs font-medium mb-1">State</label><input type="text" value={editing.state} onChange={e => setEditing(p => ({ ...p, state: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
          <div className="w-28"><label className="block text-xs font-medium mb-1">Country</label><input type="text" value={editing.country} onChange={e => setEditing(p => ({ ...p, country: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
          <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">{editing.id ? 'Update' : 'Save'}</button>
          <button onClick={() => setEditing({ id: null, name: '', city: 'Mumbai', state: 'Maharashtra', country: 'India' })} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors">Cancel</button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">ID</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Name</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">City</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">State</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Country</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Hoardings</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                <td className="p-3 text-sm font-mono text-foreground/50">#{a.id}</td>
                <td className="p-3 text-sm font-medium"><div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-foreground/30" />{a.name}</div></td>
                <td className="p-3 text-sm text-foreground/60">{a.city}</td>
                <td className="p-3 text-sm text-foreground/60">{a.state}</td>
                <td className="p-3 text-sm text-foreground/60">{a.country}</td>
                <td className="p-3 text-sm text-foreground/60">{a.hoardings}</td>
                <td className="p-3 text-right"><div className="flex items-center justify-end gap-1">
                  <button onClick={() => startEdit(a)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => remove(a.id, a.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
