'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function AdvertiserLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/advertiser/dashboard' },
    { name: 'Explore Hoardings', path: '/advertiser/hoardings' },
    { name: 'My Subscriptions', path: '/advertiser/subscriptions' },
    { name: 'Saved Hoardings', path: '/advertiser/wishlist' },
    { name: 'Payments', path: '/advertiser/payments' },
    { name: 'Notifications', path: '/advertiser/notifications' },
    { name: 'Profile', path: '/advertiser/profile' },
  ];

  const sidebarNav = (
    <nav className="space-y-2">
      {menuItems.map(item => (
        <Link key={item.path} href={item.path} onClick={() => setSidebarOpen(false)} className="block p-3 rounded-lg hover:bg-slate-100 transition-colors">
          {item.name}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <button className="fixed top-3 left-3 z-50 md:hidden p-2 bg-white border border-border rounded-lg shadow-md cursor-pointer" onClick={() => setSidebarOpen(true)}>
        <Menu className="w-5 h-5" />
      </button>

      <aside className="hidden md:block w-64 border-r border-border p-6 bg-card flex-shrink-0">
        <h2 className="font-bold text-lg mb-6 text-primary">Advertiser Portal</h2>
        {sidebarNav}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-card border-r border-border p-6 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-primary">Advertiser Portal</h2>
              <button className="p-1 cursor-pointer" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            {sidebarNav}
          </aside>
        </div>
      )}

      <main className="flex-grow p-4 md:p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
