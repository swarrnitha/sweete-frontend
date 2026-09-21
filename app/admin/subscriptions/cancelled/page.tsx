'use client';
import { useState } from 'react';
import { Building2, Calendar, XCircle } from 'lucide-react';

const cancelled = [
  { id: 14, company: 'BrightAds Media', contact: 'Sanjay Kapoor', plan: 'Professional', price: 2999, startDate: '2025-08-01', cancelledOn: '2026-02-15', reason: 'Budget constraints — reduced marketing spend for Q1 2026.', refundStatus: 'Partial Refund Issued', refundAmount: '₹4,500' },
  { id: 15, company: 'Metro Signage Ltd', contact: 'Deepika Nair', plan: 'Premium', price: 4999, startDate: '2025-06-01', cancelledOn: '2026-01-10', reason: 'Switched to in-house advertising team.', refundStatus: 'Full Refund Issued', refundAmount: '₹9,998' },
  { id: 16, company: 'EcoAds India', contact: 'Rohan Thakur', plan: 'Basic', price: 999, startDate: '2026-01-01', cancelledOn: '2026-05-20', reason: 'Company restructuring — all marketing on hold.', refundStatus: 'No Refund', refundAmount: '₹0' },
];

const planStyles: Record<string, string> = {
  Premium: 'bg-purple-50 text-purple-700 border-purple-200',
  Professional: 'bg-blue-50 text-blue-700 border-blue-200',
  Basic: 'bg-green-50 text-green-700 border-green-200',
};

const refundStyles: Record<string, string> = {
  'Full Refund Issued': 'bg-accent/10 text-accent',
  'Partial Refund Issued': 'bg-amber-50 text-amber-700',
  'No Refund': 'bg-red-50 text-red-700',
};

export default function CancelledPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Cancelled Subscriptions</h1>
        <p className="text-foreground/50 text-sm">{cancelled.length} cancelled subscriptions</p>
      </div>

      <div className="space-y-3">
        {cancelled.map(s => (
          <div key={s.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1 min-w-0 grid md:grid-cols-4 gap-3">
                  <div>
                    <p className="font-semibold text-sm">{s.company}</p>
                    <p className="text-xs text-foreground/60">{s.contact}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border mt-1 inline-block ${planStyles[s.plan]}`}>{s.plan}</span>
                    <p className="text-xs text-foreground/40 mt-1">₹{s.price}/mo</p>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Cancellation Reason</p>
                    <div className="bg-stone-50 rounded-xl p-3">
                      <p className="text-sm text-foreground/60">{s.reason}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Timeline</p>
                    <div className="flex items-center gap-1.5 text-sm"><Calendar className="w-3.5 h-3.5 text-foreground/30" />Started: {s.startDate}</div>
                    <div className="flex items-center gap-1.5 text-sm mt-0.5"><XCircle className="w-3.5 h-3.5 text-red-400" />Cancelled: {s.cancelledOn}</div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Refund</p>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${refundStyles[s.refundStatus]}`}>{s.refundStatus}</span>
                    <p className="text-sm font-semibold mt-1">{s.refundAmount}</p>
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
