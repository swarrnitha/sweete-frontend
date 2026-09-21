'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Building2, Ban, AlertTriangle, RotateCcw, Mail, Phone } from 'lucide-react';

const suspendedList = [
  { id: 6, company: 'DigiSigns Pvt Ltd', contact: 'Karan Mehta', email: 'karan@digisigns.com', phone: '+91 43210 98765', city: 'Bangalore', reason: 'Payment default — outstanding invoices overdue by 60+ days.', suspendedOn: '2026-06-15', hoardings: 5, outstanding: '₹2,40,000' },
  { id: 9, company: 'CityAds Network', contact: 'Arun Nair', email: 'arun@cityads.net', phone: '+91 10987 65432', city: 'Kochi', reason: 'Violation of terms — unauthorized subletting of hoarding space.', suspendedOn: '2026-07-01', hoardings: 2, outstanding: '₹85,000' },
];

export default function SuspendedPage() {
  const [suspended, setSuspended] = useState(suspendedList);

  const restore = (id: number, company: string) => {
    setSuspended(prev => prev.filter(a => a.id !== id));
    toast.success(`"${company}" restored successfully.`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Suspended Advertisers</h1>
        <p className="text-foreground/50 text-sm">{suspended.length} suspended accounts</p>
      </div>

      <div className="space-y-4">
        {suspended.map(a => (
          <div key={a.id} className="bg-white rounded-2xl border border-red-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <Ban className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <p className="font-semibold text-sm">{a.company}</p>
                    <p className="text-xs text-foreground/60">{a.contact}</p>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/40 mt-0.5"><Mail className="w-3 h-3" />{a.email}</div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/40"><Phone className="w-3 h-3" />{a.phone}</div>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Suspension Reason
                    </p>
                    <div className="bg-red-50 rounded-xl p-3">
                      <p className="text-sm text-red-800">{a.reason}</p>
                      <p className="text-xs text-red-500 mt-1">Suspended on {a.suspendedOn}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Outstanding</p>
                    <p className="text-lg font-bold text-red-600">{a.outstanding}</p>
                    <p className="text-xs text-foreground/40 mt-0.5">{a.hoardings} hoardings affected</p>
                    <button onClick={() => restore(a.id, a.company)} className="mt-3 px-4 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors flex items-center gap-1.5 ml-auto">
                      <RotateCcw className="w-3.5 h-3.5" /> Restore Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {suspended.length === 0 && (
        <div className="text-center py-16 text-foreground/40">No suspended advertisers.</div>
      )}
    </div>
  );
}
