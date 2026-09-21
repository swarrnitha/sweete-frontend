'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, MapPin, ExternalLink } from 'lucide-react';

const cities = ['Mumbai', 'New Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Dubai City'];

const initial = [
  { id: 1, name: 'Gateway of India', city: 'Mumbai', area: 'Colaba', lat: '18.9219', lng: '72.8347', hoardings: 3 },
  { id: 2, name: 'India Gate', city: 'New Delhi', area: 'Central Delhi', lat: '28.6129', lng: '77.2295', hoardings: 2 },
  { id: 3, name: 'Vidhana Soudha', city: 'Bangalore', area: 'Cubbon Park', lat: '12.9791', lng: '77.5913', hoardings: 1 },
  { id: 4, name: 'Marina Beach', city: 'Chennai', area: 'Marina', lat: '13.0500', lng: '80.2824', hoardings: 4 },
  { id: 5, name: 'Charminar', city: 'Hyderabad', area: 'Old City', lat: '17.3616', lng: '78.4747', hoardings: 2 },
  { id: 6, name: 'Shaniwar Wada', city: 'Pune', area: 'Shaniwar Peth', lat: '18.5195', lng: '73.8553', hoardings: 1 },
  { id: 7, name: 'Burj Khalifa', city: 'Dubai City', area: 'Downtown Dubai', lat: '25.1972', lng: '55.2744', hoardings: 5 },
  { id: 8, name: 'Bandra-Worli Sea Link', city: 'Mumbai', area: 'Bandra', lat: '19.0348', lng: '72.8202', hoardings: 2 },
  { id: 9, name: 'Lalbagh Botanical Garden', city: 'Bangalore', area: 'Lalbagh', lat: '12.9507', lng: '77.5848', hoardings: 0 },
];

export default function LandmarksPage() {
  const [landmarks, setLandmarks] = useState(initial);
  const [cityFilter, setCityFilter] = useState('');
  const [editing, setEditing] = useState<{ id: number | null; name: string; city: string; area: string; lat: string; lng: string }>({ id: null, name: '', city: 'Mumbai', area: '', lat: '', lng: '' });

  const filtered = cityFilter ? landmarks.filter(l => l.city === cityFilter) : landmarks;

  const startAdd = () => setEditing({ id: null, name: '', city: 'Mumbai', area: '', lat: '', lng: '' });
  const startEdit = (l: typeof initial[0]) => setEditing({ id: l.id, name: l.name, city: l.city, area: l.area, lat: l.lat, lng: l.lng });

  const save = () => {
    if (!editing.name) { toast.error('Landmark name is required.'); return; }
    if (editing.id) {
      setLandmarks(prev => prev.map(l => l.id === editing.id ? { ...l, name: editing.name, city: editing.city, area: editing.area, lat: editing.lat, lng: editing.lng } : l));
      toast.success('Landmark updated.');
    } else {
      setLandmarks(prev => [...prev, { id: Date.now(), name: editing.name, city: editing.city, area: editing.area, lat: editing.lat, lng: editing.lng, hoardings: 0 }]);
      toast.success('Landmark added.');
    }
    setEditing({ id: null, name: '', city: 'Mumbai', area: '', lat: '', lng: '' });
  };

  const remove = (id: number, name: string) => {
    setLandmarks(prev => prev.filter(l => l.id !== id));
    toast.success(`"${name}" deleted.`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Landmarks</h1>
          <p className="text-foreground/50 text-sm">{filtered.length} landmarks with Google Maps location</p>
        </div>
        <button onClick={startAdd} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Landmark</button>
      </div>

      <div className="flex gap-3 mb-4">
        <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">All Cities</option>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {(editing.id !== undefined) && (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4 flex items-end gap-3 flex-wrap">
          <div className="w-48"><label className="block text-xs font-medium mb-1">Landmark Name</label><input type="text" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="e.g. Gateway of India" /></div>
          <div className="w-32"><label className="block text-xs font-medium mb-1">City</label><select value={editing.city} onChange={e => setEditing(p => ({ ...p, city: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm">{cities.map(c => <option key={c}>{c}</option>)}</select></div>
          <div className="w-36"><label className="block text-xs font-medium mb-1">Area</label><input type="text" value={editing.area} onChange={e => setEditing(p => ({ ...p, area: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" placeholder="e.g. Colaba" /></div>
          <div className="w-28"><label className="block text-xs font-medium mb-1">Latitude</label><input type="text" value={editing.lat} onChange={e => setEditing(p => ({ ...p, lat: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" placeholder="18.9219" /></div>
          <div className="w-28"><label className="block text-xs font-medium mb-1">Longitude</label><input type="text" value={editing.lng} onChange={e => setEditing(p => ({ ...p, lng: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" placeholder="72.8347" /></div>
          <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">{editing.id ? 'Update' : 'Save'}</button>
          <button onClick={() => setEditing({ id: null, name: '', city: 'Mumbai', area: '', lat: '', lng: '' })} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors">Cancel</button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">ID</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Name</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">City</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Area</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">GPS Coordinates</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Maps</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Hoardings</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                <td className="p-3 text-sm font-mono text-foreground/50">#{l.id}</td>
                <td className="p-3 text-sm font-medium"><div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-foreground/30" />{l.name}</div></td>
                <td className="p-3 text-sm text-foreground/60">{l.city}</td>
                <td className="p-3 text-sm text-foreground/60">{l.area}</td>
                <td className="p-3 text-sm font-mono text-xs text-foreground/50">{l.lat}, {l.lng}</td>
                <td className="p-3">
                  <a href={`https://www.google.com/maps?q=${l.lat},${l.lng}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                    <ExternalLink className="w-3 h-3" /> Open Maps
                  </a>
                </td>
                <td className="p-3 text-sm text-foreground/60">{l.hoardings}</td>
                <td className="p-3 text-right"><div className="flex items-center justify-end gap-1">
                  <button onClick={() => startEdit(l)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => remove(l.id, l.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
