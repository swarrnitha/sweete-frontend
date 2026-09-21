'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchSweets = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 -mt-10 relative z-10">
      <div className="max-w-4xl mx-auto bg-card border border-border p-4 rounded-2xl shadow-xl flex items-center gap-3">
        <Search className="w-5 h-5 text-foreground/40 shrink-0" />
        <input
          type="text"
          placeholder="Search for cakes, chocolates, mithai, pastries..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          className="flex-1 p-2 focus:outline-none bg-transparent"
        />
        <button onClick={handleSearch} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-all">
          Search
        </button>
      </div>
    </div>
  );
};
