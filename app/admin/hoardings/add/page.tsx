'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Save, ArrowLeft, MapPin, Upload } from 'lucide-react';

const types = ['Billboard', 'Banner', 'Digital Screen', 'Pole Display', 'Building Wrap'];
const tags = ['Featured', 'Popular', 'New', 'Standard'];
const lightingTypes = ['Front-lit', 'Back-lit', 'LED', 'Neon', 'None'];
const mediaTypes = ['Static', 'Digital', '3D', 'Interactive'];

// For Edit mode, we'd receive hoarding data via search params / state
export default function AddHoardingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    location: '',
    area: '',
    price: '',
    type: 'Billboard',
    tag: 'Standard',
    status: 'Available',
    image: '',
    width: '',
    height: '',
    mediaType: 'Static',
    lighting: 'LED',
    latitude: '',
    longitude: '',
    ownerName: '',
    ownerContact: '',
    ownerEmail: '',
    description: '',
  });

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.location || !form.price) {
      toast.error('Name, Location, and Price are required.');
      return;
    }
    toast.success(`Hoarding "${form.name}" created successfully!`);
    router.push('/admin/hoardings/all');
  };

  return (
    <div>
      <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex items-center gap-3 mb-6">
        <Save className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Add Hoarding</h1>
          <p className="text-foreground/50 text-sm">Fill in the details to create a new hoarding listing.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6 bg-white rounded-2xl border border-stone-200 p-6">
        {/* Basic Info */}
        <div>
          <h2 className="font-semibold text-sm text-foreground/60 uppercase tracking-wide mb-3">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name <span className="text-red-500">*</span></label>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. Marine Drive Premium" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location / City <span className="text-red-500">*</span></label>
              <input type="text" value={form.location} onChange={e => update('location', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. Mumbai" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Area / Street</label>
              <input type="text" value={form.area} onChange={e => update('area', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. Marine Drive" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Monthly Price (₹) <span className="text-red-500">*</span></label>
              <input type="number" value={form.price} onChange={e => update('price', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="e.g. 75000" />
            </div>
          </div>
        </div>

        {/* Media & Dimensions */}
        <div>
          <h2 className="font-semibold text-sm text-foreground/60 uppercase tracking-wide mb-3">Media &amp; Dimensions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Media Type</label>
              <select value={form.mediaType} onChange={e => update('mediaType', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                {mediaTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hoarding Type</label>
              <select value={form.type} onChange={e => update('type', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                {types.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lighting</label>
              <select value={form.lighting} onChange={e => update('lighting', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                {lightingTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Width (ft)</label>
              <input type="number" value={form.width} onChange={e => update('width', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. 20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Height (ft)</label>
              <input type="number" value={form.height} onChange={e => update('height', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. 10" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tag</label>
              <select value={form.tag} onChange={e => update('tag', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                {tags.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* GPS Location */}
        <div>
          <h2 className="font-semibold text-sm text-foreground/60 uppercase tracking-wide mb-3">GPS Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Latitude</label>
              <input type="text" value={form.latitude} onChange={e => update('latitude', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. 19.0760" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Longitude</label>
              <input type="text" value={form.longitude} onChange={e => update('longitude', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. 72.8777" />
            </div>
          </div>
        </div>

        {/* Owner Details */}
        <div>
          <h2 className="font-semibold text-sm text-foreground/60 uppercase tracking-wide mb-3">Owner Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Owner Name</label>
              <input type="text" value={form.ownerName} onChange={e => update('ownerName', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. Rajesh Sharma" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Number</label>
              <input type="text" value={form.ownerContact} onChange={e => update('ownerContact', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" value={form.ownerEmail} onChange={e => update('ownerEmail', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="owner@example.com" />
            </div>
          </div>
        </div>

        {/* Image */}
        <div>
          <h2 className="font-semibold text-sm text-foreground/60 uppercase tracking-wide mb-3">Images</h2>
          <div className="flex items-center gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input type="url" value={form.image} onChange={e => update('image', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="https://picsum.photos/seed/..." />
            </div>
            <div className="shrink-0 pt-5">
              <div className="w-14 h-14 rounded-xl border border-dashed border-stone-200 flex items-center justify-center text-foreground/20 hover:border-primary hover:text-primary transition-colors cursor-pointer">
                <Upload className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Status & Description */}
        <div>
          <h2 className="font-semibold text-sm text-foreground/60 uppercase tracking-wide mb-3">Status &amp; Description</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select value={form.status} onChange={e => update('status', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                {['Available', 'Occupied', 'Maintenance'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={e => update('description', e.target.value)} className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none" placeholder="Describe the hoarding location, visibility, audience demographics..." />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">Create Hoarding</button>
          <button type="button" onClick={() => router.push('/admin/hoardings/all')} className="px-5 py-2.5 border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
}
