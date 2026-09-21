'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Edit, Trash2, MapPin, Maximize } from 'lucide-react';

const allHoardings = [
  { id: 1, name: 'Marine Drive Premium', location: 'Mumbai', area: 'Marine Drive', type: 'Billboard', width: 20, height: 10, size: '20x10 ft', status: 'Occupied', price: 75000, image: 'https://picsum.photos/seed/marine-drive/80/60' },
  { id: 2, name: 'Connaught Place Signage', location: 'Delhi', area: 'Connaught Place', type: 'Digital Screen', width: 15, height: 8, size: '15x8 ft', status: 'Available', price: 60000, image: 'https://picsum.photos/seed/connaught/80/60' },
  { id: 3, name: 'MG Road Billboard', location: 'Bangalore', area: 'MG Road', type: 'Billboard', width: 25, height: 12, size: '25x12 ft', status: 'Available', price: 45000, image: 'https://picsum.photos/seed/mgroad/80/60' },
  { id: 4, name: 'BKC Junction', location: 'Mumbai', area: 'Bandra Kurla Complex', type: 'Billboard', width: 30, height: 15, size: '30x15 ft', status: 'Occupied', price: 85000, image: 'https://picsum.photos/seed/bkc/80/60' },
  { id: 5, name: 'Anna Nagar Tower', location: 'Chennai', area: 'Anna Nagar', type: 'Pole Display', width: 10, height: 5, size: '10x5 ft', status: 'Maintenance', price: 35000, image: 'https://picsum.photos/seed/annanagar/80/60' },
  { id: 6, name: 'Sarjapur Road Hoarding', location: 'Bangalore', area: 'Sarjapur Road', type: 'Billboard', width: 20, height: 10, size: '20x10 ft', status: 'Pending', price: 40000, image: 'https://picsum.photos/seed/sarjapur/80/60' },
  { id: 7, name: 'Park Street Banner', location: 'Kolkata', area: 'Park Street', type: 'Banner', width: 12, height: 6, size: '12x6 ft', status: 'Available', price: 30000, image: 'https://picsum.photos/seed/parkstreet/80/60' },
  { id: 8, name: 'Jubilee Hills Display', location: 'Hyderabad', area: 'Jubilee Hills', type: 'Digital Screen', width: 18, height: 10, size: '18x10 ft', status: 'Occupied', price: 55000, image: 'https://picsum.photos/seed/jubilee/80/60' },
  { id: 9, name: 'FC Road Billboard', location: 'Pune', area: 'FC Road', type: 'Billboard', width: 22, height: 11, size: '22x11 ft', status: 'Available', price: 42000, image: 'https://picsum.photos/seed/fcroad/80/60' },
  { id: 10, name: 'C Scheme Signage', location: 'Jaipur', area: 'C Scheme', type: 'Building Wrap', width: 40, height: 20, size: '40x20 ft', status: 'Pending', price: 65000, image: 'https://picsum.photos/seed/cscheme/80/60' },
];

const statusStyles: Record<string, string> = {
  Available: 'bg-accent/10 text-accent border-accent/20',
  Occupied: 'bg-blue-50 text-blue-700 border-blue-200',
  Maintenance: 'bg-amber-50 text-amber-700 border-amber-200',
  Pending: 'bg-purple-50 text-purple-700 border-purple-200',
};

export default function AllHoardingsPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const cities = useMemo(() => [...new Set(allHoardings.map(h => h.location))], []);
  const sizes = useMemo(() => [...new Set(allHoardings.map(h => h.size))], []);

  const filtered = useMemo(() => allHoardings.filter(h => {
    if (search && !h.name.toLowerCase().includes(search.toLowerCase()) && !h.location.toLowerCase().includes(search.toLowerCase()) && !h.area.toLowerCase().includes(search.toLowerCase())) return false;
    if (cityFilter && h.location !== cityFilter) return false;
    if (sizeFilter && h.size !== sizeFilter) return false;
    if (statusFilter && h.status !== statusFilter) return false;
    return true;
  }), [search, cityFilter, sizeFilter, statusFilter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">All Hoardings</h1>
          <p className="text-foreground/50 text-sm">{filtered.length} hoardings found</p>
        </div>
        <button onClick={() => router.push('/admin/hoardings/add')} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">+ Add New</button>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input type="text" placeholder="Search by name, location, area..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" />
        </div>
        <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">All Cities</option>
          {cities.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={sizeFilter} onChange={e => setSizeFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">All Sizes</option>
          {sizes.map(s => <option key={s}>{s}</option>)}
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
          <option value="">All Status</option>
          {Object.keys(statusStyles).map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase w-12">Image</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">ID</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Name</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Location</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Type</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Size</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Status</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Price</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(h => (
                <tr key={h.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                  <td className="p-3">
                    <img src={h.image} alt={h.name} className="w-10 h-8 rounded-lg object-cover" />
                  </td>
                  <td className="p-3 text-sm font-mono text-foreground/50">#{h.id}</td>
                  <td className="p-3 text-sm font-medium">{h.name}</td>
                  <td className="p-3 text-sm text-foreground/60">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {h.location}
                    </div>
                  </td>
                  <td className="p-3 text-sm text-foreground/60">{h.type}</td>
                  <td className="p-3 text-sm">
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-3.5 h-3.5 text-foreground/30" /> {h.size}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusStyles[h.status]}`}>{h.status}</span>
                  </td>
                  <td className="p-3 text-sm font-semibold">₹{h.price.toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => router.push(`/admin/hoardings/edit?id=${h.id}`)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => router.push(`/admin/hoardings/delete?id=${h.id}`)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-foreground/40 text-sm">No hoardings match your filters.</div>}
      </div>
    </div>
  );
}
