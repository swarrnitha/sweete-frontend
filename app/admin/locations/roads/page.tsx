'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, Navigation } from 'lucide-react';

const countries = ['India', 'UAE', 'Singapore'];
const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Dubai', 'Abu Dhabi'];
const cities = ['Mumbai', 'Pune', 'New Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Dubai City'];
const areas = ['Marine Drive', 'Bandra Kurla Complex', 'Connaught Place', 'MG Road', 'Sarjapur Road', 'Anna Nagar', 'Jubilee Hills', 'FC Road', 'Sheikh Zayed Road'];

const initial = [
  { id: 1, name: 'Marine Drive Promenade', area: 'Marine Drive', city: 'Mumbai', state: 'Maharashtra', hoardings: 5 },
  { id: 2, name: 'BKC Main Road', area: 'Bandra Kurla Complex', city: 'Mumbai', state: 'Maharashtra', hoardings: 8 },
  { id: 3, name: 'MG Road Junction', area: 'MG Road', city: 'Bangalore', state: 'Karnataka', hoardings: 6 },
  { id: 4, name: 'Sarjapur Outer Ring Road', area: 'Sarjapur Road', city: 'Bangalore', state: 'Karnataka', hoardings: 4 },
  { id: 5, name: 'Anna Nagar Tower Road', area: 'Anna Nagar', city: 'Chennai', state: 'Tamil Nadu', hoardings: 3 },
  { id: 6, name: 'Jubilee Hills Road No 36', area: 'Jubilee Hills', city: 'Hyderabad', state: 'Telangana', hoardings: 5 },
  { id: 7, name: 'FC Road Bhandarkar Road', area: 'FC Road', city: 'Pune', state: 'Maharashtra', hoardings: 2 },
  { id: 8, name: 'Connaught Place Inner Circle', area: 'Connaught Place', city: 'New Delhi', state: 'Delhi', hoardings: 4 },
];

export default function RoadsPage() {
  const [roads, setRoads] = useState(initial);
  const [areaFilter, setAreaFilter] = useState('');
  const [editing, setEditing] = useState<{ id: number | null; name: string; area: string; city: string; state: string }>({ id: null, name: '', area: 'Marine Drive', city: 'Mumbai', state: 'Maharashtra' });

  const filtered = areaFilter ? roads.filter(r => r.area === areaFilter) : roads;

  const startAdd = () => setEditing({ id: null, name: '', area: 'Marine Drive', city: 'Mumbai', state: 'Maharashtra' });
  const startEdit = (r: typeof initial[0]) => setEditing({ id: r.id, name: r.name, area: r.area, city: r.city, state: r.state });

  const save = () => {
    if (!editing.name) { toast.error('Road name is required.'); return; }
    if (editing.id) {
      setRoads(prev => prev.map(r => r.id === editing.id ? { ...r, name: editing.name, area: editing.area, city: editing.city, state: editing.state } : r));
      toast.success('Road updated.');
    } else {
      setRoads(prev => [...prev, { id: Date.now(), name: editing.name, area: editing.area, city: editing.city, state: editing.state, hoardings: 0 }]);
      toast.success('Road added.');
    }
    setEditing({ id: null, name: '', area: 'Marine Drive', city: 'Mumbai', state: 'Maharashtra' });
  };

  const remove = (id: number, name: string) => {
    setRoads(prev => prev.filter(r => r.id !== id));
    toast.success(`"${name}" deleted.`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Roads</h1>
          <p className="text-foreground/50 text-sm">{filtered.length} roads with area mapping</p>
        </div>
        <button onClick={startAdd} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Road</button>
      </div>

      <div className="flex gap-3 mb-4">
        <select value={areaFilter} onChange={e => setAreaFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">All Areas</option>
          {areas.map(a => <option key={a}>{a}</option>)}
        </select>
      </div>

      {(editing.id !== undefined) && (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4 flex items-end gap-3 flex-wrap">
          <div className="w-56"><label className="block text-xs font-medium mb-1">Road Name</label><input type="text" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Marine Drive Promenade" /></div>
          <div className="w-40"><label className="block text-xs font-medium mb-1">Area</label><select value={editing.area} onChange={e => setEditing(p => ({ ...p, area: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm">{areas.map(a => <option key={a}>{a}</option>)}</select></div>
          <div className="w-32"><label className="block text-xs font-medium mb-1">City</label><input type="text" value={editing.city} onChange={e => setEditing(p => ({ ...p, city: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
          <div className="w-32"><label className="block text-xs font-medium mb-1">State</label><input type="text" value={editing.state} onChange={e => setEditing(p => ({ ...p, state: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
          <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">{editing.id ? 'Update' : 'Save'}</button>
          <button onClick={() => setEditing({ id: null, name: '', area: 'Marine Drive', city: 'Mumbai', state: 'Maharashtra' })} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors">Cancel</button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">ID</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Road Name</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Area</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">City</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">State</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Hoardings</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                <td className="p-3 text-sm font-mono text-foreground/50">#{r.id}</td>
                <td className="p-3 text-sm font-medium"><div className="flex items-center gap-1.5"><Navigation className="w-3.5 h-3.5 text-foreground/30" />{r.name}</div></td>
                <td className="p-3 text-sm text-foreground/60">{r.area}</td>
                <td className="p-3 text-sm text-foreground/60">{r.city}</td>
                <td className="p-3 text-sm text-foreground/60">{r.state}</td>
                <td className="p-3 text-sm text-foreground/60">{r.hoardings}</td>
                <td className="p-3 text-right"><div className="flex items-center justify-end gap-1">
                  <button onClick={() => startEdit(r)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => remove(r.id, r.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
