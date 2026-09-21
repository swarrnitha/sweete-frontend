'use client';
import { useState } from 'react';
import { BarChart3, Eye, IndianRupee, TrendingUp, Calendar, MapPin } from 'lucide-react';

const hoardings = [
  { id: 1, name: 'Marine Drive Premium', location: 'Mumbai', type: 'Billboard', price: 75000, occupancy: 92, views: 185000, revenue: 675000, bookings: 8, status: 'Occupied' },
  { id: 2, name: 'BKC Junction', location: 'Mumbai', type: 'Billboard', price: 85000, occupancy: 85, views: 210000, revenue: 510000, bookings: 6, status: 'Occupied' },
  { id: 3, name: 'Connaught Place Signage', location: 'Delhi', type: 'Digital Screen', price: 60000, occupancy: 70, views: 165000, revenue: 420000, bookings: 5, status: 'Available' },
  { id: 4, name: 'MG Road Billboard', location: 'Bangalore', type: 'Billboard', price: 45000, occupancy: 65, views: 142000, revenue: 360000, bookings: 4, status: 'Available' },
  { id: 5, name: 'Jubilee Hills Display', location: 'Hyderabad', type: 'Digital Screen', price: 55000, occupancy: 78, views: 158000, revenue: 385000, bookings: 5, status: 'Occupied' },
  { id: 6, name: 'Sarjapur Road Hoarding', location: 'Bangalore', type: 'Billboard', price: 40000, occupancy: 55, views: 98000, revenue: 240000, bookings: 3, status: 'Pending' },
  { id: 7, name: 'Anna Nagar Tower', location: 'Chennai', type: 'Pole Display', price: 35000, occupancy: 45, views: 85000, revenue: 175000, bookings: 2, status: 'Maintenance' },
];

export default function HoardingPerformancePage() {
  const [sortBy, setSortBy] = useState<'revenue' | 'views' | 'occupancy' | 'bookings'>('revenue');
  const sorted = [...hoardings].sort((a, b) => b[sortBy] - a[sortBy]);
  const maxRevenue = Math.max(...hoardings.map(h => h.revenue));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hoarding Performance</h1>
        <p className="text-foreground/50 text-sm">Views, revenue, occupancy &amp; booking frequency</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Total Views</p>
          <p className="text-2xl font-bold mt-1">{hoardings.reduce((s, h) => s + h.views, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Total Revenue</p>
          <p className="text-2xl font-bold mt-1">₹{hoardings.reduce((s, h) => s + h.revenue, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Avg Occupancy</p>
          <p className="text-2xl font-bold mt-1">{Math.round(hoardings.reduce((s, h) => s + h.occupancy, 0) / hoardings.length)}%</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Total Bookings</p>
          <p className="text-2xl font-bold mt-1">{hoardings.reduce((s, h) => s + h.bookings, 0)}</p>
        </div>
      </div>

      {/* Sort */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <span className="text-xs text-foreground/40 self-center mr-1">Sort by:</span>
        {([
          { key: 'revenue' as const, label: 'Revenue', icon: IndianRupee },
          { key: 'views' as const, label: 'Views', icon: Eye },
          { key: 'occupancy' as const, label: 'Occupancy', icon: TrendingUp },
          { key: 'bookings' as const, label: 'Bookings', icon: Calendar },
        ]).map(s => (
          <button key={s.key} onClick={() => setSortBy(s.key)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${sortBy === s.key ? 'bg-primary text-white' : 'bg-stone-100 text-foreground/60 hover:bg-stone-200'}`}><s.icon className="w-3.5 h-3.5" />{s.label}</button>
        ))}
      </div>

      {/* Performance Cards */}
      <div className="space-y-3">
        {sorted.map(h => (
          <div key={h.id} className="bg-white rounded-2xl border border-stone-200 p-4">
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0 grid md:grid-cols-5 gap-3">
                <div>
                  <p className="font-semibold text-sm">{h.name}</p>
                  <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5"><MapPin className="w-3 h-3" />{h.location}</div>
                  <p className="text-xs text-foreground/40">{h.type}</p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mt-1"><IndianRupee className="w-3.5 h-3.5" />₹{h.price.toLocaleString()}/mo</div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-foreground/40 uppercase">Views</p>
                  <p className="text-xl font-bold mt-0.5">{h.views.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-foreground/40 uppercase">Revenue</p>
                  <p className="text-xl font-bold mt-0.5 text-primary">₹{h.revenue.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-foreground/40 uppercase">Occupancy</p>
                  <p className={`text-xl font-bold mt-0.5 ${h.occupancy >= 70 ? 'text-accent' : 'text-amber-600'}`}>{h.occupancy}%</p>
                  <div className="w-full h-1.5 bg-stone-100 rounded-full mt-1">
                    <div className={`h-full rounded-full ${h.occupancy >= 70 ? 'bg-accent' : 'bg-amber-400'}`} style={{ width: `${h.occupancy}%` }} />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-xs text-foreground/40 uppercase">Bookings</p>
                  <p className="text-xl font-bold mt-0.5">{h.bookings}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border mt-1 inline-block ${
                    h.status === 'Occupied' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    h.status === 'Available' ? 'bg-accent/10 text-accent border-accent/20' :
                    h.status === 'Maintenance' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-purple-50 text-purple-700 border-purple-200'
                  }`}>{h.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
