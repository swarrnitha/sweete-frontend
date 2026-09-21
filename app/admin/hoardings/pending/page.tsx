'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MapPin, Check, X, Eye } from 'lucide-react';

const pendingList = [
  { id: 6, name: 'Sarjapur Road Hoarding', location: 'Bangalore', area: 'Sarjapur Road', type: 'Billboard', size: '20x10 ft', price: 40000, image: 'https://picsum.photos/seed/sarjapur/160/100', preview: 'https://picsum.photos/seed/sarjapur-preview/400/250', submittedBy: 'TechAds Agency', submittedOn: '2026-07-18' },
  { id: 10, name: 'C Scheme Signage', location: 'Jaipur', area: 'C Scheme', type: 'Building Wrap', size: '40x20 ft', price: 65000, image: 'https://picsum.photos/seed/cscheme/160/100', preview: 'https://picsum.photos/seed/cscheme-preview/400/250', submittedBy: 'Jaipur Media Group', submittedOn: '2026-07-19' },
  { id: 13, name: 'Electronic City Display', location: 'Bangalore', area: 'Electronic City', type: 'Digital Screen', size: '15x8 ft', price: 50000, image: 'https://picsum.photos/seed/electronic-city/160/100', preview: 'https://picsum.photos/seed/electronic-preview/400/250', submittedBy: 'DigiSigns Pvt Ltd', submittedOn: '2026-07-20' },
];

export default function PendingApprovalPage() {
  const [pending, setPending] = useState(pendingList);
  const [previewId, setPreviewId] = useState<number | null>(null);

  const approve = (id: number, name: string) => {
    setPending(prev => prev.filter(h => h.id !== id));
    toast.success(`"${name}" approved successfully!`);
  };

  const reject = (id: number, name: string) => {
    setPending(prev => prev.filter(h => h.id !== id));
    toast.error(`"${name}" rejected.`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pending Approval</h1>
        <p className="text-foreground/50 text-sm">{pending.length} hoardings awaiting review</p>
      </div>

      <div className="space-y-4">
        {pending.map(h => (
          <div key={h.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="p-4">
              <div className="flex gap-4">
                <img src={h.image} alt={h.name} className="w-20 h-14 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <p className="font-semibold text-sm">{h.name}</p>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5"><MapPin className="w-3 h-3" /> {h.location}, {h.area}</div>
                    <p className="text-xs text-foreground/50 mt-0.5">{h.type} &middot; {h.size}</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Submitted By</p>
                    <p className="text-sm">{h.submittedBy}</p>
                    <p className="text-xs text-foreground/40 mt-0.5">on {h.submittedOn}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Price</p>
                    <p className="text-lg font-bold text-primary">₹{h.price.toLocaleString()}/mo</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-100">
                <button onClick={() => setPreviewId(previewId === h.id ? null : h.id)} className="flex items-center gap-1.5 px-3 py-1.5 border border-stone-200 rounded-lg text-xs font-medium hover:bg-stone-50 transition-colors">
                  <Eye className="w-3.5 h-3.5" /> {previewId === h.id ? 'Hide Preview' : 'Preview'}
                </button>
                <button onClick={() => approve(h.id, h.name)} className="flex items-center gap-1.5 px-4 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors ml-auto">
                  <Check className="w-3.5 h-3.5" /> Approve
                </button>
                <button onClick={() => reject(h.id, h.name)} className="flex items-center gap-1.5 px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors">
                  <X className="w-3.5 h-3.5" /> Reject
                </button>
              </div>
            </div>

            {previewId === h.id && (
              <div className="border-t border-stone-100 bg-stone-50 p-4">
                <img src={h.preview} alt={`${h.name} preview`} className="w-full max-w-lg rounded-xl mx-auto" />
              </div>
            )}
          </div>
        ))}
      </div>

      {pending.length === 0 && (
        <div className="text-center py-16 text-foreground/40">All hoardings have been reviewed.</div>
      )}
    </div>
  );
}
