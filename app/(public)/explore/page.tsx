'use client';
import { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from "@/components/atoms/Button";
import { Filter, X, Star, Clock, ShoppingBag } from 'lucide-react';
import { sweets } from '@/components/organisms/hoardings-data';
import { SWEET_CATEGORIES } from '@/constants/categories';

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') || '';
  const initialCity = searchParams.get('city') || '';

  const [search, setSearch] = useState(initialQuery);
  const [city, setCity] = useState(initialCity);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-low' | 'price-high' | 'rating'>('relevance');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...sweets];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.shop.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }
    if (city) result = result.filter(s => s.city.toLowerCase().includes(city.toLowerCase()));
    if (selectedCategory) result = result.filter(s => s.category === selectedCategory);
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [search, city, selectedCategory, sortBy]);

  const filterContent = (
    <div className="card p-6 space-y-6 lg:sticky lg:top-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Filters</h2>
        <button className="lg:hidden p-1 cursor-pointer" onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-1.5 block">Search</label>
          <input type="text" placeholder="Search sweets..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-1.5 block">City</label>
          <input type="text" placeholder="e.g. Delhi, Mumbai..." value={city} onChange={e => setCity(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-1.5 block">Category</label>
          <div className="space-y-1.5">
            {SWEET_CATEGORIES.map(cat => (
              <button key={cat.name} onClick={() => setSelectedCategory(selectedCategory === cat.name ? '' : cat.name)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${selectedCategory === cat.name ? 'bg-primary text-white' : 'bg-stone-50 hover:bg-stone-100 text-foreground/70'}`}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-1.5 block">Sort By</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none">
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
        <Button variant="outline" className="w-full" onClick={() => { setSearch(''); setCity(''); setSelectedCategory(''); setSortBy('relevance'); }}>Clear Filters</Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="hidden lg:block lg:w-64 flex-shrink-0">
        {filterContent}
      </aside>
      {showFilters && (
        <div className="fixed inset-0 top-0 z-50 bg-black/40 lg:hidden" onClick={() => setShowFilters(false)}>
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white p-4 overflow-y-auto" onClick={e => e.stopPropagation()}>
            {filterContent}
          </div>
        </div>
      )}
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold">Explore Sweets</h1>
            <button className="lg:hidden p-2 border border-border rounded-lg cursor-pointer" onClick={() => setShowFilters(true)}>
              <Filter className="w-5 h-5" />
            </button>
          </div>
          <p className="text-foreground/60 text-sm">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-foreground/40 text-lg">No sweets found matching your filters.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSearch(''); setCity(''); setSelectedCategory(''); }}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(s => (
              <div key={s.id} className="card overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video w-full relative overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">{s.tag}</span>
                  {s.originalPrice && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">{Math.round((1 - s.price / s.originalPrice) * 100)}% OFF</span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-3 h-3 rounded-sm bg-green-500 border border-green-600" />
                    <span className="text-xs text-foreground/50">{s.weight}</span>
                  </div>
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <p className="text-foreground/50 text-sm mt-0.5">by {s.shop}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-green-600 font-semibold"><Star className="w-3.5 h-3.5 fill-green-600" /> {s.rating}</span>
                    <span className="text-foreground/40">({s.reviews})</span>
                    <span className="flex items-center gap-1 text-foreground/50"><Clock className="w-3.5 h-3.5" /> {s.deliveryTime}</span>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-stone-100">
                    <div className="flex items-baseline gap-2">
                      <p className="text-primary font-bold text-lg">&#8377;{s.price}</p>
                      {s.originalPrice && <p className="text-foreground/40 text-sm line-through">&#8377;{s.originalPrice}</p>}
                    </div>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4" /> ADD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div className="flex-grow text-center py-20 text-foreground/40">Loading...</div>}>
        <ExploreContent />
      </Suspense>
    </div>
  );
}
