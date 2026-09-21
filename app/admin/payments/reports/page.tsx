'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Download, BarChart3, IndianRupee, Building2, Percent, FileText, TrendingUp, TrendingDown } from 'lucide-react';

export default function ReportsPage() {
  const [period, setPeriod] = useState('2026-Q2');

  const exportReport = (format: string) => {
    toast.success(`Exporting report as ${format.toUpperCase()}...`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Payment Reports</h1>
        <p className="text-foreground/50 text-sm">Tax summary and financial reports</p>
      </div>

      {/* Period Selector */}
      <div className="flex items-center gap-3 mb-6">
        <select value={period} onChange={e => setPeriod(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm">
          <option>2026-Q2</option>
          <option>2026-Q1</option>
          <option>2025-Q4</option>
          <option>2025-Q3</option>
        </select>
        <button onClick={() => exportReport('pdf')} className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Download className="w-4 h-4" /> Export PDF</button>
        <button onClick={() => exportReport('csv')} className="px-4 py-2.5 border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors flex items-center gap-1.5"><Download className="w-4 h-4" /> Export CSV</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide">Gross Revenue</p>
          <p className="text-2xl font-bold mt-1">₹24,56,000</p>
          <span className="text-xs text-accent font-medium">+12.3% from last quarter</span>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide">Tax Collected (GST)</p>
          <p className="text-2xl font-bold mt-1">₹3,68,400</p>
          <span className="text-xs text-amber-600 font-medium">18% GST on all bookings</span>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide">Net Revenue</p>
          <p className="text-2xl font-bold mt-1">₹20,87,600</p>
          <span className="text-xs text-accent font-medium">After tax deductions</span>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide">Avg Transaction</p>
          <p className="text-2xl font-bold mt-1">₹42,345</p>
          <span className="text-xs text-foreground/40">Across 58 transactions</span>
        </div>
      </div>

      {/* Tax Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Percent className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Tax Summary</h2>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm"><span className="text-foreground/60">GST (18%) — Bookings</span><span className="font-semibold">₹3,12,000</span></div>
            <div className="flex justify-between text-sm"><span className="text-foreground/60">GST (18%) — Subscriptions</span><span className="font-semibold">₹56,400</span></div>
            <div className="flex justify-between text-sm"><span className="text-foreground/60">TDS Deducted</span><span className="font-semibold">₹24,560</span></div>
            <div className="flex justify-between text-sm border-t border-stone-200 pt-2"><span className="font-medium">Total Tax Liability</span><span className="font-bold text-primary">₹3,92,960</span></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Top Advertisers (by revenue)</h2>
          </div>
          <div className="space-y-3">
            {[
              { name: 'AdShack Media Pvt Ltd', revenue: 425000, share: '17.3%' },
              { name: 'BrandWave Solutions', revenue: 389000, share: '15.8%' },
              { name: 'VisionAds Inc', revenue: 312000, share: '12.7%' },
              { name: 'Pune Outdoor Solutions', revenue: 198000, share: '8.1%' },
              { name: 'Outdoor Media Co', revenue: 145000, share: '5.9%' },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">{i + 1}</span>
                  <span>{a.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold">₹{a.revenue.toLocaleString()}</span>
                  <span className="text-xs text-foreground/40 ml-2">{a.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Period Comparison */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Quarter-over-Quarter Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead><tr className="border-b border-stone-200">
              <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Metric</th>
              <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Q1 2026</th>
              <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Q2 2026</th>
              <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Change</th>
            </tr></thead>
            <tbody>
              {[
                { metric: 'Gross Revenue', q1: '₹21,80,000', q2: '₹24,56,000', change: '+12.3%', dir: 'up' },
                { metric: 'New Subscriptions', q1: '24', q2: '31', change: '+29.2%', dir: 'up' },
                { metric: 'Total Bookings', q1: '42', q2: '58', change: '+38.1%', dir: 'up' },
                { metric: 'Avg Revenue / Booking', q1: '₹51,905', q2: '₹42,345', change: '-18.4%', dir: 'down' },
                { metric: 'Tax Collected', q1: '₹3,27,000', q2: '₹3,68,400', change: '+12.7%', dir: 'up' },
                { metric: 'Refund Rate', q1: '4.2%', q2: '3.1%', change: '-26.2%', dir: 'up' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-stone-100">
                  <td className="p-3 text-sm font-medium">{row.metric}</td>
                  <td className="p-3 text-sm">{row.q1}</td>
                  <td className="p-3 text-sm">{row.q2}</td>
                  <td className="p-3 text-sm">
                    <span className={`flex items-center gap-1 font-medium ${row.dir === 'up' ? 'text-accent' : 'text-red-600'}`}>
                      {row.dir === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {row.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
