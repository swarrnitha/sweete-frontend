'use client';
import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'sweete_wishlist';

export function useWishlist() {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSavedIds(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = useCallback((ids: number[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, []);

  const isSaved = useCallback((id: number) => savedIds.includes(id), [savedIds]);

  const toggle = useCallback((id: number) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      persist(next);
      return next;
    });
  }, [persist]);

  return { savedIds, isSaved, toggle };
}
