'use client';
import { useState } from 'react';
import { Building2, IndianRupee, TrendingUp, Calendar, MapPin } from 'lucide-react';

const advertisers = [
  { rank: 1, name: 'AdShack Media Pvt Ltd', contact: 'Rahul Sharma', city: 'Mumbai', totalSpent: 1425000, avgMonthly: 118750, bookings: 12, hoardings: 8, activeSince: '2025-11-01', plan: 'Premium' },
  { rank: 2, name: 'BrandWave Solutions', contact: 'Priya Patel', city: 'Delhi', totalSpent: 989000, avgMonthly: 82417, bookings: 8, hoardings: 6, activeSince: '2026-01-15', plan: 'Professional' },
  { rank: 3, name: 'VisionAds Inc', contact: 'Amit Verma', city: 'Bangalore', totalSpent: 875000, avgMonthly: 72917, bookings: 10, hoardings: 5, activeSince: '2025-09-20', plan: 'Premium' },
  { rank: 4, name: 'Pune Outdoor Solutions', contact: 'Raj Deshmukh', city: 'Pune', totalSpent: 512000, avgMonthly: 42667, bookings: 5, hoardings: 4, activeSince: '2026-02-20', plan: 'Professional' },
  { rank: 5, name: 'Outdoor Media Co', contact: 'Neha Gupta', city: 'Chennai', totalSpent: 298000, avgMonthly: 24833, bookings: 4, hoardings: 3, activeSince: '2026-04-10', plan: 'Basic' },
];

export default function AdvertiserReportPage() {
  const [sortBy, setSortBy] = useState<'totalSpent' | 'bookings' | 'avgMonthly'>('totalSpent');
  const sorted = [...advertisers].sort((a, b) => b[sortBy] - a[sortBy]);
  const totalRevenue = advertisers.reduce((s, a) => s + a.totalSpent, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Advertiser Report</h1>
        <p className="text-foreground/50 text-sm">Top advertisers &amp; spending summary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Total Revenue</p>
          <p className="text-2xl font-bold mt-1">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Active Advertisers</p>
          <p className="text-2xl font-bold mt-1">{advertisers.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Top Advertiser</p>
          <p className="text-lg font-bold mt-1 truncate">{advertisers[0].name}</p>
          <span className="text-xs text-accent font-medium">₹{advertisers[0].totalSpent.toLocaleString()}</span>
        </div>
      </div>

      {/* Sort */}
      <div className="flex gap-2 mb-4">
        <span className="text-xs text-foreground/40 self-center mr-1">Sort by:</span>
        {[
          { key: 'totalSpent' as const, label: 'Total Spend' },
          { key: 'bookings' as const, label: 'Bookings' },
          { key: 'avgMonthly' as const, label: 'Avg Monthly' },
        ].map(s => (
          <button key={s.key} onClick={() => setSortBy(s.key)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${sortBy === s.key ? 'bg-primary text-white' : 'bg-stone-100 text-foreground/60 hover:bg-stone-200'}`}>{s.label}</button>
        ))}
      </div>

      {/* Rankings */}
      <div className="space-y-3">
        {sorted.map(a => (
          <div key={a.rank} className="bg-white rounded-2xl border border-stone-200 p-4">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${a.rank === 1 ? 'bg-amber-100 text-amber-700' : a.rank === 2 ? 'bg-stone-100 text-stone-600' : a.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-stone-50 text-foreground/40'}`}>#{a.rank}</div>
              <div className="flex-1 min-w-0 grid md:grid-cols-4 gap-3">
                <div>
                  <p className="font-semibold text-sm">{a.name}</p>
                  <p className="text-xs text-foreground/60">{a.contact}</p>
                  <div className="flex items-center gap-1.5 text-xs text-foreground/40 mt-0.5"><MapPin className="w-3 h-3" />{a.city}</div>
                </div>
                <div>
                  <p className="text-xs text-foreground/40 uppercase">Revenue</p>
                  <p className="text-lg font-bold text-primary mt-0.5">₹{a.totalSpent.toLocaleString()}</p>
                  <p className="text-xs text-foreground/40">₹{a.avgMonthly.toLocaleString()}/mo avg</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/40 uppercase">Activity</p>
                  <p className="text-sm font-semibold mt-0.5">{a.bookings} bookings</p>
                  <p className="text-xs text-foreground/40">{a.hoardings} hoardings</p>
                  <div className="flex items-center gap-1.5 text-xs text-foreground/40 mt-0.5"><Calendar className="w-3 h-3" />{a.activeSince}</div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border bg-purple-50 text-purple-700 border-purple-200">{a.plan}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
