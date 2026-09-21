'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Image, Building2, Calendar, Check, X, Eye, Download, MapPin } from 'lucide-react';

const pending = [
  { id: 2, name: 'BrandWave Q3 Campaign', advertiser: 'BrandWave Solutions', contact: 'Priya Patel', hoarding: 'BKC Junction', format: 'PNG', size: '3840x2160', fileSize: '4.8 MB', uploadedOn: '2026-07-14', preview: 'https://picsum.photos/seed/brandwave-q3/600/338', notes: 'High-resolution outdoor display version.' },
  { id: 5, name: 'Outdoor Media Co Promo', advertiser: 'Outdoor Media Co', contact: 'Neha Gupta', hoarding: 'Anna Nagar Tower', format: 'PNG', size: '1920x1080', fileSize: '1.8 MB', uploadedOn: '2026-07-08', preview: 'https://picsum.photos/seed/outdoor-promo/600/338', notes: 'Standard billboard size — ready for review.' },
  { id: 6, name: 'TechAds Agency Launch', advertiser: 'TechAds Agency', contact: 'Sneha Reddy', hoarding: 'Sarjapur Road Hoarding', format: 'PDF', size: '2480x3508', fileSize: '5.2 MB', uploadedOn: '2026-07-18', preview: 'https://picsum.photos/seed/techads-launch/600/338', notes: 'Print-ready PDF for hoarding installation.' },
];

const formatColors: Record<string, string> = {
  JPEG: 'bg-blue-50 text-blue-700',
  PNG: 'bg-purple-50 text-purple-700',
  MP4: 'bg-rose-50 text-rose-700',
  PDF: 'bg-orange-50 text-orange-700',
};

export default function PendingReviewPage() {
  const [list, setList] = useState(pending);
  const [expanded, setExpanded] = useState<number | null>(null);

  const approve = (id: number, name: string) => {
    setList(prev => prev.filter(c => c.id !== id));
    toast.success(`"${name}" approved!`);
  };

  const reject = (id: number, name: string) => {
    setList(prev => prev.filter(c => c.id !== id));
    toast.error(`"${name}" rejected.`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pending Review</h1>
        <p className="text-foreground/50 text-sm">{list.length} creatives awaiting review</p>
      </div>

      <div className="space-y-4">
        {list.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-amber-200 overflow-hidden">
            <div className="p-4">
              <div className="flex gap-4">
                <div className="w-40 h-28 rounded-xl overflow-hidden bg-stone-100 shrink-0 cursor-pointer" onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
                  <img src={c.preview} alt={c.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 min-w-0 grid md:grid-cols-3 gap-3">
                  <div>
                    <p className="font-semibold text-sm">{c.name}</p>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5"><Building2 className="w-3 h-3" />{c.advertiser}</div>
                    <p className="text-xs text-foreground/40 mt-0.5">{c.contact}</p>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/40 mt-0.5"><MapPin className="w-3 h-3" />{c.hoarding}</div>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">File Info</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded font-medium ${formatColors[c.format]}`}>{c.format}</span>
                      <span className="text-foreground/40">{c.size}</span>
                      <span className="text-foreground/40">{c.fileSize}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/40 mt-1"><Calendar className="w-3 h-3" />{c.uploadedOn}</div>
                    <p className="text-xs text-foreground/40 mt-1 italic">&ldquo;{c.notes}&rdquo;</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 justify-end">
                    <div className="flex gap-2">
                      <button onClick={() => approve(c.id, c.name)} className="px-4 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Approve</button>
                      <button onClick={() => reject(c.id, c.name)} className="px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors flex items-center gap-1"><X className="w-3.5 h-3.5" /> Reject</button>
                    </div>
                    <button onClick={() => setExpanded(expanded === c.id ? null : c.id)} className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {expanded === c.id ? 'Hide' : 'Full'} Preview</button>
                  </div>
                </div>
              </div>
            </div>

            {expanded === c.id && (
              <div className="border-t border-stone-100 bg-stone-50 p-4">
                <img src={c.preview} alt={c.name} className="w-full max-w-2xl rounded-xl mx-auto" />
              </div>
            )}
          </div>
        ))}
      </div>

      {list.length === 0 && <div className="text-center py-16 text-foreground/40">All creatives reviewed.</div>}
    </div>
  );
}
