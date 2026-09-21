'use client';
import { useState } from 'react';
import { Image, Building2, Calendar, Eye, XCircle, AlertTriangle, MapPin } from 'lucide-react';

const rejected = [
  { id: 4, name: 'Pune Outdoor Festive Ad', advertiser: 'Pune Outdoor Solutions', contact: 'Raj Deshmukh', hoarding: 'FC Road Billboard', format: 'JPEG', size: '1920x1080', fileSize: '3.1 MB', uploadedOn: '2026-07-10', rejectedOn: '2026-07-11', rejectedBy: 'Admin User', preview: 'https://picsum.photos/seed/festive-ad/400/225', reason: 'Resolution too low for billboard size (22x11 ft). Minimum requirement is 3840x2160 pixels. Please upload a higher resolution version.' },
  { id: 9, name: 'Jaipur Media Holi Campaign', advertiser: 'Jaipur Media Group', contact: 'Vikram Singh', hoarding: 'C Scheme Signage', format: 'PDF', size: '2480x3508', fileSize: '4.5 MB', uploadedOn: '2026-07-17', rejectedOn: '2026-07-18', rejectedBy: 'Admin User', preview: 'https://picsum.photos/seed/holi-campaign/400/225', reason: 'Design does not comply with municipal advertising guidelines — content contains prohibited imagery. Please revise and re-submit.' },
];

const formatColors: Record<string, string> = {
  JPEG: 'bg-blue-50 text-blue-700',
  PNG: 'bg-purple-50 text-purple-700',
  MP4: 'bg-rose-50 text-rose-700',
  PDF: 'bg-orange-50 text-orange-700',
};

export default function RejectedPage() {
  const [preview, setPreview] = useState<number | null>(null);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Rejected Creatives</h1>
        <p className="text-foreground/50 text-sm">{rejected.length} rejected creatives</p>
      </div>

      <div className="space-y-4">
        {rejected.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-red-200 overflow-hidden">
            <div className="p-4">
              <div className="flex gap-4">
                <div className="w-32 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0 cursor-pointer" onClick={() => setPreview(preview === c.id ? null : c.id)}>
                  <img src={c.preview} alt={c.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 min-w-0 grid md:grid-cols-3 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <p className="font-semibold text-sm">{c.name}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5"><Building2 className="w-3 h-3" />{c.advertiser}</div>
                    <p className="text-xs text-foreground/40 mt-0.5">{c.contact}</p>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/40 mt-0.5"><MapPin className="w-3 h-3" />{c.hoarding}</div>
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className={`px-2 py-0.5 rounded font-medium ${formatColors[c.format]}`}>{c.format}</span>
                      <span className="text-foreground/40">{c.fileSize}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Rejection Reason
                    </p>
                    <div className="bg-red-50 rounded-xl p-3">
                      <p className="text-sm text-red-800">{c.reason}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-xs text-foreground/40 justify-end"><Calendar className="w-3 h-3" />Uploaded: {c.uploadedOn}</div>
                    <div className="flex items-center gap-1.5 text-xs text-foreground/40 justify-end mt-0.5"><XCircle className="w-3 h-3 text-red-400" />Rejected: {c.rejectedOn}</div>
                    <p className="text-xs text-foreground/40 mt-0.5">by {c.rejectedBy}</p>
                    <button onClick={() => setPreview(preview === c.id ? null : c.id)} className="mt-3 text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 ml-auto"><Eye className="w-3.5 h-3.5" /> {preview === c.id ? 'Hide' : 'View'} Preview</button>
                  </div>
                </div>
              </div>
            </div>

            {preview === c.id && (
              <div className="border-t border-stone-100 bg-stone-50 p-4">
                <img src={c.preview} alt={c.name} className="w-full max-w-lg rounded-xl mx-auto" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
