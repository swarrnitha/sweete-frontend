'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ToastProvider } from '@/components/organisms/ToastProvider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { 
      name: 'Hoardings', 
      path: '/admin/hoardings',
      children: [
        { name: 'All', path: '/admin/hoardings/all' },
        { name: 'Available', path: '/admin/hoardings/available' },
        { name: 'Occupied', path: '/admin/hoardings/occupied' },
        { name: 'Maintenance', path: '/admin/hoardings/maintenance' },
        { name: 'Pending Approval', path: '/admin/hoardings/pending' },
        { name: 'Add Hoarding', path: '/admin/hoardings/add' },
        { name: 'Bulk Upload', path: '/admin/hoardings/bulk-upload' },
      ]
    },
    { 
      name: 'Locations', 
      path: '/admin/locations',
      children: [
        { name: 'Country', path: '/admin/locations/country' },
        { name: 'State', path: '/admin/locations/state' },
        { name: 'City', path: '/admin/locations/city' },
        { name: 'Area', path: '/admin/locations/area' },
        { name: 'Roads', path: '/admin/locations/roads' },
        { name: 'Landmarks', path: '/admin/locations/landmarks' },
      ]
    },
    { 
      name: 'Advertisers', 
      path: '/admin/advertisers',
      children: [
        { name: 'All Users', path: '/admin/advertisers/all' },
        { name: 'Active', path: '/admin/advertisers/active' },
        { name: 'Pending Verification', path: '/admin/advertisers/pending' },
        { name: 'Suspended', path: '/admin/advertisers/suspended' },
        { name: 'Subscription History', path: '/admin/advertisers/subscriptions' },
      ]
    },
    { 
      name: 'Subscriptions', 
      path: '/admin/subscriptions',
      children: [
        { name: 'Active', path: '/admin/subscriptions/active' },
        { name: 'Upcoming', path: '/admin/subscriptions/upcoming' },
        { name: 'Expired', path: '/admin/subscriptions/expired' },
        { name: 'Cancelled', path: '/admin/subscriptions/cancelled' },
        { name: 'Renewals', path: '/admin/subscriptions/renewals' },
      ]
    },
    { 
      name: 'Booking Requests', 
      path: '/admin/bookings',
      children: [
        { name: 'Pending', path: '/admin/bookings/pending' },
        { name: 'Approved', path: '/admin/bookings/approved' },
        { name: 'Rejected', path: '/admin/bookings/rejected' },
        { name: 'Cancelled', path: '/admin/bookings/cancelled' },
      ]
    },
    { 
      name: 'Payments', 
      path: '/admin/payments',
      children: [
        { name: 'Transactions', path: '/admin/payments/transactions' },
        { name: 'Revenue', path: '/admin/payments/revenue' },
        { name: 'Refunds', path: '/admin/payments/refunds' },
        { name: 'Invoices', path: '/admin/payments/invoices' },
        { name: 'Reports', path: '/admin/payments/reports' },
      ]
    },
    { 
      name: 'Creatives', 
      path: '/admin/creatives',
      children: [
        { name: 'Uploaded Artwork', path: '/admin/creatives/uploaded' },
        { name: 'Pending Review', path: '/admin/creatives/pending' },
        { name: 'Approved', path: '/admin/creatives/approved' },
        { name: 'Rejected', path: '/admin/creatives/rejected' },
        { name: 'Download', path: '/admin/creatives/download' },
      ]
    },
    { 
      name: 'Reports', 
      path: '/admin/reports',
      children: [
        { name: 'Revenue', path: '/admin/reports/revenue' },
        { name: 'Occupancy', path: '/admin/reports/occupancy' },
        { name: 'Advertiser Report', path: '/admin/reports/advertiser' },
        { name: 'Location Report', path: '/admin/reports/location' },
        { name: 'Hoarding Performance', path: '/admin/reports/hoarding' },
        { name: 'Export CSV/PDF', path: '/admin/reports/export' },
      ]
    },
    { 
      name: 'CMS', 
      path: '/admin/cms',
      children: [
        { name: 'Home', path: '/admin/cms/home' },
        { name: 'About', path: '/admin/cms/about' },
        { name: 'Pricing', path: '/admin/cms/pricing' },
        { name: 'FAQ', path: '/admin/cms/faq' },
        { name: 'Blog', path: '/admin/cms/blog' },
        { name: 'Contact', path: '/admin/cms/contact' },
        { name: 'SEO Settings', path: '/admin/cms/seo' },
      ]
    },
    { 
      name: 'Notifications', 
      path: '/admin/notifications',
      children: [
        { name: 'Push', path: '/admin/notifications/push' },
        { name: 'Email', path: '/admin/notifications/email' },
        { name: 'SMS', path: '/admin/notifications/sms' },
        { name: 'Templates', path: '/admin/notifications/templates' },
      ]
    },
    { 
      name: 'Settings', 
      path: '/admin/settings',
      children: [
        { name: 'General', path: '/admin/settings/general' },
        { name: 'Roles & Permissions', path: '/admin/settings/roles' },
        { name: 'Payment Gateway', path: '/admin/settings/payment' },
        { name: 'Taxes', path: '/admin/settings/taxes' },
        { name: 'Email Configuration', path: '/admin/settings/email' },
        { name: 'SMS Configuration', path: '/admin/settings/sms' },
        { name: 'API Keys', path: '/admin/settings/api' },
        { name: 'Audit Logs', path: '/admin/settings/audit' },
        { name: 'Backup', path: '/admin/settings/backup' },
      ]
    },
  ];

  const sidebar = (
    <nav className="space-y-1">
      {menuItems.map(item => (
        <div key={item.path}>
          {item.children ? (
            <button 
              onClick={() => setOpenSection(openSection === item.name ? null : item.name)}
              className="w-full text-left p-2 rounded-lg hover:bg-slate-100 transition-colors font-medium flex justify-between items-center"
            >
              {item.name}
              <span>{openSection === item.name ? '▼' : '▶'}</span>
            </button>
          ) : (
            <Link href={item.path} onClick={() => setSidebarOpen(false)} className="block p-2 rounded-lg hover:bg-slate-100 transition-colors font-medium">
              {item.name}
            </Link>
          )}
          {item.children && openSection === item.name && (
            <div className="pl-4 space-y-1">
              {item.children.map(child => (
                <Link key={child.path} href={child.path} onClick={() => setSidebarOpen(false)} className="block p-2 text-sm text-foreground/70 hover:text-primary transition-colors">
                  {child.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-x-hidden">
      <ToastProvider />

      <button className="fixed top-3 left-3 z-50 md:hidden p-2 bg-white border border-border rounded-lg shadow-md cursor-pointer" onClick={() => setSidebarOpen(true)}>
        <Menu className="w-5 h-5" />
      </button>

      <aside className="hidden md:block w-64 border-r border-border p-6 bg-card flex-shrink-0">
        <h2 className="font-bold text-lg mb-6 text-primary">Super Admin Portal</h2>
        {sidebar}
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] bg-card border-r border-border p-6 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg text-primary">Super Admin Portal</h2>
              <button className="p-1 cursor-pointer" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
            </div>
            {sidebar}
          </aside>
        </div>
      )}

      <main className="flex-grow p-4 md:p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
