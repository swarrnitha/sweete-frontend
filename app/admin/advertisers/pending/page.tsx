'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Building2, MapPin, FileText, Check, X, Eye, Download } from 'lucide-react';

const pendingList = [
  { id: 4, company: 'TechAds Agency', contact: 'Sneha Reddy', email: 'sneha@techads.com', phone: '+91 65432 10987', city: 'Hyderabad', documents: ['GST Certificate', 'Business Registration', 'Address Proof'], submitted: '2026-07-18' },
  { id: 5, company: 'Jaipur Media Group', contact: 'Vikram Singh', email: 'vikram@jaipurmedia.in', phone: '+91 54321 09876', city: 'Jaipur', documents: ['GST Certificate', 'PAN Card'], submitted: '2026-07-19' },
];

export default function PendingVerificationPage() {
  const [pending, setPending] = useState(pendingList);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);

  const verify = (id: number, company: string) => {
    setPending(prev => prev.filter(a => a.id !== id));
    toast.success(`"${company}" verified successfully!`);
  };

  const reject = (id: number, company: string) => {
    setPending(prev => prev.filter(a => a.id !== id));
    toast.error(`"${company}" rejected.`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Pending Verification</h1>
        <p className="text-foreground/50 text-sm">{pending.length} advertisers awaiting verification</p>
      </div>

      <div className="space-y-4">
        {pending.map(a => (
          <div key={a.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <p className="font-semibold text-sm">{a.company}</p>
                    <p className="text-xs text-foreground/60">{a.contact} &middot; {a.email}</p>
                    <p className="text-xs text-foreground/40 mt-0.5">{a.phone}</p>
                    <div className="flex items-center gap-1 text-xs text-foreground/40 mt-0.5"><MapPin className="w-3 h-3" />{a.city}</div>
                  </div>
                  <div>
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1.5">Documents</p>
                    <div className="space-y-1.5">
                      {a.documents.map((doc, i) => (
                        <div key={i} className="flex items-center justify-between bg-stone-50 rounded-lg px-3 py-1.5">
                          <div className="flex items-center gap-1.5 text-xs">
                            <FileText className="w-3.5 h-3.5 text-foreground/30" />{doc}
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => setPreviewDoc(previewDoc === doc ? null : doc)} className="p-1 rounded text-foreground/30 hover:text-blue-600 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                            <button onClick={() => toast.success(`Downloading ${doc}`)} className="p-1 rounded text-foreground/30 hover:text-primary transition-colors"><Download className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Submitted</p>
                    <p className="text-sm">{a.submitted}</p>
                    <div className="flex items-center gap-2 mt-4 justify-end">
                      <button onClick={() => verify(a.id, a.company)} className="px-4 py-1.5 bg-accent text-white rounded-lg text-xs font-semibold hover:bg-accent/90 transition-colors flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Verify</button>
                      <button onClick={() => reject(a.id, a.company)} className="px-4 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors flex items-center gap-1"><X className="w-3.5 h-3.5" /> Reject</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {previewDoc && (
              <div className="border-t border-stone-100 bg-stone-50 p-4">
                <div className="bg-white rounded-xl border border-stone-200 p-8 max-w-lg mx-auto text-center">
                  <FileText className="w-12 h-12 text-foreground/20 mx-auto mb-2" />
                  <p className="font-medium text-sm">{previewDoc}</p>
                  <p className="text-xs text-foreground/40 mt-1">Document preview not available in demo.</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {pending.length === 0 && (
        <div className="text-center py-16 text-foreground/40">All advertisers have been verified.</div>
      )}
    </div>
  );
}
