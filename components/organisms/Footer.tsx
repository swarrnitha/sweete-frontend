import Link from 'next/link';
import { SweeteLogo } from './SweeteLogo';

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <SweeteLogo className="h-10" variant="white" />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              India&apos;s sweetest delivery platform. Order the finest sweets, pastries, chocolates and desserts from top bakeries near you.
            </p>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Company</h4>
              <nav className="flex flex-col space-y-2 text-white/60">
                <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link href="/explore" className="hover:text-white transition-colors">Our Menu</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                <Link href="#" className="hover:text-white transition-colors">Careers</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Categories</h4>
              <nav className="flex flex-col space-y-2 text-white/60">
                <Link href="/explore" className="hover:text-white transition-colors">Indian Mithai</Link>
                <Link href="/explore" className="hover:text-white transition-colors">Cakes & Pastries</Link>
                <Link href="/explore" className="hover:text-white transition-colors">Chocolates</Link>
                <Link href="/explore" className="hover:text-white transition-colors">Frozen Desserts</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Support</h4>
              <nav className="flex flex-col space-y-2 text-white/60">
                <Link href="#" className="hover:text-white transition-colors">FAQs</Link>
                <Link href="/contact" className="hover:text-white transition-colors">Help Center</Link>
                <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Follow Us</h4>
              <nav className="flex flex-col space-y-2 text-white/60">
                <Link href="#" className="hover:text-accent transition-colors">Instagram</Link>
                <Link href="#" className="hover:text-accent transition-colors">Facebook</Link>
                <Link href="#" className="hover:text-accent transition-colors">Twitter</Link>
                <Link href="#" className="hover:text-accent transition-colors">WhatsApp</Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-center text-white/50 text-sm">
          &copy; {new Date().getFullYear()} SWEETE. All rights reserved. Made with love for sweets.
        </div>
      </div>
    </footer>
  );
};
