'use client';
import { MapPin, Building2, User, IndianRupee, Calendar, XCircle } from 'lucide-react';

const rejected = [
  { id: 301, hoarding: 'Andheri East Billboard', image: 'https://picsum.photos/seed/andheri/160/100', location: 'Mumbai', price: 38000, size: '15x10 ft', advertiser: 'QuickAds Agency', contact: 'Anita Desai', email: 'anita@quickads.com', requestDate: '2026-07-10', rejectedOn: '2026-07-12', reason: 'Hoarding is under maintenance — bookings temporarily unavailable. Please check back after Jul 25.' },
  { id: 302, hoarding: 'FC Road Billboard', image: 'https://picsum.photos/seed/fcroad/160/100', location: 'Pune', price: 42000, size: '22x11 ft', advertiser: 'Pune Outdoor Solutions', contact: 'Raj Deshmukh', email: 'raj@puneoutdoor.com', requestDate: '2026-07-14', rejectedOn: '2026-07-15', reason: 'Documentation incomplete — GST certificate and business registration proof missing. Please re-submit with all required documents.' },
  { id: 303, hoarding: 'Park Street Banner', image: 'https://picsum.photos/seed/parkstreet/160/100', location: 'Kolkata', price: 30000, size: '12x6 ft', advertiser: 'EcoAds India', contact: 'Rohan Thakur', email: 'rohan@ecoads.in', requestDate: '2026-07-05', rejectedOn: '2026-07-07', reason: 'Ad creative does not comply with local municipal advertising guidelines. Please revise creative and re-submit.' },
];

export default function RejectedBookingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Rejected Bookings</h1>
        <p className="text-foreground/50 text-sm">{rejected.length} rejected bookings</p>
      </div>

      <div className="space-y-3">
        {rejected.map(b => (
          <div key={b.id} className="bg-white rounded-2xl border border-red-200 overflow-hidden">
            <div className="p-4">
              <div className="flex gap-4">
                <img src={b.image} alt={b.hoarding} className="w-24 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
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
                    <p className="text-xs text-foreground/40 mt-0.5">{b.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Rejection Reason</p>
                    <div className="bg-red-50 rounded-xl p-3">
                      <p className="text-sm text-red-800">{b.reason}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/40 mt-2">
                      <Calendar className="w-3 h-3" />Requested: {b.requestDate} &middot; Rejected: {b.rejectedOn}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-end">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border bg-red-50 text-red-700 border-red-200">Rejected</span>
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
