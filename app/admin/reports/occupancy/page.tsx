'use client';
import { BarChart3, TrendingUp, TrendingDown, MapPin } from 'lucide-react';

const occupancyByCity = [
  { city: 'Mumbai', total: 50, occupied: 38, maintenance: 4, available: 8, rate: 76 },
  { city: 'Delhi', total: 30, occupied: 21, maintenance: 2, available: 7, rate: 70 },
  { city: 'Bangalore', total: 35, occupied: 24, maintenance: 3, available: 8, rate: 69 },
  { city: 'Hyderabad', total: 20, occupied: 14, maintenance: 1, available: 5, rate: 70 },
  { city: 'Chennai', total: 18, occupied: 11, maintenance: 2, available: 5, rate: 61 },
  { city: 'Pune', total: 15, occupied: 10, maintenance: 1, available: 4, rate: 67 },
  { city: 'Kolkata', total: 12, occupied: 7, maintenance: 1, available: 4, rate: 58 },
  { city: 'Jaipur', total: 10, occupied: 5, maintenance: 1, available: 4, rate: 50 },
];

const monthlyOccupancy = [
  { month: 'Jan', rate: 62 }, { month: 'Feb', rate: 64 }, { month: 'Mar', rate: 65 },
  { month: 'Apr', rate: 68 }, { month: 'May', rate: 70 }, { month: 'Jun', rate: 72 },
  { month: 'Jul', rate: 74 },
];

const getHeatColor = (rate: number) => {
  if (rate >= 75) return 'bg-accent';
  if (rate >= 65) return 'bg-accent';
  if (rate >= 55) return 'bg-amber-400';
  return 'bg-red-400';
};

export default function OccupancyReportPage() {
  const overall = Math.round(occupancyByCity.reduce((s, c) => s + c.occupied, 0) / occupancyByCity.reduce((s, c) => s + c.total, 0) * 100);
  const maxOccupied = Math.max(...occupancyByCity.map(c => c.occupied));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Occupancy Report</h1>
        <p className="text-foreground/50 text-sm">Hoarding occupancy trends &amp; city-wise heatmap</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Overall Occupancy</p>
          <p className="text-2xl font-bold mt-1">{overall}%</p>
          <span className="text-xs text-accent font-medium flex items-center gap-1 mt-0.5"><TrendingUp className="w-3 h-3" /> +4% from last quarter</span>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Total Hoardings</p>
          <p className="text-2xl font-bold mt-1">{occupancyByCity.reduce((s, c) => s + c.total, 0)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Occupied</p>
          <p className="text-2xl font-bold mt-1 text-accent">{occupancyByCity.reduce((s, c) => s + c.occupied, 0)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Available</p>
          <p className="text-2xl font-bold mt-1">{occupancyByCity.reduce((s, c) => s + c.available, 0)}</p>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Monthly Occupancy Trend</h2>
        </div>
        <div className="flex items-end gap-2 h-32">
          {monthlyOccupancy.map(m => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] text-foreground/40 font-medium">{m.rate}%</span>
              <div className="w-full bg-stone-100 rounded-t-lg relative" style={{ height: '100px' }}>
                <div className={`absolute bottom-0 w-full rounded-t-lg transition-all ${getHeatColor(m.rate)}`} style={{ height: `${m.rate}%` }} />
              </div>
              <span className="text-[10px] text-foreground/40">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* City Heatmap */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">City-wise Occupancy Heatmap</h2>
        </div>
        <div className="space-y-3">
          {occupancyByCity.sort((a, b) => b.rate - a.rate).map(c => (
            <div key={c.city}>
              <div className="flex items-center justify-between text-sm mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded ${getHeatColor(c.rate)}`} />
                  <span className="font-medium">{c.city}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-foreground/40">
                  <span>{c.occupied}/{c.total} occupied</span>
                  <span className={`font-semibold ${c.rate >= 70 ? 'text-accent' : 'text-amber-600'}`}>{c.rate}%</span>
                </div>
              </div>
              <div className="h-6 bg-stone-50 rounded-lg overflow-hidden flex">
                <div className="bg-accent transition-all" style={{ width: `${(c.occupied / maxOccupied) * 100}%` }} />
                <div className="bg-amber-400 transition-all" style={{ width: `${(c.maintenance / maxOccupied) * 100}%` }} />
                <div className="flex-1 bg-stone-200" />
              </div>
              <div className="flex gap-3 text-[10px] text-foreground/40 mt-0.5">
                <span>Occupied: {c.occupied}</span>
                <span>Maintenance: {c.maintenance}</span>
                <span>Available: {c.available}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-foreground/50">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-accent" /> Occupied</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-amber-400" /> Maintenance</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-stone-200" /> Available</div>
        </div>
      </div>
    </div>
  );
}
