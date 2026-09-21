'use client';
import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import { Search, Edit2, Trash2, Building2, Mail, Phone, BadgeCheck, Ban } from 'lucide-react';

const initial = [
  { id: 1, company: 'AdShack Media Pvt Ltd', contact: 'Rahul Sharma', email: 'rahul@adshack.com', phone: '+91 98765 43210', city: 'Mumbai', subscription: 'Premium', status: 'Active', hoardings: 12, joined: '2025-11-01' },
  { id: 2, company: 'BrandWave Solutions', contact: 'Priya Patel', email: 'priya@brandwave.co', phone: '+91 87654 32109', city: 'Delhi', subscription: 'Professional', status: 'Active', hoardings: 8, joined: '2026-01-15' },
  { id: 3, company: 'VisionAds Inc', contact: 'Amit Verma', email: 'amit@visionads.in', phone: '+91 76543 21098', city: 'Bangalore', subscription: 'Premium', status: 'Active', hoardings: 15, joined: '2025-09-20' },
  { id: 4, company: 'TechAds Agency', contact: 'Sneha Reddy', email: 'sneha@techads.com', phone: '+91 65432 10987', city: 'Hyderabad', subscription: 'Starter', status: 'Pending', hoardings: 0, joined: '2026-07-18' },
  { id: 5, company: 'Jaipur Media Group', contact: 'Vikram Singh', email: 'vikram@jaipurmedia.in', phone: '+91 54321 09876', city: 'Jaipur', subscription: 'Starter', status: 'Pending', hoardings: 2, joined: '2026-07-19' },
  { id: 6, company: 'DigiSigns Pvt Ltd', contact: 'Karan Mehta', email: 'karan@digisigns.com', phone: '+91 43210 98765', city: 'Bangalore', subscription: 'Professional', status: 'Suspended', hoardings: 5, joined: '2026-03-01' },
  { id: 7, company: 'Outdoor Media Co', contact: 'Neha Gupta', email: 'neha@outdoormedia.co', phone: '+91 32109 87654', city: 'Chennai', subscription: 'Basic', status: 'Active', hoardings: 3, joined: '2026-04-10' },
  { id: 8, company: 'Pune Outdoor Solutions', contact: 'Raj Deshmukh', email: 'raj@puneoutdoor.com', phone: '+91 21098 76543', city: 'Pune', subscription: 'Professional', status: 'Active', hoardings: 7, joined: '2026-02-20' },
];

const statusStyles: Record<string, string> = {
  Active: 'bg-accent/10 text-accent border-accent/20',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Suspended: 'bg-red-50 text-red-700 border-red-200',
};

const subscriptionStyles: Record<string, string> = {
  Premium: 'bg-purple-50 text-purple-700 border-purple-200',
  Professional: 'bg-blue-50 text-blue-700 border-blue-200',
  Starter: 'bg-stone-100 text-stone-600 border-stone-200',
  Basic: 'bg-green-50 text-green-700 border-green-200',
};

export default function AllUsersPage() {
  const [advertisers, setAdvertisers] = useState(initial);
  const [search, setSearch] = useState('');
  const [subFilter, setSubFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => advertisers.filter(a => {
    if (search && !a.company.toLowerCase().includes(search.toLowerCase()) && !a.contact.toLowerCase().includes(search.toLowerCase()) && !a.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (subFilter && a.subscription !== subFilter) return false;
    if (statusFilter && a.status !== statusFilter) return false;
    return true;
  }), [search, subFilter, statusFilter]);

  const remove = (id: number, name: string) => {
    setAdvertisers(prev => prev.filter(a => a.id !== id));
    toast.success(`"${name}" removed.`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">All Advertisers</h1>
        <p className="text-foreground/50 text-sm">{filtered.length} advertisers</p>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input type="text" placeholder="Search by company, contact, email..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
        <select value={subFilter} onChange={e => setSubFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm">
          <option value="">All Plans</option>
          <option>Premium</option>
          <option>Professional</option>
          <option>Starter</option>
          <option>Basic</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-xl border border-stone-200 bg-white text-sm">
          <option value="">All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Suspended</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Company</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Contact</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Email</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Subscription</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Status</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Hoardings</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Actions</th>
          </tr></thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                <td className="p-3 text-sm font-medium"><div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-foreground/30" />{a.company}</div></td>
                <td className="p-3 text-sm">{a.contact}<br /><span className="text-xs text-foreground/40">{a.phone}</span></td>
                <td className="p-3 text-sm text-foreground/60"><div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-foreground/30" />{a.email}</div></td>
                <td className="p-3"><span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${subscriptionStyles[a.subscription]}`}>{a.subscription}</span></td>
                <td className="p-3"><span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusStyles[a.status]}`}>{a.status}</span></td>
                <td className="p-3 text-sm text-foreground/60">{a.hoardings}</td>
                <td className="p-3 text-right"><div className="flex items-center justify-end gap-1">
                  <button onClick={() => toast.success(`Edit "${a.company}"`)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => remove(a.id, a.company)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        {filtered.length === 0 && <div className="text-center py-12 text-foreground/40 text-sm">No advertisers match your filters.</div>}
      </div>
    </div>
  );
}
