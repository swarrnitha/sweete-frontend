'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Download, Image, Building2, Calendar, FileText, Archive, ChevronDown, ChevronUp } from 'lucide-react';

const files = [
  { id: 1, name: 'Summer Sale Banner', advertiser: 'AdShack Media Pvt Ltd', hoarding: 'Marine Drive Premium', format: 'JPEG', size: '1920x1080', fileSize: '2.4 MB', approvedOn: '2026-07-16', downloads: 3, url: '#' },
  { id: 3, name: 'VisionAds Digital Creative', advertiser: 'VisionAds Inc', hoarding: 'Jubilee Hills Display', format: 'MP4', size: '1920x1080', fileSize: '12.5 MB', approvedOn: '2026-07-13', downloads: 5, url: '#' },
  { id: 7, name: 'AdShack Festive Campaign', advertiser: 'AdShack Media Pvt Ltd', hoarding: 'Marine Drive Premium', format: 'PNG', size: '3840x2160', fileSize: '6.2 MB', approvedOn: '2026-07-11', downloads: 2, url: '#' },
  { id: 8, name: 'Pune Outdoor Monsoon Ad', advertiser: 'Pune Outdoor Solutions', hoarding: 'FC Road Billboard', format: 'JPEG', size: '1920x1080', fileSize: '2.8 MB', approvedOn: '2026-07-09', downloads: 7, url: '#' },
  { id: 10, name: 'BrandWave Q3 Campaign', advertiser: 'BrandWave Solutions', hoarding: 'BKC Junction', format: 'PNG', size: '3840x2160', fileSize: '4.8 MB', approvedOn: '2026-07-16', downloads: 1, url: '#' },
];

const formatColors: Record<string, string> = {
  JPEG: 'bg-blue-50 text-blue-700',
  PNG: 'bg-purple-50 text-purple-700',
  MP4: 'bg-rose-50 text-rose-700',
  PDF: 'bg-orange-50 text-orange-700',
};

export default function DownloadPage() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const downloadSingle = (name: string, format: string) => {
    toast.success(`Downloading "${name}.${format.toLowerCase()}"...`);
  };

  const downloadSelected = () => {
    if (selected.length === 0) { toast.error('Select at least one file.'); return; }
    toast.success(`Downloading ${selected.length} file(s) as ZIP...`);
  };

  const downloadAll = () => {
    toast.success('Downloading all files as ZIP archive...');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Download Artwork</h1>
        <p className="text-foreground/50 text-sm">{files.length} approved files available for download</p>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={downloadSelected} className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5">
          <Archive className="w-4 h-4" /> Download Selected ({selected.length})
        </button>
        <button onClick={downloadAll} className="px-4 py-2.5 border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors flex items-center gap-1.5">
          <Archive className="w-4 h-4" /> Download All
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 w-10"><input type="checkbox" onChange={e => setSelected(e.target.checked ? files.map(f => f.id) : [])} checked={selected.length === files.length && files.length > 0} className="w-4 h-4 rounded border-stone-300 text-primary focus:ring-primary" /></th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">File</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Advertiser</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Hoarding</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Format</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Size</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Downloads</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Action</th>
          </tr></thead>
          <tbody>
            {files.map(f => (
              <tr key={f.id} className={`border-b border-stone-100 hover:bg-stone-50 transition-colors ${selected.includes(f.id) ? 'bg-primary/5' : ''}`}>
                <td className="p-3"><input type="checkbox" checked={selected.includes(f.id)} onChange={() => toggle(f.id)} className="w-4 h-4 rounded border-stone-300 text-primary focus:ring-primary" /></td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-foreground/30" />
                    <span className="text-sm font-medium">{f.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-foreground/40 mt-0.5"><Calendar className="w-3 h-3" />{f.approvedOn}</div>
                </td>
                <td className="p-3 text-sm text-foreground/60"><div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-foreground/30" />{f.advertiser}</div></td>
                <td className="p-3 text-sm text-foreground/60">{f.hoarding}</td>
                <td className="p-3"><span className={`text-xs font-medium px-2 py-0.5 rounded ${formatColors[f.format]}`}>{f.format}</span></td>
                <td className="p-3 text-sm text-foreground/60">{f.fileSize}</td>
                <td className="p-3 text-sm text-foreground/60">{f.downloads}x</td>
                <td className="p-3 text-right">
                  <button onClick={() => downloadSingle(f.name, f.format)} className="p-1.5 rounded-lg text-primary hover:bg-primary/5 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
