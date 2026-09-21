'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Building2, Calendar, IndianRupee, CheckCircle, XCircle, Clock, RotateCcw, Send } from 'lucide-react';

const renewals = [
  { id: 1, company: 'AdShack Media Pvt Ltd', contact: 'Rahul Sharma', plan: 'Premium', price: 4999, currentEnd: '2027-10-31', requestDate: '2026-07-15', status: 'Pending', paymentStatus: 'Awaiting Payment', paymentMethod: 'Net Banking', notes: 'Requesting upgrade to annual plan with 2-month discount.' },
  { id: 2, company: 'Pune Outdoor Solutions', contact: 'Raj Deshmukh', plan: 'Professional', price: 2999, currentEnd: '2027-02-19', requestDate: '2026-07-18', status: 'Approved', paymentStatus: 'Paid', paymentMethod: 'UPI', notes: 'Auto-renewal confirmation received.' },
  { id: 3, company: 'Outdoor Media Co', contact: 'Neha Gupta', plan: 'Basic', price: 999, currentEnd: '2027-04-09', requestDate: '2026-07-10', status: 'Pending', paymentStatus: 'Payment Failed', paymentMethod: 'Credit Card', notes: 'Card declined — updated card details requested.' },
  { id: 4, company: 'BrandWave Solutions', contact: 'Priya Patel', plan: 'Professional', price: 2999, currentEnd: '2027-01-14', requestDate: '2026-07-01', status: 'Approved', paymentStatus: 'Paid', paymentMethod: 'Net Banking', notes: 'Renewed for 12 months at existing rate.' },
];

const planStyles: Record<string, string> = {
  Premium: 'bg-purple-50 text-purple-700 border-purple-200',
  Professional: 'bg-blue-50 text-blue-700 border-blue-200',
  Basic: 'bg-green-50 text-green-700 border-green-200',
};

const statusStyles: Record<string, { bg: string; icon: React.ReactNode }> = {
  Approved: { bg: 'bg-accent/10 text-accent border-accent/20', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  Pending: { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Clock className="w-3.5 h-3.5" /> },
};

const payStatusStyles: Record<string, string> = {
  Paid: 'bg-accent/10 text-accent',
  'Awaiting Payment': 'bg-amber-50 text-amber-700',
  'Payment Failed': 'bg-red-50 text-red-700',
};

export default function RenewalsPage() {
  const [list, setList] = useState(renewals);

  const approve = (id: number, company: string) => {
    setList(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved', paymentStatus: 'Paid' } : r));
    toast.success(`Renewal approved for "${company}"`);
  };

  const sendReminder = (company: string) => {
    toast.success(`Payment reminder sent to "${company}"`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Renewals</h1>
        <p className="text-foreground/50 text-sm">{list.length} renewal requests</p>
      </div>

      <div className="space-y-3">
        {list.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0 grid md:grid-cols-4 gap-3">
                  <div>
                    <p className="font-semibold text-sm">{r.company}</p>
                    <p className="text-xs text-foreground/60">{r.contact}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border mt-1 inline-block ${planStyles[r.plan]}`}>{r.plan}</span>
                    <p className="text-xs text-foreground/40 mt-1">₹{r.price}/mo</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Status</p>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border flex items-center gap-1 w-fit ${statusStyles[r.status]?.bg}`}>
                      {statusStyles[r.status]?.icon} {r.status}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs mt-2">
                      <Calendar className="w-3 h-3 text-foreground/30" />Requested: {r.requestDate}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3 h-3 text-foreground/30" />Ends: {r.currentEnd}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Payment</p>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${payStatusStyles[r.paymentStatus]}`}>{r.paymentStatus}</span>
                    <p className="text-xs text-foreground/40 mt-2">{r.paymentMethod}</p>
                    <p className="text-xs text-foreground/50 mt-1.5 italic">{r.notes}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    {r.status === 'Pending' && (
                      <>
                        <button onClick={() => approve(r.id, r.company)} className="px-3 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5" /> Approve Renewal
                        </button>
                        <button onClick={() => sendReminder(r.company)} className="px-3 py-1.5 border border-stone-200 rounded-lg text-xs font-medium hover:bg-stone-50 transition-colors flex items-center gap-1.5">
                          <Send className="w-3.5 h-3.5" /> Send Reminder
                        </button>
                      </>
                    )}
                    {r.status === 'Approved' && (
                      <span className="text-xs text-accent font-medium flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Renewal completed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
