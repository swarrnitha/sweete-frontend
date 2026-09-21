'use client';
import { useState, useEffect } from 'react';
import { Heart, MapPin, IndianRupee, Trash2 } from 'lucide-react';
import { hoardings } from '@/components/organisms/hoardings-data';

export default function WishlistPage() {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) setSavedIds(JSON.parse(stored));
  }, []);

  const remove = (id: number) => {
    const updated = savedIds.filter(i => i !== id);
    setSavedIds(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const saved = hoardings.filter(h => savedIds.includes(h.id));

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="w-6 h-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">Saved Hoardings</h1>
          <p className="text-foreground/50 text-sm">{saved.length} saved location{saved.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {saved.length === 0 ? (
        <div className="text-center py-20">
          <Heart className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
          <p className="text-foreground/40">No saved hoardings yet.</p>
          <p className="text-foreground/30 text-sm mt-1">Browse hoardings and save your favourites.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {saved.map(h => (
            <div key={h.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow group">
              <div className="h-36 relative overflow-hidden bg-stone-100">
                <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">{h.tag}</span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold">{h.name}</h3>
                  <button onClick={() => remove(h.id)} className="text-foreground/30 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-foreground/60 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {h.location}
                </div>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mt-3">
                  <IndianRupee className="w-3.5 h-3.5" /> ₹{h.price.toLocaleString()}/month
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
