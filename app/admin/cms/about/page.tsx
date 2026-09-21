'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Image, Building2 } from 'lucide-react';

export default function AboutCMSPage() {
  const [content, setContent] = useState({
    companyName: '100MM',
    tagline: 'India\'s Premier Outdoor Advertising Marketplace',
    description: '100MM is a cutting-edge platform that connects advertisers with premium hoarding spaces across India\'s most coveted locations. From the bustling streets of Mumbai to the corporate hubs of Bangalore, we provide end-to-end booking, creative management, and performance tracking for outdoor advertising campaigns.',
    mission: 'To revolutionize outdoor advertising by making premium hoarding spaces accessible, transparent, and data-driven for businesses of all sizes.',
    vision: 'To become India\'s most trusted outdoor advertising marketplace, powering 10,000+ hoardings across 50+ cities by 2030.',
    image: 'https://picsum.photos/seed/about-hoardify/800/400',
    founded: '2025',
    teamSize: '48+',
    cities: '12+',
    hoardings: '450+',
  });

  const save = () => toast.success('About page updated!');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">About Page Editor</h1><p className="text-foreground/50 text-sm">Edit company details and brand story</p></div>
        <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Changes</button>
      </div>

      <div className="max-w-3xl space-y-5">
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Building2 className="w-5 h-5 text-primary" /><h2 className="font-semibold">Company Details</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-xs font-medium mb-1">Company Name</label><input type="text" value={content.companyName} onChange={e => setContent(p => ({ ...p, companyName: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div><label className="block text-xs font-medium mb-1">Tagline</label><input type="text" value={content.tagline} onChange={e => setContent(p => ({ ...p, tagline: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
          </div>
          <div className="mb-4"><label className="block text-xs font-medium mb-1">Description</label><textarea rows={3} value={content.description} onChange={e => setContent(p => ({ ...p, description: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-xs font-medium mb-1">Mission</label><textarea rows={2} value={content.mission} onChange={e => setContent(p => ({ ...p, mission: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" /></div>
            <div><label className="block text-xs font-medium mb-1">Vision</label><textarea rows={2} value={content.vision} onChange={e => setContent(p => ({ ...p, vision: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div><label className="block text-xs font-medium mb-1">Founded</label><input type="text" value={content.founded} onChange={e => setContent(p => ({ ...p, founded: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">Team Size</label><input type="text" value={content.teamSize} onChange={e => setContent(p => ({ ...p, teamSize: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">Cities</label><input type="text" value={content.cities} onChange={e => setContent(p => ({ ...p, cities: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">Hoardings</label><input type="text" value={content.hoardings} onChange={e => setContent(p => ({ ...p, hoardings: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
          </div>
          <div><label className="block text-xs font-medium mb-1">Image URL</label><input type="url" value={content.image} onChange={e => setContent(p => ({ ...p, image: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
          <img src={content.image} alt="Preview" className="w-full h-40 object-cover rounded-xl mt-3" />
        </div>
      </div>
    </div>
  );
}
