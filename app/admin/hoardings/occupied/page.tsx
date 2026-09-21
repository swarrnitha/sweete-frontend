'use client';
import { MapPin, Maximize, User, Calendar, Clock } from 'lucide-react';

const occupied = [
  { id: 1, name: 'Marine Drive Premium', location: 'Mumbai', size: '20x10 ft', price: 75000, image: 'https://picsum.photos/seed/marine-drive/80/60', advertiser: 'AdShack Media Pvt Ltd', email: 'contact@adshack.com', startDate: '2026-04-01', endDate: '2026-09-30', rentalMonths: 6 },
  { id: 4, name: 'BKC Junction', location: 'Mumbai', size: '30x15 ft', price: 85000, image: 'https://picsum.photos/seed/bkc/80/60', advertiser: 'BrandWave Solutions', email: 'hello@brandwave.co', startDate: '2026-05-15', endDate: '2026-11-15', rentalMonths: 6 },
  { id: 8, name: 'Jubilee Hills Display', location: 'Hyderabad', size: '18x10 ft', price: 55000, image: 'https://picsum.photos/seed/jubilee/80/60', advertiser: 'VisionAds Inc', email: 'info@visionads.in', startDate: '2026-06-01', endDate: '2026-08-31', rentalMonths: 3 },
];

function remainingDays(endDate: string): number {
  const diff = new Date(endDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function OccupiedPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Occupied Hoardings</h1>
        <p className="text-foreground/50 text-sm">{occupied.length} hoardings currently booked</p>
      </div>

      <div className="space-y-3">
        {occupied.map(h => {
          const remaining = remainingDays(h.endDate);
          return (
            <div key={h.id} className="bg-white rounded-2xl border border-stone-200 p-4">
              <div className="flex gap-4">
                <img src={h.image} alt={h.name} className="w-16 h-12 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="font-semibold text-sm">{h.name}</p>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5">
                      <MapPin className="w-3 h-3" /> {h.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                      <Maximize className="w-3 h-3" /> {h.size}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Advertiser</p>
                    <div className="flex items-center gap-1.5 text-sm">
                      <User className="w-3.5 h-3.5 text-foreground/30" /> {h.advertiser}
                    </div>
                    <p className="text-xs text-foreground/40 mt-0.5">{h.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Rental Period</p>
                    <div className="flex items-center gap-1.5 text-xs">
                      <Calendar className="w-3 h-3 text-foreground/30" /> {h.startDate} – {h.endDate}
                    </div>
                    <p className="text-xs text-foreground/40 mt-0.5">{h.rentalMonths} month contract</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Remaining</p>
                    <div className={`text-xl font-bold flex items-center justify-end gap-1.5 ${remaining < 30 ? 'text-red-500' : 'text-accent'}`}>
                      <Clock className="w-4 h-4" /> {remaining}d
                    </div>
                    <p className="text-sm font-semibold text-primary mt-1">₹{h.price.toLocaleString()}/mo</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
