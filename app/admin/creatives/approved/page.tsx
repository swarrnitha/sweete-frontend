'use client';
import { useState } from 'react';
import { Image, Building2, Calendar, Eye, CheckCircle, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const approved = [
  { id: 1, name: 'Summer Sale Banner', advertiser: 'AdShack Media Pvt Ltd', hoarding: 'Marine Drive Premium', format: 'JPEG', size: '1920x1080', fileSize: '2.4 MB', approvedOn: '2026-07-16', approvedBy: 'Admin User', preview: 'https://picsum.photos/seed/summer-sale/400/225' },
  { id: 3, name: 'VisionAds Digital Creative', advertiser: 'VisionAds Inc', hoarding: 'Jubilee Hills Display', format: 'MP4', size: '1920x1080', fileSize: '12.5 MB', approvedOn: '2026-07-13', approvedBy: 'Admin User', preview: 'https://picsum.photos/seed/visionads/400/225' },
  { id: 7, name: 'AdShack Festive Campaign', advertiser: 'AdShack Media Pvt Ltd', hoarding: 'Marine Drive Premium', format: 'PNG', size: '3840x2160', fileSize: '6.2 MB', approvedOn: '2026-07-11', approvedBy: 'Admin User', preview: 'https://picsum.photos/seed/festive-campaign/400/225' },
  { id: 8, name: 'Pune Outdoor Monsoon Ad', advertiser: 'Pune Outdoor Solutions', hoarding: 'FC Road Billboard', format: 'JPEG', size: '1920x1080', fileSize: '2.8 MB', approvedOn: '2026-07-09', approvedBy: 'Admin User', preview: 'https://picsum.photos/seed/monsoon-ad/400/225' },
];

const formatColors: Record<string, string> = {
  JPEG: 'bg-blue-50 text-blue-700',
  PNG: 'bg-purple-50 text-purple-700',
  MP4: 'bg-rose-50 text-rose-700',
  PDF: 'bg-orange-50 text-orange-700',
};

export default function ApprovedPage() {
  const [preview, setPreview] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Approved Creatives</h1>
        <p className="text-foreground/50 text-sm">{approved.length} approved creatives</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {approved.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-accent/20 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-40 bg-stone-100 cursor-pointer" onClick={() => setPreview(preview === c.id ? null : c.id)}>
              <img src={c.preview} alt={c.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-accent/10 text-accent text-xs font-medium px-2 py-0.5 rounded-full border border-accent/20 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Approved</div>
            </div>
            <div className="p-3">
              <p className="font-semibold text-sm truncate">{c.name}</p>
              <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5"><Building2 className="w-3 h-3" />{c.advertiser}</div>
              <p className="text-xs text-foreground/40 mt-0.5">{c.hoarding}</p>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className={`px-2 py-0.5 rounded font-medium ${formatColors[c.format]}`}>{c.format}</span>
                <span className="text-foreground/40">{c.fileSize}</span>
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <div className="flex items-center gap-1.5 text-foreground/40"><Calendar className="w-3 h-3" />{c.approvedOn}</div>
                <span className="text-foreground/40">by {c.approvedBy}</span>
              </div>
            </div>

            {preview === c.id && (
              <div className="border-t border-stone-100 p-3 bg-stone-50">
                <img src={c.preview} alt={c.name} className="w-full rounded-xl" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
