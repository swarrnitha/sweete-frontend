'use client';
import toast from 'react-hot-toast';
import { Download, TrendingUp, IndianRupee, BarChart3 } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', revenue: 605000, subscriptions: 185000, bookings: 420000 },
  { month: 'Feb', revenue: 577000, subscriptions: 192000, bookings: 385000 },
  { month: 'Mar', revenue: 720000, subscriptions: 210000, bookings: 510000 },
  { month: 'Apr', revenue: 705000, subscriptions: 225000, bookings: 480000 },
  { month: 'May', revenue: 790000, subscriptions: 240000, bookings: 550000 },
  { month: 'Jun', revenue: 875000, subscriptions: 255000, bookings: 620000 },
  { month: 'Jul', revenue: 937000, subscriptions: 262000, bookings: 675000 },
];

export default function RevenueReportPage() {
  const maxRevenue = Math.max(...monthlyData.map(m => m.revenue));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Revenue Report</h1>
          <p className="text-foreground/50 text-sm">Monthly revenue analysis</p>
        </div>
        <button onClick={() => toast.success('Exporting revenue report...')} className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Download className="w-4 h-4" /> Export</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Total Revenue (YTD)</p>
          <p className="text-2xl font-bold mt-1">₹52,09,000</p>
          <span className="text-xs text-accent font-medium flex items-center gap-1 mt-0.5"><TrendingUp className="w-3 h-3" /> +18.2% YoY</span>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Avg Monthly</p>
          <p className="text-2xl font-bold mt-1">₹7,44,143</p>
          <span className="text-xs text-foreground/40">Over 7 months</span>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Best Month</p>
          <p className="text-2xl font-bold mt-1">₹9,37,000</p>
          <span className="text-xs text-foreground/40">July 2026</span>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase">Growth Rate</p>
          <p className="text-2xl font-bold mt-1 text-accent">+54.9%</p>
          <span className="text-xs text-foreground/40">Jan → Jul 2026</span>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-4">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Monthly Revenue Trend</h2>
        </div>
        <div className="space-y-2">
          {monthlyData.map(m => {
            const pct = (m.revenue / maxRevenue) * 100;
            return (
              <div key={m.month}>
                <div className="flex items-center justify-between text-xs text-foreground/50 mb-1">
                  <span className="font-medium w-10">{m.month}</span>
                  <span className="text-foreground/70">₹{m.revenue.toLocaleString()}</span>
                </div>
                <div className="h-7 bg-stone-50 rounded-lg overflow-hidden flex">
                  <div className="bg-primary transition-all rounded-l-lg" style={{ width: `${pct}%` }} />
                  <div className="flex-1" />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-foreground/50">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-primary" /> Revenue</div>
        </div>
      </div>

      {/* Breakdown Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Month</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Subscriptions</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Bookings</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Total Revenue</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">MoM Growth</th>
          </tr></thead>
          <tbody>
            {monthlyData.map((m, i) => {
              const prev = i > 0 ? monthlyData[i - 1].revenue : m.revenue;
              const growth = ((m.revenue - prev) / prev * 100).toFixed(1);
              return (
                <tr key={m.month} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="p-3 text-sm font-medium">{m.month}</td>
                  <td className="p-3 text-sm">₹{m.subscriptions.toLocaleString()}</td>
                  <td className="p-3 text-sm">₹{m.bookings.toLocaleString()}</td>
                  <td className="p-3 text-sm font-semibold">₹{m.revenue.toLocaleString()}</td>
                  <td className="p-3 text-sm">
                    <span className={`font-medium ${parseFloat(growth) >= 0 ? 'text-accent' : 'text-red-600'}`}>
                      {parseFloat(growth) >= 0 ? '+' : ''}{growth}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
