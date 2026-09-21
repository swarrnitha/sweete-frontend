'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Building2, Calendar, Clock, AlertTriangle, Send, IndianRupee } from 'lucide-react';

const upcoming = [
  { id: 1, company: 'VisionAds Inc', contact: 'Amit Verma', plan: 'Premium', price: 4999, endDate: '2027-09-19', daysLeft: 60, autoRenew: true, paymentMethod: 'Credit Card' },
  { id: 2, company: 'Outdoor Media Co', contact: 'Neha Gupta', plan: 'Basic', price: 999, endDate: '2027-04-09', daysLeft: 30, autoRenew: false, paymentMethod: 'UPI' },
  { id: 3, company: 'Pune Outdoor Solutions', contact: 'Raj Deshmukh', plan: 'Professional', price: 2999, endDate: '2027-02-19', daysLeft: 15, autoRenew: true, paymentMethod: 'Net Banking' },
  { id: 4, company: 'AdShack Media Pvt Ltd', contact: 'Rahul Sharma', plan: 'Premium', price: 4999, endDate: '2027-10-31', daysLeft: 90, autoRenew: true, paymentMethod: 'Net Banking' },
];

const planStyles: Record<string, string> = {
  Premium: 'bg-purple-50 text-purple-700 border-purple-200',
  Professional: 'bg-blue-50 text-blue-700 border-blue-200',
  Basic: 'bg-green-50 text-green-700 border-green-200',
};

export default function UpcomingPage() {
  const [list, setList] = useState(upcoming);
  const [sortBy, setSortBy] = useState<'daysLeft' | 'endDate'>('daysLeft');

  const sorted = [...list].sort((a, b) => a.daysLeft - b.daysLeft);

  const sendReminder = (company: string) => {
    toast.success(`Renewal reminder sent to "${company}"`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Upcoming Expirations</h1>
        <p className="text-foreground/50 text-sm">{sorted.length} subscriptions expiring soon</p>
      </div>

      <div className="space-y-3">
        {sorted.map(s => (
          <div key={s.id} className={`bg-white rounded-2xl border overflow-hidden transition-colors ${s.daysLeft <= 30 ? 'border-amber-300 bg-amber-50/30' : 'border-stone-200'}`}>
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${s.daysLeft <= 30 ? 'bg-amber-100' : 'bg-stone-100'}`}>
                  <Building2 className={`w-5 h-5 ${s.daysLeft <= 30 ? 'text-amber-600' : 'text-foreground/30'}`} />
                </div>
                <div className="flex-1 min-w-0 grid md:grid-cols-4 gap-3">
                  <div>
                    <p className="font-semibold text-sm">{s.company}</p>
                    <p className="text-xs text-foreground/60">{s.contact}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border mt-1 inline-block ${planStyles[s.plan]}`}>{s.plan}</span>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Expiry</p>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Calendar className="w-3.5 h-3.5 text-foreground/30" />{s.endDate}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span className={`font-semibold ${s.daysLeft <= 30 ? 'text-red-500' : 'text-amber-600'}`}>{s.daysLeft} days left</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Payment</p>
                    <p className="text-sm">₹{s.price.toLocaleString()}/mo</p>
                    <p className="text-xs text-foreground/40 mt-0.5">{s.paymentMethod}</p>
                    <div className="flex items-center gap-1.5 text-xs mt-0.5">
                      {s.autoRenew ? (
                        <span className="text-accent font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Auto-renew on</span>
                      ) : (
                        <span className="text-amber-600 font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Manual renewal</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <button onClick={() => sendReminder(s.company)} className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5 ml-auto">
                      <Send className="w-3.5 h-3.5" /> Send Reminder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
