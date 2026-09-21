'use client';
import { useState } from 'react';
import { IndianRupee, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const monthlyData = [
  { month: 'Jan', subscriptions: 185000, bookings: 420000, expenses: 85000 },
  { month: 'Feb', subscriptions: 192000, bookings: 385000, expenses: 82000 },
  { month: 'Mar', subscriptions: 210000, bookings: 510000, expenses: 90000 },
  { month: 'Apr', subscriptions: 225000, bookings: 480000, expenses: 88000 },
  { month: 'May', subscriptions: 240000, bookings: 550000, expenses: 95000 },
  { month: 'Jun', subscriptions: 255000, bookings: 620000, expenses: 92000 },
  { month: 'Jul', subscriptions: 262000, bookings: 675000, expenses: 98000 },
];

const currentMonth = monthlyData[monthlyData.length - 1];
const prevMonth = monthlyData[monthlyData.length - 2];

export default function RevenuePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Revenue</h1>
        <p className="text-foreground/50 text-sm">Monthly revenue report</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Total Revenue</p>
          <p className="text-2xl font-bold">₹{(currentMonth.subscriptions + currentMonth.bookings).toLocaleString()}</p>
          <div className="flex items-center gap-1 text-xs text-accent mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +8.2% from last month
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Subscriptions</p>
          <p className="text-2xl font-bold">₹{currentMonth.subscriptions.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-xs text-accent mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +2.7% from last month
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Bookings</p>
          <p className="text-2xl font-bold">₹{currentMonth.bookings.toLocaleString()}</p>
          <div className="flex items-center gap-1 text-xs text-accent mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +8.9% from last month
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Net Profit</p>
          <p className="text-2xl font-bold">₹{(currentMonth.subscriptions + currentMonth.bookings - currentMonth.expenses).toLocaleString()}</p>
          <div className="flex items-center gap-1 text-xs text-accent mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +9.1% from last month
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h2 className="font-semibold">Monthly Revenue Breakdown</h2>
        </div>

        <div className="space-y-3">
          {monthlyData.map(m => {
            const maxVal = 1000000;
            const subBar = (m.subscriptions / maxVal) * 100;
            const bookBar = (m.bookings / maxVal) * 100;
            const expBar = (m.expenses / maxVal) * 100;
            return (
              <div key={m.month}>
                <div className="flex items-center justify-between text-xs text-foreground/50 mb-1">
                  <span className="font-medium text-foreground/70 w-10">{m.month}</span>
                  <span>₹{(m.subscriptions + m.bookings).toLocaleString()}</span>
                </div>
                <div className="flex gap-0.5 h-6 rounded-lg overflow-hidden bg-stone-50">
                  <div className="bg-primary rounded-l-lg transition-all" style={{ width: `${subBar}%` }} title={`Subscriptions: ₹${m.subscriptions.toLocaleString()}`} />
                  <div className="bg-accent transition-all" style={{ width: `${bookBar}%` }} title={`Bookings: ₹${m.bookings.toLocaleString()}`} />
                  <div className="bg-amber-400 rounded-r-lg transition-all" style={{ width: `${expBar}%` }} title={`Expenses: ₹${m.expenses.toLocaleString()}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-5 text-xs text-foreground/50">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-primary" /> Subscriptions</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-accent" /> Bookings</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-amber-400" /> Expenses</div>
        </div>
      </div>

      {/* Monthly Table */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden mt-4">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Month</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Subscriptions</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Bookings</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Expenses</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Net Profit</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Growth</th>
          </tr></thead>
          <tbody>
            {monthlyData.map((m, i) => {
              const net = m.subscriptions + m.bookings - m.expenses;
              const prevNet = i > 0 ? monthlyData[i-1].subscriptions + monthlyData[i-1].bookings - monthlyData[i-1].expenses : net;
              const growth = prevNet > 0 ? ((net - prevNet) / prevNet * 100).toFixed(1) : '0';
              return (
                <tr key={m.month} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                  <td className="p-3 text-sm font-medium">{m.month}</td>
                  <td className="p-3 text-sm">₹{m.subscriptions.toLocaleString()}</td>
                  <td className="p-3 text-sm">₹{m.bookings.toLocaleString()}</td>
                  <td className="p-3 text-sm">₹{m.expenses.toLocaleString()}</td>
                  <td className="p-3 text-sm font-semibold">₹{net.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`text-xs font-medium flex items-center gap-1 ${parseFloat(growth) >= 0 ? 'text-accent' : 'text-red-600'}`}>
                      {parseFloat(growth) >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      {growth}%
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
