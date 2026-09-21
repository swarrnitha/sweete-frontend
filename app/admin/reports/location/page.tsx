'use client';
import { useState } from 'react';
import { MapPin, IndianRupee, TrendingUp, Building2, BarChart3 } from 'lucide-react';

const cityData = [
  { city: 'Mumbai', hoardings: 50, occupied: 38, revenue: 1895000, avgPrice: 41250, topArea: 'Marine Drive', growth: '+12.4%' },
  { city: 'Delhi', hoardings: 30, occupied: 21, revenue: 985000, avgPrice: 38500, topArea: 'Connaught Place', growth: '+8.7%' },
  { city: 'Bangalore', hoardings: 35, occupied: 24, revenue: 1085000, avgPrice: 32500, topArea: 'MG Road', growth: '+15.2%' },
  { city: 'Hyderabad', hoardings: 20, occupied: 14, revenue: 685000, avgPrice: 29800, topArea: 'Jubilee Hills', growth: '+10.8%' },
  { city: 'Chennai', hoardings: 18, occupied: 11, revenue: 425000, avgPrice: 27500, topArea: 'Anna Nagar', growth: '+5.3%' },
  { city: 'Pune', hoardings: 15, occupied: 10, revenue: 412000, avgPrice: 31200, topArea: 'FC Road', growth: '+9.1%' },
  { city: 'Kolkata', hoardings: 12, occupied: 7, revenue: 285000, avgPrice: 24500, topArea: 'Park Street', growth: '+3.8%' },
  { city: 'Jaipur', hoardings: 10, occupied: 5, revenue: 198000, avgPrice: 22000, topArea: 'C Scheme', growth: '+6.2%' },
];

export default function LocationReportPage() {
  const [metric, setMetric] = useState<'revenue' | 'occupancy' | 'avgPrice'>('revenue');
  const sorted = [...cityData].sort((a, b) => {
    const aVal = metric === 'occupancy' ? a.occupied : a[metric];
    const bVal = metric === 'occupancy' ? b.occupied : b[metric];
    return bVal - aVal;
  });
  const maxRevenue = Math.max(...cityData.map(c => c.revenue));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Location Report</h1>
        <p className="text-foreground/50 text-sm">City-wise hoarding performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Total Cities</p>
          <p className="text-2xl font-bold mt-1">{cityData.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Total Hoardings</p>
          <p className="text-2xl font-bold mt-1">{cityData.reduce((s, c) => s + c.hoardings, 0)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Total Revenue</p>
          <p className="text-2xl font-bold mt-1">₹{cityData.reduce((s, c) => s + c.revenue, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Avg Occupancy</p>
          <p className="text-2xl font-bold mt-1">{Math.round(cityData.reduce((s, c) => s + c.occupied, 0) / cityData.reduce((s, c) => s + c.hoardings, 0) * 100)}%</p>
        </div>
      </div>

      {/* Metric Toggle */}
      <div className="flex gap-2 mb-4">
        <span className="text-xs text-foreground/40 self-center mr-1">View:</span>
        {[
          { key: 'revenue' as const, label: 'Revenue' },
          { key: 'occupancy' as const, label: 'Occupancy Rate' },
          { key: 'avgPrice' as const, label: 'Avg Price' },
        ].map(s => (
          <button key={s.key} onClick={() => setMetric(s.key)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${metric === s.key ? 'bg-primary text-white' : 'bg-stone-100 text-foreground/60 hover:bg-stone-200'}`}>{s.label}</button>
        ))}
      </div>

      {/* City Performance Bars */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">City Performance</h2>
        </div>
        <div className="space-y-3">
          {sorted.map(c => {
            const val = metric === 'occupancy' ? c.occupied : (c as any)[metric];
            const maxVal = metric === 'revenue' ? maxRevenue : metric === 'occupancy' ? Math.max(...cityData.map(x => x.occupied)) : Math.max(...cityData.map(x => x.avgPrice));
            const pct = (val / maxVal) * 100;
            return (
              <div key={c.city}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-foreground/30" />
                    <span className="font-medium">{c.city}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-foreground/40">
                    {metric === 'revenue' && <span className="font-semibold text-foreground/70">₹{c.revenue.toLocaleString()}</span>}
                    {metric === 'occupancy' && <span className="font-semibold text-foreground/70">{c.occupied}/{c.hoardings}</span>}
                    {metric === 'avgPrice' && <span className="font-semibold text-foreground/70">₹{c.avgPrice.toLocaleString()}</span>}
                    <span className="text-accent">{c.growth}</span>
                  </div>
                </div>
                <div className="h-6 bg-stone-50 rounded-lg overflow-hidden">
                  <div className="bg-primary transition-all rounded-lg h-full" style={{ width: `${pct}%` }} />
                </div>
                <div className="text-[10px] text-foreground/40 mt-0.5">Top area: {c.topArea}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">City</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Hoardings</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Occupied</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Occupancy %</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Revenue</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Avg Price</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Growth</th>
          </tr></thead>
          <tbody>
            {sorted.map(c => (
              <tr key={c.city} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="p-3 text-sm font-medium"><div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-foreground/30" />{c.city}</div></td>
                <td className="p-3 text-sm">{c.hoardings}</td>
                <td className="p-3 text-sm text-accent font-medium">{c.occupied}</td>
                <td className="p-3 text-sm">{Math.round(c.occupied / c.hoardings * 100)}%</td>
                <td className="p-3 text-sm font-semibold">₹{c.revenue.toLocaleString()}</td>
                <td className="p-3 text-sm">₹{c.avgPrice.toLocaleString()}</td>
                <td className="p-3 text-sm text-accent font-medium">{c.growth}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
