'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Download, FileText, Calendar, Filter, IndianRupee, Building2, MapPin } from 'lucide-react';

const reportTypes = [
  { id: 'revenue', label: 'Revenue Report', desc: 'Monthly revenue breakdown with growth metrics', icon: IndianRupee },
  { id: 'occupancy', label: 'Occupancy Report', desc: 'City-wise occupancy rates and trends', icon: MapPin },
  { id: 'advertiser', label: 'Advertiser Report', desc: 'Top advertisers and spending summary', icon: Building2 },
  { id: 'hoarding', label: 'Hoarding Performance', desc: 'Views, revenue, and booking frequency', icon: FileText },
];

export default function ExportPage() {
  const [selected, setSelected] = useState('revenue');
  const [format, setFormat] = useState<'pdf' | 'csv'>('pdf');
  const [dateRange, setDateRange] = useState('2026-Q2');
  const [cityFilter, setCityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const exportReport = () => {
    const typeLabel = reportTypes.find(r => r.id === selected)?.label;
    toast.success(`Exporting "${typeLabel}" as ${format.toUpperCase()} for ${dateRange}...`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Export Reports</h1>
        <p className="text-foreground/50 text-sm">Generate and download reports in PDF or CSV format</p>
      </div>

      <div className="max-w-2xl space-y-5">
        {/* Report Type */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Report Type</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {reportTypes.map(r => (
              <button key={r.id} onClick={() => setSelected(r.id)} className={`p-4 rounded-xl border text-left transition-colors ${selected === r.id ? 'border-primary bg-primary/5' : 'border-stone-200 hover:border-stone-300'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <r.icon className={`w-4 h-4 ${selected === r.id ? 'text-primary' : 'text-foreground/30'}`} />
                  <span className={`text-sm font-semibold ${selected === r.id ? 'text-primary' : ''}`}>{r.label}</span>
                </div>
                <p className="text-xs text-foreground/40">{r.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Filters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1">Date Range</label>
              <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm">
                <option>2026-Q2 (Apr-Jun)</option>
                <option>2026-Q1 (Jan-Mar)</option>
                <option>2025-Q4 (Oct-Dec)</option>
                <option>2025-Q3 (Jul-Sep)</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">City</label>
              <select value={cityFilter} onChange={e => setCityFilter(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm">
                <option value="all">All Cities</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
                <option>Pune</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Status</label>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm">
                <option value="all">All Status</option>
                <option>Active</option>
                <option>Occupied</option>
                <option>Available</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Export Format & Action */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">Export Format</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button onClick={() => setFormat('pdf')} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${format === 'pdf' ? 'bg-primary text-white' : 'bg-stone-100 text-foreground/60 hover:bg-stone-200'}`}>PDF</button>
              <button onClick={() => setFormat('csv')} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${format === 'csv' ? 'bg-primary text-white' : 'bg-stone-100 text-foreground/60 hover:bg-stone-200'}`}>CSV</button>
            </div>
            <button onClick={exportReport} className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5 ml-auto">
              <Download className="w-4 h-4" /> Generate Report
            </button>
          </div>
        </div>

        {/* Recent Exports */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <h2 className="font-semibold mb-3">Recent Exports</h2>
          <div className="space-y-2">
            {[
              { name: 'Revenue Report Q2 2026', format: 'PDF', date: '2026-07-15', size: '2.4 MB' },
              { name: 'Occupancy Report Jun 2026', format: 'CSV', date: '2026-07-10', size: '845 KB' },
              { name: 'Advertiser Report Q2 2026', format: 'PDF', date: '2026-07-05', size: '1.8 MB' },
            ].map((exp, i) => (
              <div key={i} className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-foreground/30" />
                  <div>
                    <p className="text-sm font-medium">{exp.name}</p>
                    <div className="flex items-center gap-3 text-xs text-foreground/40">
                      <span>{exp.format}</span>
                      <span>{exp.date}</span>
                      <span>{exp.size}</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => toast.success(`Downloading "${exp.name}"...`)} className="p-1.5 rounded-lg text-primary hover:bg-primary/5 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
