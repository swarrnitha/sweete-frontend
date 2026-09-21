'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { ArrowLeft, Trash2, AlertTriangle, Clock, User, MapPin } from 'lucide-react';

const auditLog = [
  { action: 'Created', by: 'Admin User', date: '2026-03-15 10:30 AM', details: 'Hoarding listing created with price ₹75,000' },
  { action: 'Updated', by: 'Admin User', date: '2026-04-01 02:15 PM', details: 'Status changed from Available to Occupied' },
  { action: 'Price Change', by: 'System', date: '2026-05-01 12:00 AM', details: 'Auto price revision applied' },
  { action: 'Updated', by: 'Admin User', date: '2026-06-10 09:45 AM', details: 'Description and images updated' },
];

export default function DeleteHoardingPage() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      toast.success('Hoarding deleted successfully.');
      router.push('/admin/hoardings/all');
    }, 1500);
  };

  return (
    <div>
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex items-center gap-3 mb-6">
        <Trash2 className="w-6 h-6 text-red-500" />
        <div>
          <h1 className="text-2xl font-bold">Delete Hoarding</h1>
          <p className="text-foreground/50 text-sm">Permanently remove this hoarding listing.</p>
        </div>
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Confirmation Card */}
        <div className="bg-white rounded-2xl border border-red-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg">Are you sure?</h2>
              <p className="text-sm text-foreground/60 mt-1">
                You are about to delete <strong>Marine Drive Premium</strong> (ID: #1). This action cannot be undone. 
                All associated bookings, payment records, and creative assets will also be removed.
              </p>

              <div className="mt-4 bg-stone-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-foreground/30" />
                  <span>Mumbai, Marine Drive</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">₹75,000</span>
                  <span className="text-foreground/40">/ month</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Currently occupied — active booking exists</span>
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} className="w-4 h-4 rounded border-stone-300 text-primary focus:ring-primary" />
                  <span className="text-sm text-foreground/70">I understand this action is permanent and cannot be reversed.</span>
                </label>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={handleDelete} disabled={!confirmed || deleting} className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
                  {deleting ? 'Deleting...' : <><Trash2 className="w-4 h-4" /> Delete Hoarding</>}
                </button>
                <button onClick={() => router.push('/admin/hoardings/all')} className="px-5 py-2.5 border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Log */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-foreground/40" />
            <h2 className="font-semibold text-sm">Audit Log</h2>
          </div>
          <div className="space-y-3">
            {auditLog.map((entry, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-xs">{entry.action}</span>
                    <span className="text-xs text-foreground/40">by {entry.by}</span>
                    <span className="text-xs text-foreground/30 ml-auto">{entry.date}</span>
                  </div>
                  <p className="text-xs text-foreground/50 mt-0.5">{entry.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
