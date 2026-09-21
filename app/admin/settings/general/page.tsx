'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Building2, Globe, Clock, Image } from 'lucide-react';

export default function GeneralPage() {
  const [form, setForm] = useState({
    companyName: '100MM',
    tagline: 'Premium Hoarding Spaces for Your Brand',
    logo: 'https://picsum.photos/seed/hoardify-logo/200/80',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
    weekStart: 'Monday',
    language: 'English',
    supportEmail: 'support@hoardify.com',
    supportPhone: '+91 1800 123 4567',
  });

  const save = () => toast.success('General settings saved!');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">General Settings</h1><p className="text-foreground/50 text-sm">Company information, logo, timezone, and currency</p></div>
        <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Save className="w-4 h-4" /> Save</button>
      </div>

      <div className="max-w-3xl space-y-5">
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Building2 className="w-5 h-5 text-primary" /><h2 className="font-semibold">Company Information</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium mb-1">Company Name</label><input type="text" value={form.companyName} onChange={e => setForm(p => ({ ...p, companyName: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">Tagline</label><input type="text" value={form.tagline} onChange={e => setForm(p => ({ ...p, tagline: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
          </div>
          <div className="mt-4"><label className="block text-xs font-medium mb-1">Logo URL</label>
            <div className="flex items-center gap-3">
              <input type="url" value={form.logo} onChange={e => setForm(p => ({ ...p, logo: e.target.value }))} className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" />
              <img src={form.logo} alt="Logo" className="w-16 h-8 object-contain rounded-lg border border-stone-200" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Globe className="w-5 h-5 text-primary" /><h2 className="font-semibold">Regional Settings</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label className="block text-xs font-medium mb-1">Timezone</label><select value={form.timezone} onChange={e => setForm(p => ({ ...p, timezone: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"><option>Asia/Kolkata</option><option>Asia/Dubai</option><option>Asia/Singapore</option><option>UTC</option></select></div>
            <div><label className="block text-xs font-medium mb-1">Currency</label><select value={form.currency} onChange={e => setForm(p => ({ ...p, currency: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"><option>INR (₹)</option><option>USD ($)</option><option>AED (د.إ)</option><option>SGD (S$)</option></select></div>
            <div><label className="block text-xs font-medium mb-1">Date Format</label><select value={form.dateFormat} onChange={e => setForm(p => ({ ...p, dateFormat: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select></div>
            <div><label className="block text-xs font-medium mb-1">Week Starts On</label><select value={form.weekStart} onChange={e => setForm(p => ({ ...p, weekStart: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"><option>Monday</option><option>Sunday</option><option>Saturday</option></select></div>
            <div><label className="block text-xs font-medium mb-1">Language</label><select value={form.language} onChange={e => setForm(p => ({ ...p, language: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm"><option>English</option><option>Hindi</option><option>Marathi</option></select></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Clock className="w-5 h-5 text-primary" /><h2 className="font-semibold">Support Contact</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-xs font-medium mb-1">Support Email</label><input type="email" value={form.supportEmail} onChange={e => setForm(p => ({ ...p, supportEmail: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">Support Phone</label><input type="text" value={form.supportPhone} onChange={e => setForm(p => ({ ...p, supportPhone: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
