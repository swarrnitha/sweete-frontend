'use client';
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Search, Download, FileText, Building2, IndianRupee, Calendar, CheckCircle, Clock, XCircle } from 'lucide-react';

const invoices = [
  { id: 'INV-001', date: '2026-07-01', company: 'AdShack Media Pvt Ltd', amount: 4999, status: 'Paid', type: 'Subscription', dueDate: '2026-07-15' },
  { id: 'INV-002', date: '2026-07-01', company: 'AdShack Media Pvt Ltd', amount: 75000, status: 'Paid', type: 'Booking', dueDate: '2026-07-15' },
  { id: 'INV-003', date: '2026-07-02', company: 'BrandWave Solutions', amount: 2999, status: 'Paid', type: 'Subscription', dueDate: '2026-07-16' },
  { id: 'INV-004', date: '2026-07-05', company: 'TechAds Agency', amount: 240000, status: 'Unpaid', type: 'Booking', dueDate: '2026-08-04' },
  { id: 'INV-005', date: '2026-07-06', company: 'Outdoor Media Co', amount: 999, status: 'Paid', type: 'Subscription', dueDate: '2026-07-20' },
  { id: 'INV-006', date: '2026-07-07', company: 'Pune Outdoor Solutions', amount: 2999, status: 'Overdue', type: 'Subscription', dueDate: '2026-07-07' },
  { id: 'INV-007', date: '2026-07-08', company: 'Jaipur Media Group', amount: 195000, status: 'Unpaid', type: 'Booking', dueDate: '2026-08-07' },
  { id: 'INV-008', date: '2026-07-10', company: 'VisionAds Inc', amount: 55000, status: 'Paid', type: 'Booking', dueDate: '2026-07-25' },
  { id: 'INV-009', date: '2026-07-12', company: 'DigiSigns Pvt Ltd', amount: 2999, status: 'Overdue', type: 'Subscription', dueDate: '2026-07-12' },
  { id: 'INV-010', date: '2026-07-15', company: 'BrandWave Solutions', amount: 510000, status: 'Paid', type: 'Booking', dueDate: '2026-07-30' },
];

const statusStyles: Record<string, string> = {
  Paid: 'bg-accent/10 text-accent border-accent/20',
  Unpaid: 'bg-amber-50 text-amber-700 border-amber-200',
  Overdue: 'bg-red-50 text-red-700 border-red-200',
};

const statusIcons: Record<string, React.ReactNode> = {
  Paid: <CheckCircle className="w-3.5 h-3.5" />,
  Unpaid: <Clock className="w-3.5 h-3.5" />,
  Overdue: <XCircle className="w-3.5 h-3.5" />,
};

export default function InvoicesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => invoices.filter(inv => {
    if (search && !inv.company.toLowerCase().includes(search.toLowerCase()) && !inv.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && inv.status !== statusFilter) return false;
    return true;
  }), [search, statusFilter]);

  const download = (id: string) => toast.success(`Downloading ${id}.pdf...`);
  const view = (id: string) => toast.success(`Opening ${id}...`);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <p className="text-foreground/50 text-sm">{filtered.length} invoices &middot; {filtered.filter(i => i.status === 'Unpaid' || i.status === 'Overdue').reduce((s, i) => s + i.amount, 0).toLocaleString()} outstanding</p>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input type="text" placeholder="Search by invoice ID or company..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm">
          <option value="">All Status</option>
          <option>Paid</option>
          <option>Unpaid</option>
          <option>Overdue</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Invoice</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Date</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Company</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Amount</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Type</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Due Date</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Status</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Action</th>
          </tr></thead>
          <tbody>
            {filtered.map(inv => (
              <tr key={inv.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                <td className="p-3 text-sm font-mono font-medium">{inv.id}</td>
                <td className="p-3 text-sm text-foreground/60"><div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-foreground/30" />{inv.date}</div></td>
                <td className="p-3 text-sm font-medium"><div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-foreground/30" />{inv.company}</div></td>
                <td className="p-3 text-sm font-semibold">₹{inv.amount.toLocaleString()}</td>
                <td className="p-3"><span className="text-xs font-medium px-2 py-0.5 rounded-full border bg-stone-100 text-stone-600 border-stone-200">{inv.type}</span></td>
                <td className="p-3 text-sm text-foreground/60">{inv.dueDate}</td>
                <td className="p-3"><span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border flex items-center gap-1 w-fit ${statusStyles[inv.status]}`}>{statusIcons[inv.status]} {inv.status}</span></td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => view(inv.id)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600 hover:bg-blue-50 transition-colors"><FileText className="w-4 h-4" /></button>
                    <button onClick={() => download(inv.id)} className="p-1.5 rounded-lg text-foreground/30 hover:text-primary hover:bg-primary/5 transition-colors"><Download className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-foreground/40 text-sm">No invoices found.</div>}
      </div>
    </div>
  );
}
