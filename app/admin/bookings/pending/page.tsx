'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Calendar, MapPin, IndianRupee, Building2, User, Check, X, Eye } from 'lucide-react';

const pending = [
  { id: 101, hoarding: 'Sarjapur Road Hoarding', image: 'https://picsum.photos/seed/sarjapur/160/100', location: 'Bangalore', area: 'Sarjapur Road', price: 40000, size: '20x10 ft', advertiser: 'TechAds Agency', contact: 'Sneha Reddy', email: 'sneha@techads.com', phone: '+91 65432 10987', startDate: '2026-08-01', endDate: '2027-01-31', months: 6, totalAmount: 240000, requestedOn: '2026-07-18' },
  { id: 102, hoarding: 'C Scheme Signage', image: 'https://picsum.photos/seed/cscheme/160/100', location: 'Jaipur', area: 'C Scheme', price: 65000, size: '40x20 ft', advertiser: 'Jaipur Media Group', contact: 'Vikram Singh', email: 'vikram@jaipurmedia.in', phone: '+91 54321 09876', startDate: '2026-08-15', endDate: '2026-11-14', months: 3, totalAmount: 195000, requestedOn: '2026-07-19' },
];

export default function PendingBookingsPage() {
  const [list, setList] = useState(pending);
  const [preview, setPreview] = useState<number | null>(null);

  const approve = (id: number, name: string) => {
    setList(prev => prev.filter(b => b.id !== id));
    toast.success(`Booking for "${name}" approved!`);
  };

  const reject = (id: number, name: string) => {
    setList(prev => prev.filter(b => b.id !== id));
    toast.error(`Booking for "${name}" rejected.`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pending Bookings</h1>
        <p className="text-foreground/50 text-sm">{list.length} bookings awaiting approval</p>
      </div>

      <div className="space-y-4">
        {list.map(b => (
          <div key={b.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="p-4">
              <div className="flex gap-4">
                <img src={b.image} alt={b.hoarding} className="w-28 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <p className="font-semibold text-sm">{b.hoarding}</p>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5"><MapPin className="w-3 h-3" />{b.location}, {b.area}</div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50"><span className="font-mono">{b.size}</span></div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mt-1"><IndianRupee className="w-3.5 h-3.5" />₹{b.price.toLocaleString()}/mo</div>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Advertiser</p>
                    <div className="flex items-center gap-1.5 text-sm"><Building2 className="w-3.5 h-3.5 text-foreground/30" />{b.advertiser}</div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5"><User className="w-3 h-3" />{b.contact}</div>
                    <p className="text-xs text-foreground/40 mt-0.5">{b.email} &middot; {b.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Booking Details</p>
                    <div className="flex items-center gap-1.5 text-xs"><Calendar className="w-3 h-3 text-foreground/30" />{b.startDate} – {b.endDate}</div>
                    <p className="text-xs text-foreground/40 mt-0.5">{b.months} months &middot; ₹{b.totalAmount.toLocaleString()} total</p>
                    <p className="text-xs text-foreground/40 mt-0.5">Requested: {b.requestedOn}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 justify-end">
                    <div className="flex gap-2">
                      <button onClick={() => approve(b.id, b.hoarding)} className="px-4 py-2 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors flex items-center gap-1.5"><Check className="w-3.5 h-3.5" /> Approve</button>
                      <button onClick={() => reject(b.id, b.hoarding)} className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors flex items-center gap-1.5"><X className="w-3.5 h-3.5" /> Reject</button>
                    </div>
                    <button onClick={() => setPreview(preview === b.id ? null : b.id)} className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {preview === b.id ? 'Hide' : 'View'} Hoarding Preview</button>
                  </div>
                </div>
              </div>
            </div>

            {preview === b.id && (
              <div className="border-t border-stone-100 bg-stone-50 p-4">
                <img src={b.image} alt={b.hoarding} className="w-full max-w-md rounded-xl mx-auto" />
              </div>
            )}
          </div>
        ))}
      </div>

      {list.length === 0 && <div className="text-center py-16 text-foreground/40">All bookings processed.</div>}
    </div>
  );
}
