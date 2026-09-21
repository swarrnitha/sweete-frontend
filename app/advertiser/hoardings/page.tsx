'use client';
import { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, IndianRupee, Heart } from 'lucide-react';
import { hoardings } from '@/components/organisms/hoardings-data';

export default function AdvertiserHoardingsPage() {
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) setSavedIds(JSON.parse(stored));
  }, []);

  const toggleSave = (id: number) => {
    const updated = savedIds.includes(id) ? savedIds.filter(i => i !== id) : [...savedIds, id];
    setSavedIds(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const cities = useMemo(() => [...new Set(hoardings.map(h => h.location))], []);
  const filtered = useMemo(() => {
    return hoardings.filter(h => {
      if (search && !h.name.toLowerCase().includes(search.toLowerCase()) && !h.location.toLowerCase().includes(search.toLowerCase())) return false;
      if (cityFilter && h.location !== cityFilter) return false;
      return true;
    });
  }, [search, cityFilter]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Explore Hoardings</h1>
      <p className="text-foreground/50 mb-6">Search and browse available billboard locations.</p>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input type="text" placeholder="Search by name or location..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
        </div>
        <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-foreground/40">No hoardings found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(h => (
            <div key={h.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-36 relative overflow-hidden bg-stone-100">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">{h.tag}</span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{h.name}</h3>
                  <button onClick={() => toggleSave(h.id)} className={`transition-colors ${savedIds.includes(h.id) ? 'text-red-500' : 'text-foreground/30 hover:text-red-400'}`}>
                    <Heart className="w-4 h-4" fill={savedIds.includes(h.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-foreground/60 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {h.location}
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mt-3">
                  <IndianRupee className="w-3.5 h-3.5" /> ₹{h.price.toLocaleString()}/month
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
