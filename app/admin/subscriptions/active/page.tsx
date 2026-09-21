'use client';
import { useState, useMemo } from 'react';
import { Search, Building2, Calendar, IndianRupee } from 'lucide-react';

const activeSubs = [
  { id: 1, company: 'AdShack Media Pvt Ltd', contact: 'Rahul Sharma', plan: 'Premium', price: 4999, startDate: '2025-11-01', endDate: '2027-10-31', paymentMethod: 'Net Banking', status: 'Active' },
  { id: 2, company: 'BrandWave Solutions', contact: 'Priya Patel', plan: 'Professional', price: 2999, startDate: '2026-01-15', endDate: '2027-01-14', paymentMethod: 'UPI', status: 'Active' },
  { id: 3, company: 'VisionAds Inc', contact: 'Amit Verma', plan: 'Premium', price: 4999, startDate: '2025-09-20', endDate: '2027-09-19', paymentMethod: 'Credit Card', status: 'Active' },
  { id: 7, company: 'Outdoor Media Co', contact: 'Neha Gupta', plan: 'Basic', price: 999, startDate: '2026-04-10', endDate: '2027-04-09', paymentMethod: 'UPI', status: 'Active' },
  { id: 8, company: 'Pune Outdoor Solutions', contact: 'Raj Deshmukh', plan: 'Professional', price: 2999, startDate: '2026-02-20', endDate: '2027-02-19', paymentMethod: 'Net Banking', status: 'Active' },
];

const planStyles: Record<string, string> = {
  Premium: 'bg-purple-50 text-purple-700 border-purple-200',
  Professional: 'bg-blue-50 text-blue-700 border-blue-200',
  Starter: 'bg-stone-100 text-stone-600 border-stone-200',
  Basic: 'bg-green-50 text-green-700 border-green-200',
};

export default function ActiveSubsPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => activeSubs.filter(s =>
    !search || s.company.toLowerCase().includes(search.toLowerCase()) || s.contact.toLowerCase().includes(search.toLowerCase())
  ), [search]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Active Subscriptions</h1>
        <p className="text-foreground/50 text-sm">{filtered.length} active subscriptions</p>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input type="text" placeholder="Search by company or contact..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Company</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Contact</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Plan</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Price</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Period</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Payment</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Status</th>
          </tr></thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                <td className="p-3 text-sm font-medium"><div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-foreground/30" />{s.company}</div></td>
                <td className="p-3 text-sm text-foreground/60">{s.contact}</td>
                <td className="p-3"><span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${planStyles[s.plan]}`}>{s.plan}</span></td>
                <td className="p-3 text-sm font-semibold">₹{s.price.toLocaleString()}/mo</td>
                <td className="p-3 text-sm text-foreground/60"><div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-foreground/30" />{s.startDate} – {s.endDate}</div></td>
                <td className="p-3 text-sm text-foreground/60">{s.paymentMethod}</td>
                <td className="p-3"><span className="text-xs font-medium px-2.5 py-0.5 rounded-full border bg-accent/10 text-accent border-accent/20">Active</span></td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
