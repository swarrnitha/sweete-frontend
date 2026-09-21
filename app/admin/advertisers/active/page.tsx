'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Search, Building2, Mail, Phone, MapPin, BadgeCheck, Ban } from 'lucide-react';

const activeAdvertisers = [
  { id: 1, company: 'AdShack Media Pvt Ltd', contact: 'Rahul Sharma', email: 'rahul@adshack.com', phone: '+91 98765 43210', city: 'Mumbai', subscription: 'Premium', hoardings: 12, spent: '₹8,50,000', joined: '2025-11-01' },
  { id: 2, company: 'BrandWave Solutions', contact: 'Priya Patel', email: 'priya@brandwave.co', phone: '+91 87654 32109', city: 'Delhi', subscription: 'Professional', hoardings: 8, spent: '₹4,20,000', joined: '2026-01-15' },
  { id: 3, company: 'VisionAds Inc', contact: 'Amit Verma', email: 'amit@visionads.in', phone: '+91 76543 21098', city: 'Bangalore', subscription: 'Premium', hoardings: 15, spent: '₹12,00,000', joined: '2025-09-20' },
  { id: 7, company: 'Outdoor Media Co', contact: 'Neha Gupta', email: 'neha@outdoormedia.co', phone: '+91 32109 87654', city: 'Chennai', subscription: 'Basic', hoardings: 3, spent: '₹1,20,000', joined: '2026-04-10' },
  { id: 8, company: 'Pune Outdoor Solutions', contact: 'Raj Deshmukh', email: 'raj@puneoutdoor.com', phone: '+91 21098 76543', city: 'Pune', subscription: 'Professional', hoardings: 7, spent: '₹3,80,000', joined: '2026-02-20' },
];

const subscriptionStyles: Record<string, string> = {
  Premium: 'bg-purple-50 text-purple-700 border-purple-200',
  Professional: 'bg-blue-50 text-blue-700 border-blue-200',
  Starter: 'bg-stone-100 text-stone-600 border-stone-200',
  Basic: 'bg-green-50 text-green-700 border-green-200',
};

export default function ActivePage() {
  const [search, setSearch] = useState('');

  const filtered = activeAdvertisers.filter(a =>
    !search || a.company.toLowerCase().includes(search.toLowerCase()) || a.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Active Advertisers</h1>
        <p className="text-foreground/50 text-sm">{filtered.length} active advertisers</p>
      </div>

      <div className="flex gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
          <input type="text" placeholder="Search active advertisers..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(a => (
          <div key={a.id} className="bg-white rounded-2xl border border-stone-200 p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <p className="font-semibold text-sm">{a.company}</p>
                  <p className="text-xs text-foreground/50 mt-0.5">{a.contact}</p>
                  <div className="flex items-center gap-1.5 text-xs text-foreground/40 mt-0.5"><MapPin className="w-3 h-3" />{a.city}</div>
                </div>
                <div>
                  <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Contact</p>
                  <div className="flex items-center gap-1.5 text-xs"><Mail className="w-3 h-3 text-foreground/30" />{a.email}</div>
                  <div className="flex items-center gap-1.5 text-xs mt-0.5"><Phone className="w-3 h-3 text-foreground/30" />{a.phone}</div>
                </div>
                <div>
                  <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Subscription &amp; Spend</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${subscriptionStyles[a.subscription]}`}>{a.subscription}</span>
                  <p className="text-xs text-foreground/50 mt-1">Spent: {a.spent}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Hoardings</p>
                  <p className="text-2xl font-bold text-primary">{a.hoardings}</p>
                  <p className="text-xs text-foreground/40 mt-0.5">Since {a.joined}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
