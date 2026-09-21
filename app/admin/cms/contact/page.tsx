'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';

export default function ContactCMSPage() {
  const [content, setContent] = useState({
    email: 'hello@hoardify.com',
    phone: '+91 1800 123 4567',
    address: 'Bandra Kurla Complex, Mumbai, Maharashtra 400051, India',
    mapEmbed: 'https://maps.google.com/?q=Bandra+Kurla+Complex+Mumbai',
    socialLinks: [
      { platform: 'Facebook', url: 'https://facebook.com/hoardify' },
      { platform: 'Instagram', url: 'https://instagram.com/hoardify' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/hoardify' },
      { platform: 'Twitter', url: 'https://twitter.com/hoardify' },
    ],
  });

  const [editingSocial, setEditingSocial] = useState<{ platform: string; url: string }>({ platform: '', url: '' });
  const [showSocialForm, setShowSocialForm] = useState(false);

  const save = () => toast.success('Contact details saved!');

  const addSocial = () => {
    if (!editingSocial.platform || !editingSocial.url) { toast.error('Platform and URL are required.'); return; }
    setContent(prev => ({ ...prev, socialLinks: [...prev.socialLinks, editingSocial] }));
    setEditingSocial({ platform: '', url: '' });
    setShowSocialForm(false);
    toast.success('Social link added.');
  };

  const removeSocial = (platform: string) => {
    setContent(prev => ({ ...prev, socialLinks: prev.socialLinks.filter(s => s.platform !== platform) }));
    toast.success(`"${platform}" removed.`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">Contact Page Editor</h1><p className="text-foreground/50 text-sm">Edit contact details, social links, and map</p></div>
        <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Changes</button>
      </div>

      <div className="max-w-3xl space-y-5">
        {/* Contact Details */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center gap-2 mb-4"><Mail className="w-5 h-5 text-primary" /><h2 className="font-semibold">Contact Details</h2></div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium mb-1">Email</label><input type="email" value={content.email} onChange={e => setContent(p => ({ ...p, email: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
              <div><label className="block text-xs font-medium mb-1">Phone</label><input type="text" value={content.phone} onChange={e => setContent(p => ({ ...p, phone: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
            </div>
            <div><label className="block text-xs font-medium mb-1">Address</label><textarea rows={2} value={content.address} onChange={e => setContent(p => ({ ...p, address: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" /></div>
            <div><label className="block text-xs font-medium mb-1">Google Maps Embed URL</label><input type="url" value={content.mapEmbed} onChange={e => setContent(p => ({ ...p, mapEmbed: e.target.value }))} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
          </div>
          <div className="mt-4 bg-stone-50 rounded-xl p-4 text-center">
            <MapPin className="w-6 h-6 text-foreground/30 mx-auto mb-1" />
            <p className="text-sm text-foreground/60">{content.address}</p>
            <a href={content.mapEmbed} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 justify-center mt-1"><ExternalLink className="w-3 h-3" /> Open in Google Maps</a>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2"><Globe className="w-5 h-5 text-primary" /><h2 className="font-semibold">Social Links</h2></div>
            <button onClick={() => setShowSocialForm(!showSocialForm)} className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors">Add Link</button>
          </div>

          {showSocialForm && (
            <div className="flex items-end gap-3 mb-4 bg-stone-50 p-3 rounded-xl">
              <div className="flex-1"><label className="block text-xs font-medium mb-1">Platform</label><input type="text" value={editingSocial.platform} onChange={e => setEditingSocial(p => ({ ...p, platform: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" placeholder="e.g. YouTube" /></div>
              <div className="flex-[2]"><label className="block text-xs font-medium mb-1">URL</label><input type="url" value={editingSocial.url} onChange={e => setEditingSocial(p => ({ ...p, url: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" placeholder="https://..." /></div>
              <button onClick={addSocial} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold">Add</button>
              <button onClick={() => setShowSocialForm(false)} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium">Cancel</button>
            </div>
          )}

          <div className="space-y-2">
            {content.socialLinks.map(s => (
              <div key={s.platform} className="flex items-center justify-between bg-stone-50 rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-foreground/30" />
                  <span className="text-sm font-medium">{s.platform}</span>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"><ExternalLink className="w-3 h-3" />Open</a>
                </div>
                <button onClick={() => removeSocial(s.platform)} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
