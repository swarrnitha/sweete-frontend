'use client';
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Search, Download, IndianRupee, Building2, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const allTransactions = [
  { id: 'TXN-001', date: '2026-07-01', company: 'AdShack Media Pvt Ltd', invoice: 'INV-001', amount: 4999, method: 'Net Banking', status: 'Success', type: 'Subscription' },
  { id: 'TXN-002', date: '2026-07-02', company: 'BrandWave Solutions', invoice: 'INV-006', amount: 2999, method: 'UPI', status: 'Success', type: 'Subscription' },
  { id: 'TXN-003', date: '2026-07-03', company: 'VisionAds Inc', invoice: 'INV-010', amount: 4999, method: 'Credit Card', status: 'Success', type: 'Subscription' },
  { id: 'TXN-004', date: '2026-07-05', company: 'TechAds Agency', invoice: 'INV-012', amount: 240000, method: 'Net Banking', status: 'Pending', type: 'Booking' },
  { id: 'TXN-005', date: '2026-07-06', company: 'Outdoor Media Co', invoice: 'INV-015', amount: 999, method: 'UPI', status: 'Success', type: 'Subscription' },
  { id: 'TXN-006', date: '2026-07-07', company: 'Pune Outdoor Solutions', invoice: 'INV-018', amount: 2999, method: 'Net Banking', status: 'Failed', type: 'Subscription' },
  { id: 'TXN-007', date: '2026-07-08', company: 'Jaipur Media Group', invoice: 'INV-020', amount: 195000, method: 'Credit Card', status: 'Pending', type: 'Booking' },
  { id: 'TXN-008', date: '2026-07-10', company: 'AdShack Media Pvt Ltd', invoice: 'INV-002', amount: 4999, method: 'UPI', status: 'Success', type: 'Subscription' },
  { id: 'TXN-009', date: '2026-07-12', company: 'DigiSigns Pvt Ltd', invoice: 'INV-022', amount: 2999, method: 'Net Banking', status: 'Failed', type: 'Subscription' },
  { id: 'TXN-010', date: '2026-07-15', company: 'BrandWave Solutions', invoice: 'INV-007', amount: 510000, method: 'Net Banking', status: 'Success', type: 'Booking' },
];

const statusStyles: Record<string, string> = {
  Success: 'bg-accent/10 text-accent border-accent/20',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Failed: 'bg-red-50 text-red-700 border-red-200',
};

const statusIcons: Record<string, React.ReactNode> = {
  Success: <CheckCircle className="w-3.5 h-3.5" />,
  Pending: <Clock className="w-3.5 h-3.5" />,
  Failed: <XCircle className="w-3.5 h-3.5" />,
};

export default function TransactionsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filtered = useMemo(() => allTransactions.filter(t => {
    if (search && !t.company.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase()) && !t.invoice.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && t.status !== statusFilter) return false;
    if (typeFilter && t.type !== typeFilter) return false;
    return true;
  }), [search, statusFilter, typeFilter]);

  const totalAmount = filtered.reduce((s, t) => s + t.amount, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-foreground/50 text-sm">{filtered.length} transactions &middot; Total: ₹{totalAmount.toLocaleString()}</p>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input type="text" placeholder="Search by ID, company, invoice..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm">
          <option value="">All Status</option>
          <option>Success</option>
          <option>Pending</option>
          <option>Failed</option>
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm">
          <option value="">All Types</option>
          <option>Subscription</option>
          <option>Booking</option>
        </select>
        <button onClick={() => toast.success('Exporting transactions...')} className="px-4 py-2.5 border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors flex items-center gap-1.5"><Download className="w-4 h-4" /> Export</button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">TXN ID</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Date</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Company</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Invoice</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Amount</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Method</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Type</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Status</th>
          </tr></thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                <td className="p-3 text-sm font-mono text-foreground/50">{t.id}</td>
                <td className="p-3 text-sm text-foreground/60"><div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-foreground/30" />{t.date}</div></td>
                <td className="p-3 text-sm font-medium"><div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-foreground/30" />{t.company}</div></td>
                <td className="p-3 text-sm font-mono text-foreground/50">{t.invoice}</td>
                <td className="p-3 text-sm font-semibold">₹{t.amount.toLocaleString()}</td>
                <td className="p-3 text-sm text-foreground/60">{t.method}</td>
                <td className="p-3"><span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-stone-100 text-stone-600 border-stone-200">{t.type}</span></td>
                <td className="p-3"><span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border flex items-center gap-1 w-fit ${statusStyles[t.status]}`}>{statusIcons[t.status]} {t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-foreground/40 text-sm">No transactions match your filters.</div>}
      </div>
    </div>
  );
}
