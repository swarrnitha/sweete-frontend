'use client';
import { useState } from 'react';
import { Image, Building2, Calendar, Eye } from 'lucide-react';

const creatives = [
  { id: 1, name: 'Summer Sale Banner', advertiser: 'AdShack Media Pvt Ltd', hoarding: 'Marine Drive Premium', format: 'JPEG', size: '1920x1080', fileSize: '2.4 MB', uploadedOn: '2026-07-15', preview: 'https://picsum.photos/seed/summer-sale/400/225', status: 'Approved' },
  { id: 2, name: 'BrandWave Q3 Campaign', advertiser: 'BrandWave Solutions', hoarding: 'BKC Junction', format: 'PNG', size: '3840x2160', fileSize: '4.8 MB', uploadedOn: '2026-07-14', preview: 'https://picsum.photos/seed/brandwave-q3/400/225', status: 'Pending' },
  { id: 3, name: 'VisionAds Digital Creative', advertiser: 'VisionAds Inc', hoarding: 'Jubilee Hills Display', format: 'MP4', size: '1920x1080', fileSize: '12.5 MB', uploadedOn: '2026-07-12', preview: 'https://picsum.photos/seed/visionads/400/225', status: 'Approved' },
  { id: 4, name: 'Pune Outdoor Festive Ad', advertiser: 'Pune Outdoor Solutions', hoarding: 'FC Road Billboard', format: 'JPEG', size: '1920x1080', fileSize: '3.1 MB', uploadedOn: '2026-07-10', preview: 'https://picsum.photos/seed/festive-ad/400/225', status: 'Rejected' },
  { id: 5, name: 'Outdoor Media Co Promo', advertiser: 'Outdoor Media Co', hoarding: 'Anna Nagar Tower', format: 'PNG', size: '1920x1080', fileSize: '1.8 MB', uploadedOn: '2026-07-08', preview: 'https://picsum.photos/seed/outdoor-promo/400/225', status: 'Pending' },
  { id: 6, name: 'TechAds Agency Launch', advertiser: 'TechAds Agency', hoarding: 'Sarjapur Road Hoarding', format: 'PDF', size: '2480x3508', fileSize: '5.2 MB', uploadedOn: '2026-07-18', preview: 'https://picsum.photos/seed/techads-launch/400/225', status: 'Pending' },
];

const statusStyles: Record<string, string> = {
  Approved: 'bg-accent/10 text-accent border-accent/20',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Rejected: 'bg-red-50 text-red-700 border-red-200',
};

const formatColors: Record<string, string> = {
  JPEG: 'bg-blue-50 text-blue-700',
  PNG: 'bg-purple-50 text-purple-700',
  MP4: 'bg-rose-50 text-rose-700',
  PDF: 'bg-orange-50 text-orange-700',
};

export default function UploadedPage() {
  const [preview, setPreview] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Uploaded Artwork</h1>
        <p className="text-foreground/50 text-sm">{creatives.length} creative files uploaded</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {creatives.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-40 bg-stone-100 cursor-pointer" onClick={() => setPreview(preview === c.id ? null : c.id)}>
              <img src={c.preview} alt={c.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                <Eye className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
              </div>
              <span className={`absolute top-2 right-2 text-xs font-medium px-2 py-0.5 rounded-full border ${statusStyles[c.status]}`}>{c.status}</span>
            </div>
            <div className="p-3">
              <p className="font-semibold text-sm truncate">{c.name}</p>
              <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5"><Building2 className="w-3 h-3" />{c.advertiser}</div>
              <div className="flex items-center gap-2 mt-2 text-xs">
                <span className={`px-2 py-0.5 rounded font-medium ${formatColors[c.format]}`}>{c.format}</span>
                <span className="text-foreground/40">{c.size}</span>
                <span className="text-foreground/40">{c.fileSize}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-foreground/40 mt-1.5"><Calendar className="w-3 h-3" />{c.uploadedOn}</div>
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
