'use client';
import { useState } from 'react';
import { Bell, BellRing, CalendarClock, IndianRupee, CheckCircle, XCircle, Megaphone, AlertTriangle, Trash2 } from 'lucide-react';

interface Notification {
  id: number;
  type: 'payment' | 'booking' | 'promo' | 'alert';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initial: Notification[] = [
  { id: 1, type: 'payment', title: 'Payment Confirmed', message: 'Your payment of ₹45,000 for Marine Drive Banner (Jun) has been received.', time: '2 hours ago', read: false },
  { id: 2, type: 'booking', title: 'Booking Expiring Soon', message: 'Your booking for Andheri East Billboard expires in 7 days. Renew now.', time: '5 hours ago', read: false },
  { id: 3, type: 'payment', title: 'Invoice Generated', message: 'New invoice INV-003 for Bandra West Hoarding (₹55,000) is ready for payment.', time: '1 day ago', read: false },
  { id: 4, type: 'alert', title: 'Price Drop Alert', message: 'Connaught Place Signage rental has been reduced from ₹52,000 to ₹48,000/month.', time: '2 days ago', read: true },
  { id: 5, type: 'promo', title: 'Referral Bonus', message: 'Refer a fellow advertiser and get 10% off on your next booking. Share your referral code!', time: '3 days ago', read: true },
  { id: 6, type: 'booking', title: 'Booking Approved', message: 'Your booking for MG Road Display has been approved. The hoarding is now live.', time: '5 days ago', read: true },
  { id: 7, type: 'alert', title: 'Maintenance Notice', message: 'Marine Drive Banner will undergo maintenance on Jul 25. Your ad may be down for 2 hours.', time: '1 week ago', read: true },
];

const typeIcons: Record<string, React.ReactNode> = {
  payment: <IndianRupee className="w-4 h-4" />,
  booking: <CalendarClock className="w-4 h-4" />,
  promo: <Megaphone className="w-4 h-4" />,
  alert: <AlertTriangle className="w-4 h-4" />,
};

const typeBg: Record<string, string> = {
  payment: 'bg-accent/15 text-accent',
  booking: 'bg-blue-100 text-blue-700',
  promo: 'bg-purple-100 text-purple-700',
  alert: 'bg-amber-100 text-amber-700',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initial);
  const [tab, setTab] = useState<'all' | 'unread'>('all');

  const filtered = tab === 'unread' ? notifications.filter(n => !n.read) : notifications;

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  const toggleRead = (id: number) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  const remove = (id: number) => setNotifications(prev => prev.filter(n => n.id !== id));

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {unreadCount > 0 ? <BellRing className="w-6 h-6 text-primary" /> : <Bell className="w-6 h-6 text-primary" />}
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-foreground/50 text-sm">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} className="text-sm text-primary hover:text-primary/80 font-medium">Mark all as read</button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-stone-100 rounded-xl p-1 w-fit">
        <button onClick={() => setTab('all')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === 'all' ? 'bg-white shadow-sm' : 'text-foreground/50 hover:text-foreground'}`}>All</button>
        <button onClick={() => setTab('unread')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${tab === 'unread' ? 'bg-white shadow-sm' : 'text-foreground/50 hover:text-foreground'}`}>Unread</button>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <Bell className="w-12 h-12 text-foreground/20 mx-auto mb-4" />
          <p className="text-foreground/40">No notifications yet.</p>
          <p className="text-foreground/30 text-sm mt-1">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(n => (
            <div key={n.id} className={`flex items-start gap-3 p-4 rounded-2xl border transition-colors ${n.read ? 'bg-white border-stone-200' : 'bg-primary/5 border-primary/20'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${typeBg[n.type]}`}>
                {typeIcons[n.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm ${n.read ? 'text-foreground/70' : 'text-foreground font-semibold'}`}>{n.title}</p>
                  <span className="text-xs text-foreground/30 whitespace-nowrap">{n.time}</span>
                </div>
                <p className="text-xs text-foreground/50 mt-0.5">{n.message}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => toggleRead(n.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-foreground/30 hover:text-foreground/60 hover:bg-stone-100 transition-colors" title={n.read ? 'Mark unread' : 'Mark read'}>
                  {n.read ? <XCircle className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5 text-primary" />}
                </button>
                <button onClick={() => remove(n.id)} className="w-7 h-7 flex items-center justify-center rounded-lg text-foreground/30 hover:text-red-500 hover:bg-stone-100 transition-colors" title="Remove">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
