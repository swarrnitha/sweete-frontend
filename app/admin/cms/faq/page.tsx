'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, HelpCircle } from 'lucide-react';

const initial = [
  { id: 1, question: 'How do I book a hoarding?', answer: 'Simply browse our available hoardings, select your preferred location, and submit a booking request. Our team will review and confirm within 24 hours.', category: 'Booking', order: 1 },
  { id: 2, question: 'What payment methods are accepted?', answer: 'We accept all major credit/debit cards, UPI, net banking, and corporate invoicing for established businesses.', category: 'Payments', order: 2 },
  { id: 3, question: 'Can I cancel my booking?', answer: 'Yes, cancellations are accepted up to 48 hours before the start date. Refunds are processed as per our cancellation policy.', category: 'Booking', order: 3 },
  { id: 4, question: 'How are hoarding prices determined?', answer: 'Prices are based on location, foot traffic, visibility, size, and duration of booking. Premium locations command higher rates.', category: 'Pricing', order: 4 },
  { id: 5, question: 'Do you provide creative design services?', answer: 'Yes, our team can help design your ad creatives. Premium and Professional plan subscribers get creative management included.', category: 'Services', order: 5 },
];

export default function FAQCMSPage() {
  const [faqs, setFaqs] = useState(initial);
  const [editing, setEditing] = useState<{ id: number | null; question: string; answer: string; category: string; order: string }>({ id: null, question: '', answer: '', category: 'General', order: '' });

  const startAdd = () => setEditing({ id: null, question: '', answer: '', category: 'General', order: (faqs.length + 1).toString() });
  const startEdit = (f: typeof initial[0]) => setEditing({ id: f.id, question: f.question, answer: f.answer, category: f.category, order: f.order.toString() });

  const save = () => {
    if (!editing.question || !editing.answer) { toast.error('Question and answer are required.'); return; }
    if (editing.id) {
      setFaqs(prev => prev.map(f => f.id === editing.id ? { ...f, question: editing.question, answer: editing.answer, category: editing.category, order: parseInt(editing.order) } : f));
      toast.success('FAQ updated.');
    } else {
      setFaqs(prev => [...prev, { id: Date.now(), question: editing.question, answer: editing.answer, category: editing.category, order: parseInt(editing.order) }]);
      toast.success('FAQ added.');
    }
    setEditing({ id: null, question: '', answer: '', category: 'General', order: '' });
  };

  const remove = (id: number, q: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    toast.success(`"${q.substring(0, 30)}..." deleted.`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">FAQ Editor</h1><p className="text-foreground/50 text-sm">{faqs.length} questions</p></div>
        <button onClick={startAdd} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add FAQ</button>
      </div>

      {(editing.id !== undefined) && (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="col-span-2"><label className="block text-xs font-medium mb-1">Question</label><input type="text" value={editing.question} onChange={e => setEditing(p => ({ ...p, question: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">Category</label><select value={editing.category} onChange={e => setEditing(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm"><option>General</option><option>Booking</option><option>Payments</option><option>Pricing</option><option>Services</option></select></div>
          </div>
          <div><label className="block text-xs font-medium mb-1">Answer</label><textarea rows={2} value={editing.answer} onChange={e => setEditing(p => ({ ...p, answer: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm resize-none" /></div>
          <div className="flex items-center gap-3">
            <div className="w-20"><label className="block text-xs font-medium mb-1">Order</label><input type="number" value={editing.order} onChange={e => setEditing(p => ({ ...p, order: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
            <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold">{editing.id ? 'Update' : 'Save'}</button>
            <button onClick={() => setEditing({ id: null, question: '', answer: '', category: 'General', order: '' })} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase w-12">#</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Question</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Category</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Answer</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Actions</th>
          </tr></thead>
          <tbody>
            {faqs.sort((a, b) => a.order - b.order).map(f => (
              <tr key={f.id} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="p-3 text-sm text-foreground/40">{f.order}</td>
                <td className="p-3 text-sm font-medium">{f.question}</td>
                <td className="p-3"><span className="text-xs px-2 py-0.5 rounded-full border bg-stone-100 text-stone-600 border-stone-200">{f.category}</span></td>
                <td className="p-3 text-sm text-foreground/60 max-w-xs truncate">{f.answer}</td>
                <td className="p-3 text-right"><div className="flex items-center justify-end gap-1">
                  <button onClick={() => startEdit(f)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600 hover:bg-blue-50"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => remove(f.id, f.question)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
