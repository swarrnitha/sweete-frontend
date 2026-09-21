'use client';
import { useState } from 'react';
import { Building2, CreditCard, IndianRupee, Calendar, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const subscribers = [
  {
    id: 1, company: 'AdShack Media Pvt Ltd', plan: 'Premium', price: 4999, startDate: '2025-11-01', endDate: '2027-10-31', status: 'Active',
    payments: [
      { date: '2026-07-01', amount: 4999, method: 'Net Banking', status: 'paid', invoice: 'INV-001' },
      { date: '2026-06-01', amount: 4999, method: 'UPI', status: 'paid', invoice: 'INV-002' },
      { date: '2026-05-01', amount: 4999, method: 'Credit Card', status: 'paid', invoice: 'INV-003' },
      { date: '2026-04-01', amount: 4999, method: 'Net Banking', status: 'paid', invoice: 'INV-004' },
      { date: '2026-03-01', amount: 4999, method: 'UPI', status: 'paid', invoice: 'INV-005' },
    ],
  },
  {
    id: 2, company: 'BrandWave Solutions', plan: 'Professional', price: 2999, startDate: '2026-01-15', endDate: '2027-01-14', status: 'Active',
    payments: [
      { date: '2026-07-15', amount: 2999, method: 'Net Banking', status: 'paid', invoice: 'INV-006' },
      { date: '2026-06-15', amount: 2999, method: 'UPI', status: 'paid', invoice: 'INV-007' },
      { date: '2026-05-15', amount: 2999, method: 'Credit Card', status: 'paid', invoice: 'INV-008' },
    ],
  },
  {
    id: 6, company: 'DigiSigns Pvt Ltd', plan: 'Professional', price: 2999, startDate: '2026-03-01', endDate: '2026-08-31', status: 'Suspended',
    payments: [
      { date: '2026-03-01', amount: 2999, method: 'Net Banking', status: 'paid', invoice: 'INV-009' },
      { date: '2026-04-01', amount: 2999, method: 'UPI', status: 'paid', invoice: 'INV-010' },
      { date: '2026-05-01', amount: 2999, method: 'Net Banking', status: 'overdue', invoice: 'INV-011' },
    ],
  },
];

const planStyles: Record<string, string> = {
  Premium: 'bg-purple-50 text-purple-700 border-purple-200',
  Professional: 'bg-blue-50 text-blue-700 border-blue-200',
  Starter: 'bg-stone-100 text-stone-600 border-stone-200',
  Basic: 'bg-green-50 text-green-700 border-green-200',
};

const payStyles: Record<string, string> = {
  paid: 'bg-accent/10 text-accent',
  overdue: 'bg-red-50 text-red-700',
};

export default function SubscriptionHistoryPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Subscription History</h1>
        <p className="text-foreground/50 text-sm">{subscribers.length} advertisers with subscription history</p>
      </div>

      <div className="space-y-4">
        {subscribers.map(s => (
          <div key={s.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            {/* Header */}
            <button onClick={() => setExpanded(expanded === s.id ? null : s.id)} className="w-full flex items-center justify-between p-4 hover:bg-stone-50 transition-colors text-left">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{s.company}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${planStyles[s.plan]}`}>{s.plan}</span>
                    <span className="text-xs text-foreground/40">₹{s.price}/mo</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${s.status === 'Active' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-red-50 text-red-700 border-red-200'}`}>{s.status}</span>
                {expanded === s.id ? <ChevronUp className="w-4 h-4 text-foreground/30" /> : <ChevronDown className="w-4 h-4 text-foreground/30" />}
              </div>
            </button>

            {/* Expanded: Plan + Payment Timeline */}
            {expanded === s.id && (
              <div className="border-t border-stone-100 px-4 py-3">
                {/* Plan Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-stone-50 rounded-xl p-3">
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide">Plan</p>
                    <p className="text-sm font-semibold mt-0.5">{s.plan} &middot; ₹{s.price}/mo</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide">Duration</p>
                    <div className="flex items-center gap-1.5 text-sm mt-0.5"><Calendar className="w-3.5 h-3.5 text-foreground/30" />{s.startDate} – {s.endDate}</div>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide">Total Spent</p>
                    <p className="text-sm font-semibold mt-0.5 text-primary">₹{s.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                  </div>
                </div>

                {/* Payment Timeline */}
                <p className="text-xs text-foreground/40 uppercase tracking-wide mb-2 flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> Payment History</p>
                <div className="space-y-2">
                  {s.payments.map((p, i) => (
                    <div key={i} className="flex items-center justify-between bg-white rounded-lg border border-stone-100 px-3 py-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 w-28 text-sm"><Calendar className="w-3.5 h-3.5 text-foreground/30" />{p.date}</div>
                        <span className="text-sm font-medium w-20">₹{p.amount}</span>
                        <span className="text-xs text-foreground/40 w-24">{p.method}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${payStyles[p.status]}`}>
                          {p.status === 'paid' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}{p.status}
                        </span>
                        <span className="text-xs font-mono text-foreground/30">{p.invoice}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
