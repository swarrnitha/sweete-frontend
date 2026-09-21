'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Search, FileText, Globe, RefreshCw } from 'lucide-react';

export default function SEOSettingsPage() {
  const [meta, setMeta] = useState({
    home: { title: '100MM — Premium Outdoor Advertising Hoarding Booking Platform', description: 'Discover and book premium hoarding spaces across India\'s top cities. Browse billboards, digital displays, and banner ads for your brand.', keywords: 'outdoor advertising, hoarding booking, billboard rental, digital signage, outdoor media India' },
    about: { title: 'About Us — Hoardify', description: 'Learn about 100MM, India\'s premier outdoor advertising marketplace connecting brands with premium hoarding spaces.', keywords: 'about hoardify, outdoor advertising company, digital signage India' },
    explore: { title: 'Explore Hoardings — Hoardify', description: 'Browse available hoarding spaces across Mumbai, Delhi, Bangalore, and more. Filter by city, size, and price.', keywords: 'hoardings for rent, billboard booking, outdoor advertising spaces' },
  });

  const [global, setGlobal] = useState({
    ogImage: 'https://picsum.photos/seed/hoardify-og/1200/630',
    favicon: '/favicon.ico',
    googleAnalytics: 'G-XXXXXXXXXX',
    enableSitemap: true,
    enableRobots: true,
  });

  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'explore'>('home');

  const save = () => toast.success('SEO settings saved!');
  const generateSitemap = () => toast.success('Sitemap regenerated!');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">SEO Settings</h1><p className="text-foreground/50 text-sm">Meta tags, keywords, and sitemap configuration</p></div>
        <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Changes</button>
      </div>

      <div className="max-w-3xl space-y-5">
        {/* Page Meta Tags */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><FileText className="w-5 h-5 text-primary" /><h2 className="font-semibold">Page Meta Tags</h2></div>
          <div className="flex gap-1 mb-4 bg-stone-100 rounded-lg p-1 w-fit">
            {(['home', 'about', 'explore'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-white shadow-sm' : 'text-foreground/50 hover:text-foreground'}`}>{tab}</button>
            ))}
          </div>
          <div className="space-y-3">
            <div><label className="block text-xs font-medium mb-1">Meta Title</label><input type="text" value={meta[activeTab].title} onChange={e => setMeta(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], title: e.target.value } }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            <div><label className="block text-xs font-medium mb-1">Meta Description</label><textarea rows={2} value={meta[activeTab].description} onChange={e => setMeta(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], description: e.target.value } }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" /></div>
            <div><label className="block text-xs font-medium mb-1">Keywords (comma separated)</label><input type="text" value={meta[activeTab].keywords} onChange={e => setMeta(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], keywords: e.target.value } }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
          </div>
        </div>

        {/* Global Settings */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Globe className="w-5 h-5 text-primary" /><h2 className="font-semibold">Global SEO Settings</h2></div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium mb-1">OG Image URL</label><input type="url" value={global.ogImage} onChange={e => setGlobal(p => ({ ...p, ogImage: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
              <div><label className="block text-xs font-medium mb-1">Favicon Path</label><input type="text" value={global.favicon} onChange={e => setGlobal(p => ({ ...p, favicon: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
            </div>
            <div><label className="block text-xs font-medium mb-1">Google Analytics ID</label><input type="text" value={global.googleAnalytics} onChange={e => setGlobal(p => ({ ...p, googleAnalytics: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm" /></div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={global.enableSitemap} onChange={e => setGlobal(p => ({ ...p, enableSitemap: e.target.checked }))} className="w-4 h-4 rounded border-stone-300 text-primary" /> Enable XML Sitemap</label>
              <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={global.enableRobots} onChange={e => setGlobal(p => ({ ...p, enableRobots: e.target.checked }))} className="w-4 h-4 rounded border-stone-300 text-primary" /> Enable robots.txt</label>
            </div>
          </div>
        </div>

        {/* Sitemap Actions */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Search className="w-5 h-5 text-primary" /><h2 className="font-semibold">Sitemap</h2></div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-foreground/60">Current sitemap URL: <code className="text-primary bg-primary/5 px-2 py-0.5 rounded text-xs">/sitemap.xml</code></p>
            <button onClick={generateSitemap} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><RefreshCw className="w-4 h-4" /> Regenerate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
