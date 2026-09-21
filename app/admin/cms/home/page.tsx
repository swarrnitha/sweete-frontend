'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Image, Type, AlignLeft } from 'lucide-react';

export default function HomeCMSPage() {
  const [hero, setHero] = useState({
    title: 'Premium Hoarding Spaces for Your Brand',
    subtitle: 'Discover prime outdoor advertising locations across India\'s top cities. Book premium hoardings, billboards, and digital displays.',
    ctaText: 'Explore Hoardings',
    image: 'https://picsum.photos/seed/hero-banner/1200/600',
  });

  const [sections, setSections] = useState([
    { id: 1, name: 'Featured Locations', visible: true, order: 1 },
    { id: 2, name: 'Available Hoardings', visible: true, order: 2 },
    { id: 3, name: 'How It Works', visible: true, order: 3 },
    { id: 4, name: 'Why 100MM', visible: true, order: 4 },
    { id: 5, name: 'Pricing', visible: true, order: 5 },
    { id: 6, name: 'Testimonials', visible: true, order: 6 },
    { id: 7, name: 'FAQ', visible: true, order: 7 },
  ]);

  const save = () => {
    toast.success('Homepage content saved!');
  };

  const toggleSection = (id: number) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">Homepage Editor</h1><p className="text-foreground/50 text-sm">Edit hero banner and manage section visibility</p></div>
        <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Changes</button>
      </div>

      <div className="max-w-3xl space-y-5">
        {/* Hero Banner */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Image className="w-5 h-5 text-primary" /><h2 className="font-semibold">Hero Banner</h2></div>
          <div className="space-y-4">
            <div><label className="block text-xs font-medium mb-1">Title</label><input type="text" value={hero.title} onChange={e => setHero(p => ({ ...p, title: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div><label className="block text-xs font-medium mb-1">Subtitle</label><textarea rows={2} value={hero.subtitle} onChange={e => setHero(p => ({ ...p, subtitle: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium mb-1">CTA Button Text</label><input type="text" value={hero.ctaText} onChange={e => setHero(p => ({ ...p, ctaText: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
              <div><label className="block text-xs font-medium mb-1">Hero Image URL</label><input type="url" value={hero.image} onChange={e => setHero(p => ({ ...p, image: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            </div>
            <img src={hero.image} alt="Hero preview" className="w-full h-40 object-cover rounded-xl" />
          </div>
        </div>

        {/* Sections */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><AlignLeft className="w-5 h-5 text-primary" /><h2 className="font-semibold">Section Visibility</h2></div>
          <div className="space-y-2">
            {sections.sort((a, b) => a.order - b.order).map(s => (
              <div key={s.id} className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center">{s.order}</span>
                  <span className="text-sm font-medium">{s.name}</span>
                </div>
                <button onClick={() => toggleSection(s.id)} className={`relative w-10 h-5 rounded-full transition-colors ${s.visible ? 'bg-primary' : 'bg-stone-300'}`}>
                  <div className={`absolute w-4 h-4 bg-white rounded-full top-0.5 transition-transform ${s.visible ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
