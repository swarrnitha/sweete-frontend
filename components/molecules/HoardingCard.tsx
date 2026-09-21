'use client';
import { useState } from 'react';
import { MapPin, Star, Clock, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Sweet } from '@/components/organisms/hoardings-data';
import { useWishlist } from '@/hooks/useWishlist';
import { Button } from '@/components/atoms/Button';

interface SweetCardProps {
  sweet: Sweet;
  showActions?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const SweetCard = ({ sweet, showActions = true, size = 'md' }: SweetCardProps) => {
  const router = useRouter();
  const { isSaved, toggle } = useWishlist();
  const s = sweet;
  const saved = isSaved(s.id);
  const [imgError, setImgError] = useState(false);

  const imageHeight = size === 'sm' ? 'h-28' : size === 'lg' ? 'h-52' : 'h-36';

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className={`${imageHeight} relative overflow-hidden bg-stone-100`}>
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center text-foreground/30 text-xs">No image</div>
        ) : (
          <img src={s.image} alt={s.name} loading="lazy" onError={() => setImgError(true)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        )}
        <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">{s.tag}</span>
        {s.originalPrice && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {Math.round((1 - s.price / s.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-sm md:text-base">{s.name}</h3>
            <p className="text-xs text-foreground/50 mt-0.5">by {s.shop}</p>
          </div>
          {showActions && (
            <button onClick={() => toggle(s.id)} className={`transition-colors shrink-0 ml-2 ${saved ? 'text-red-500' : 'text-foreground/30 hover:text-red-400'}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          )}
        </div>
        {size !== 'sm' && (
          <div className="flex items-center gap-3 mt-1.5 text-xs text-foreground/60">
            <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-green-600 text-green-600" /> {s.rating}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {s.deliveryTime}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-sm font-semibold text-primary mt-2">
          &#8377;{s.price}
          {s.originalPrice && <span className="text-foreground/40 text-xs line-through font-normal">&#8377;{s.originalPrice}</span>}
        </div>
        {showActions && size !== 'sm' && (
          <Button size="sm" className="mt-3 w-full" onClick={() => router.push(`/explore?q=${encodeURIComponent(s.name)}`)}>
            <ShoppingBag className="w-3.5 h-3.5 mr-1.5" /> Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};
