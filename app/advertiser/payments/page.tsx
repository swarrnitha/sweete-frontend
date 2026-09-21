'use client';
import { useState } from 'react';
import { IndianRupee, Download, FileText, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Invoice {
  id: string;
  hoarding: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  items: { label: string; amount: number }[];
}

const invoices: Invoice[] = [
  { id: 'INV-001', hoarding: 'Marine Drive Banner', amount: 45000, date: '2026-06-01', dueDate: '2026-07-01', status: 'paid', items: [{ label: 'Monthly Rental (Jun)', amount: 35000 }, { label: 'GST @18%', amount: 6300 }, { label: 'Maintenance Fee', amount: 3700 }] },
  { id: 'INV-002', hoarding: 'Andheri East Billboard', amount: 38000, date: '2026-06-15', dueDate: '2026-07-15', status: 'paid', items: [{ label: 'Monthly Rental (Jun)', amount: 30000 }, { label: 'GST @18%', amount: 5400 }, { label: 'Maintenance Fee', amount: 2600 }] },
  { id: 'INV-003', hoarding: 'Bandra West Hoarding', amount: 55000, date: '2026-07-01', dueDate: '2026-08-01', status: 'pending', items: [{ label: 'Monthly Rental (Jul)', amount: 42000 }, { label: 'GST @18%', amount: 7560 }, { label: 'Maintenance Fee', amount: 5440 }] },
  { id: 'INV-004', hoarding: 'MG Road Display', amount: 22000, date: '2026-06-20', dueDate: '2026-07-20', status: 'overdue', items: [{ label: 'Monthly Rental (Jun)', amount: 18000 }, { label: 'GST @18%', amount: 3240 }, { label: 'Late Fee', amount: 760 }] },
  { id: 'INV-005', hoarding: 'Connaught Place Signage', amount: 62000, date: '2026-07-10', dueDate: '2026-08-10', status: 'pending', items: [{ label: 'Monthly Rental (Jul)', amount: 48000 }, { label: 'GST @18%', amount: 8640 }, { label: 'Maintenance Fee', amount: 5360 }] },
];

const statusIcon: Record<string, React.ReactNode> = {
  paid: <CheckCircle className="w-4 h-4 text-accent" />,
  pending: <Clock className="w-4 h-4 text-amber-500" />,
  overdue: <XCircle className="w-4 h-4 text-red-500" />,
};

const statusClass: Record<string, string> = {
  paid: 'bg-accent/10 text-accent border-accent/20',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  overdue: 'bg-red-50 text-red-700 border-red-200',
};

function total(items: { label: string; amount: number }[]) {
  return items.reduce((s, i) => s + i.amount, 0);
}

export default function PaymentsPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-foreground/50 text-sm">Manage your invoices and payment history.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Total Paid</p>
          <p className="text-xl font-bold">₹{invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Pending</p>
          <p className="text-xl font-bold text-amber-600">₹{invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Overdue</p>
          <p className="text-xl font-bold text-red-600">₹{invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0).toLocaleString()}</p>
        </div>
      </div>

      {/* Invoices */}
      <div className="space-y-3">
        {invoices.map(inv => (
          <div key={inv.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <button onClick={() => setExpanded(expanded === inv.id ? null : inv.id)} className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors text-left">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-sm w-20">{inv.id}</span>
                <span className="text-sm text-foreground/60 w-44 truncate">{inv.hoarding}</span>
                <span className="text-sm text-foreground/40 w-24">{inv.date}</span>
                <span className="flex items-center gap-1.5">
                  {statusIcon[inv.status]}
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border capitalize ${statusClass[inv.status]}`}>{inv.status}</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold">₹{inv.amount.toLocaleString()}</span>
                {expanded === inv.id ? <ChevronUp className="w-4 h-4 text-foreground/30" /> : <ChevronDown className="w-4 h-4 text-foreground/30" />}
              </div>
            </button>

            {expanded === inv.id && (
              <div className="border-t border-stone-100 px-4 py-3">
                <div className="space-y-1.5 mb-3">
                  {inv.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-foreground/60">{item.label}</span>
                      <span>₹{item.amount.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-bold border-t border-stone-200 pt-1.5 mt-1.5">
                    <span>Total</span>
                    <span>₹{total(inv.items).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-foreground/40">Due: {inv.dueDate}</span>
                  <button className="ml-auto text-xs text-primary hover:text-primary/80 flex items-center gap-1 font-medium">
                    <Download className="w-3.5 h-3.5" /> Download Invoice
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
