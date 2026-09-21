'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Calendar, MapPin, IndianRupee, Building2, User, Download, FileText, CheckCircle } from 'lucide-react';

const approved = [
  { id: 201, hoarding: 'Marine Drive Premium', image: 'https://picsum.photos/seed/marine-drive/160/100', location: 'Mumbai', price: 75000, size: '20x10 ft', advertiser: 'AdShack Media Pvt Ltd', contact: 'Rahul Sharma', email: 'rahul@adshack.com', startDate: '2026-04-01', endDate: '2026-09-30', months: 6, totalAmount: 450000, approvedOn: '2026-03-25', contractId: 'CTR-001' },
  { id: 202, hoarding: 'BKC Junction', image: 'https://picsum.photos/seed/bkc/160/100', location: 'Mumbai', price: 85000, size: '30x15 ft', advertiser: 'BrandWave Solutions', contact: 'Priya Patel', email: 'priya@brandwave.co', startDate: '2026-05-15', endDate: '2026-11-15', months: 6, totalAmount: 510000, approvedOn: '2026-05-01', contractId: 'CTR-002' },
  { id: 203, hoarding: 'Jubilee Hills Display', image: 'https://picsum.photos/seed/jubilee/160/100', location: 'Hyderabad', price: 55000, size: '18x10 ft', advertiser: 'VisionAds Inc', contact: 'Amit Verma', email: 'amit@visionads.in', startDate: '2026-06-01', endDate: '2026-08-31', months: 3, totalAmount: 165000, approvedOn: '2026-05-20', contractId: 'CTR-003' },
];

export default function ApprovedBookingsPage() {
  const download = (contractId: string, name: string) => {
    toast.success(`Downloading contract ${contractId} for "${name}"`);
  };

  const viewContract = (contractId: string) => {
    toast.success(`Opening contract ${contractId}...`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Approved Bookings</h1>
        <p className="text-foreground/50 text-sm">{approved.length} approved bookings</p>
      </div>

      <div className="space-y-3">
        {approved.map(b => (
          <div key={b.id} className="bg-white rounded-2xl border border-accent/20 overflow-hidden">
            <div className="p-4">
              <div className="flex gap-4">
                <img src={b.image} alt={b.hoarding} className="w-24 h-16 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
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
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Booking Period</p>
                    <div className="flex items-center gap-1.5 text-xs"><Calendar className="w-3 h-3 text-foreground/30" />{b.startDate} – {b.endDate}</div>
                    <p className="text-xs text-foreground/40 mt-0.5">{b.months} months &middot; ₹{b.totalAmount.toLocaleString()} total</p>
                    <p className="text-xs text-foreground/40 mt-0.5">Approved: {b.approvedOn}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 justify-end">
                    <span className="text-xs font-mono text-foreground/30">Contract: {b.contractId}</span>
                    <button onClick={() => download(b.contractId, b.hoarding)} className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5" /> Download Contract
                    </button>
                    <button onClick={() => viewContract(b.contractId)} className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> View Contract
                    </button>
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
