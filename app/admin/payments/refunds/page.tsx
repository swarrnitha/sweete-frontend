'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Building2, IndianRupee, Calendar, CheckCircle, XCircle, Clock, RotateCcw, AlertTriangle, User } from 'lucide-react';

const refunds = [
  { id: 501, company: 'BrightAds Media', contact: 'Sanjay Kapoor', invoice: 'INV-030', amount: 2999, requestDate: '2026-07-10', reason: 'Service not delivered — hoarding maintenance period overlapped with booking.', status: 'Approved', processedDate: '2026-07-12', refundAmount: 2999, method: 'Net Banking' },
  { id: 502, company: 'EcoAds India', contact: 'Rohan Thakur', invoice: 'INV-035', amount: 999, requestDate: '2026-07-14', reason: 'Advertiser cancelled within 48 hours of booking as per cancellation policy.', status: 'Pending', processedDate: null, refundAmount: 999, method: 'UPI' },
  { id: 503, company: 'Metro Signage Ltd', contact: 'Deepika Nair', invoice: 'INV-040', amount: 4999, requestDate: '2026-07-05', reason: 'Double payment — transaction processed twice due to gateway error.', status: 'Approved', processedDate: '2026-07-08', refundAmount: 4999, method: 'Credit Card' },
  { id: 504, company: 'QuickAds Agency', contact: 'Anita Desai', invoice: 'INV-045', amount: 1499, requestDate: '2026-07-18', reason: 'Ad creative rejected by compliance team — full refund requested.', status: 'Rejected', processedDate: null, refundAmount: 0, method: 'N/A' },
  { id: 505, company: 'DigiSigns Pvt Ltd', contact: 'Karan Mehta', invoice: 'INV-050', amount: 2999, requestDate: '2026-07-01', reason: 'Payment default — customer requested refund for unutilized period.', status: 'Pending', processedDate: null, refundAmount: 1500, method: 'Net Banking' },
];

const statusStyles: Record<string, string> = {
  Approved: 'bg-accent/10 text-accent border-accent/20',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Rejected: 'bg-red-50 text-red-700 border-red-200',
};

const statusIcons: Record<string, React.ReactNode> = {
  Approved: <CheckCircle className="w-3.5 h-3.5" />,
  Pending: <Clock className="w-3.5 h-3.5" />,
  Rejected: <XCircle className="w-3.5 h-3.5" />,
};

export default function RefundsPage() {
  const [list, setList] = useState(refunds);

  const approve = (id: number) => {
    setList(prev => prev.map(r => r.id === id ? { ...r, status: 'Approved', processedDate: '2026-07-20' } : r));
    toast.success('Refund approved.');
  };

  const reject = (id: number) => {
    setList(prev => prev.map(r => r.id === id ? { ...r, status: 'Rejected', refundAmount: 0 } : r));
    toast.error('Refund rejected.');
  };

  const totalPending = list.filter(r => r.status === 'Pending').reduce((s, r) => s + r.refundAmount, 0);
  const totalApproved = list.filter(r => r.status === 'Approved').reduce((s, r) => s + r.refundAmount, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Refunds</h1>
        <p className="text-foreground/50 text-sm">{list.length} refund requests &middot; ₹{totalPending.toLocaleString()} pending</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide">Pending</p>
          <p className="text-xl font-bold text-amber-600 mt-1">{list.filter(r => r.status === 'Pending').length}</p>
          <p className="text-xs text-foreground/40 mt-0.5">₹{totalPending.toLocaleString()} total</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide">Approved</p>
          <p className="text-xl font-bold text-accent mt-1">{list.filter(r => r.status === 'Approved').length}</p>
          <p className="text-xs text-foreground/40 mt-0.5">₹{totalApproved.toLocaleString()} total</p>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4">
          <p className="text-xs text-foreground/40 uppercase tracking-wide">Rejected</p>
          <p className="text-xl font-bold text-red-600 mt-1">{list.filter(r => r.status === 'Rejected').length}</p>
        </div>
      </div>

      <div className="space-y-3">
        {list.map(r => (
          <div key={r.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${r.status === 'Approved' ? 'bg-accent/15' : r.status === 'Pending' ? 'bg-amber-100' : 'bg-red-100'}`}>
                  <RotateCcw className={`w-5 h-5 ${r.status === 'Approved' ? 'text-accent' : r.status === 'Pending' ? 'text-amber-600' : 'text-red-500'}`} />
                </div>
                <div className="flex-1 min-w-0 grid md:grid-cols-4 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{r.company}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${statusStyles[r.status]}`}>{statusIcons[r.status]} {r.status}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5"><User className="w-3 h-3" />{r.contact}</div>
                    <p className="text-xs text-foreground/40 mt-0.5">Invoice: {r.invoice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Reason</p>
                    <div className="bg-stone-50 rounded-xl p-3">
                      <p className="text-sm text-foreground/60">{r.reason}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Amount &amp; Method</p>
                    <p className="text-sm font-semibold">Requested: ₹{r.amount.toLocaleString()}</p>
                    <p className={`text-sm font-semibold ${r.status === 'Approved' ? 'text-accent' : 'text-foreground'}`}>Refund: ₹{r.refundAmount.toLocaleString()}</p>
                    {r.method !== 'N/A' && <p className="text-xs text-foreground/40 mt-0.5">via {r.method}</p>}
                    <div className="flex items-center gap-1.5 text-xs text-foreground/40 mt-1"><Calendar className="w-3 h-3" />Requested: {r.requestDate}</div>
                  </div>
                  <div className="flex flex-col items-end gap-2 justify-end">
                    {r.status === 'Approved' && <p className="text-xs text-foreground/40">Processed: {r.processedDate}</p>}
                    {r.status === 'Pending' && (
                      <div className="flex gap-2">
                        <button onClick={() => approve(r.id)} className="px-3 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Approve</button>
                        <button onClick={() => reject(r.id)} className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors flex items-center gap-1"><XCircle className="w-3.5 h-3.5" /> Reject</button>
                      </div>
                    )}
                    {r.status === 'Rejected' && <span className="text-xs text-red-500 font-medium flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Request denied</span>}
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
