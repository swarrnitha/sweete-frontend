'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { SweeteLogo } from './SweeteLogo';

export const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');
  const [mobileOpen, setMobileOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };

  const handleClose = () => {
    timer.current = setTimeout(() => setOpen(false), 150);
  };

  const openAuth = (view: 'login' | 'register') => {
    setOpen(false);
    setMobileOpen(false);
    setAuthView(view);
    setAuthOpen(true);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Explore Sweets', path: '/explore' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className="border-b border-border bg-card shadow-sm relative z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0">
              <SweeteLogo className="h-10" />
            </Link>

            <div className="hidden lg:flex items-center gap-6 font-medium">
              {navLinks.map(link => (
                <Link key={link.path} href={link.path} className="hover:text-primary transition-colors">{link.name}</Link>
              ))}
              <div className="h-6 w-px bg-border" />
              <button onClick={() => openAuth('login')} className="flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-border hover:bg-stone-50 transition-all cursor-pointer">
                Login <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-xl shadow-xl overflow-hidden">
                  <button onClick={() => openAuth('login')} className="w-full text-left block px-5 py-3 hover:bg-stone-50 transition-colors">
                    <p className="font-medium text-sm">User Login</p>
                    <p className="text-xs text-foreground/50">Order your favourite sweets</p>
                  </button>
                  <div className="h-px bg-border mx-3" />
                  <button onClick={() => { setOpen(false); router.push('/explore'); }} className="w-full text-left block px-5 py-3 hover:bg-stone-50 transition-colors">
                    <p className="font-medium text-sm">Explore Menu</p>
                    <p className="text-xs text-foreground/50">Browse sweets & pastries</p>
                  </button>
                </div>
              )}
              <Link href="/explore" className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-all">Order Now</Link>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <button className="p-2 cursor-pointer" aria-label="Wishlist"><Heart className="w-5 h-5" /></button>
              <button className="p-2 cursor-pointer" aria-label="Cart"><ShoppingBag className="w-5 h-5" /></button>
              <button className="p-2 cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 top-16 bg-white z-40 lg:hidden border-t border-border">
            <div className="flex flex-col p-6 gap-4 font-medium">
              {navLinks.map(link => (
                <Link key={link.path} href={link.path} onClick={() => setMobileOpen(false)} className="py-3 px-4 rounded-lg hover:bg-stone-50 transition-colors text-lg">{link.name}</Link>
              ))}
              <hr className="border-border" />
              <button onClick={() => openAuth('login')} className="w-full text-left py-3 px-4 rounded-lg hover:bg-stone-50 transition-colors text-lg">Login</button>
              <button onClick={() => { setMobileOpen(false); router.push('/explore'); }} className="w-full py-3 bg-primary text-primary-foreground rounded-xl shadow-md hover:bg-primary/90 transition-all text-lg font-medium">Order Now</button>
            </div>
          </div>
        )}
      </nav>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} defaultView={authView} />
    </>
  );
};
