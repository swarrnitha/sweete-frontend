'use client';
import { MapPin, Building2, User, IndianRupee, Calendar, XCircle, Ban, IndianRupee as Currency } from 'lucide-react';

const cancelled = [
  { id: 401, hoarding: 'MG Road Billboard', image: 'https://picsum.photos/seed/mgroad/160/100', location: 'Bangalore', price: 45000, size: '25x12 ft', advertiser: 'BrandWave Solutions', contact: 'Priya Patel', startDate: '2026-05-01', endDate: '2026-10-31', cancelledOn: '2026-06-15', reason: 'Advertiser requested early termination due to budget reallocation.', refundStatus: 'Partial Refund', refundAmount: '₹1,35,000', monthsUsed: 1.5, totalAmount: 270000 },
  { id: 402, hoarding: 'Connaught Place Signage', image: 'https://picsum.photos/seed/connaught/160/100', location: 'Delhi', price: 60000, size: '15x8 ft', advertiser: 'TechAds Agency', contact: 'Sneha Reddy', startDate: '2026-07-01', endDate: '2026-12-31', cancelledOn: '2026-07-10', reason: 'Hoarding location under renovation — service temporarily unavailable. Advertiser opted for cancellation.', refundStatus: 'Full Refund', refundAmount: '₹60,000', monthsUsed: 0.3, totalAmount: 60000 },
  { id: 403, hoarding: 'Anna Nagar Tower', image: 'https://picsum.photos/seed/annanagar/160/100', location: 'Chennai', price: 35000, size: '10x5 ft', advertiser: 'Outdoor Media Co', contact: 'Neha Gupta', startDate: '2026-06-01', endDate: '2026-11-30', cancelledOn: '2026-07-05', reason: 'Breach of contract — advertiser displayed unauthorized third-party ads.', refundStatus: 'No Refund', refundAmount: '₹0', monthsUsed: 1, totalAmount: 35000 },
];

const refundStyles: Record<string, string> = {
  'Full Refund': 'bg-accent/10 text-accent border-accent/20',
  'Partial Refund': 'bg-amber-50 text-amber-700 border-amber-200',
  'No Refund': 'bg-red-50 text-red-700 border-red-200',
};

export default function CancelledBookingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Cancelled Bookings</h1>
        <p className="text-foreground/50 text-sm">{cancelled.length} cancelled bookings</p>
      </div>

      <div className="space-y-3">
        {cancelled.map(b => (
          <div key={b.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="p-4">
              <div className="flex gap-4">
                <img src={b.image} alt={b.hoarding} className="w-24 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-stone-400" />
                      <p className="font-semibold text-sm">{b.hoarding}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5"><MapPin className="w-3 h-3" />{b.location}</div>
                    <p className="text-xs text-foreground/40">{b.size}</p>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mt-1"><IndianRupee className="w-3.5 h-3.5" />₹{b.price.toLocaleString()}/mo</div>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Advertiser</p>
                    <div className="flex items-center gap-1.5 text-sm"><Building2 className="w-3.5 h-3.5 text-foreground/30" />{b.advertiser}</div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5"><User className="w-3 h-3" />{b.contact}</div>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Cancellation Reason</p>
                    <div className="bg-stone-50 rounded-xl p-3">
                      <p className="text-sm text-foreground/60">{b.reason}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/40 mt-2">
                      <Calendar className="w-3 h-3" />Cancelled: {b.cancelledOn}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Refund</p>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${refundStyles[b.refundStatus]}`}>{b.refundStatus}</span>
                    <p className="text-lg font-bold mt-1">{b.refundAmount}</p>
                    <div className="text-xs text-foreground/40 mt-1">
                      <p>Used: {b.monthsUsed}mo of ₹{b.totalAmount.toLocaleString()}</p>
                    </div>
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
