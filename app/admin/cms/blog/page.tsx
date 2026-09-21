'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit2, Trash2, FileText, Calendar, User, Eye } from 'lucide-react';

const initial = [
  { id: 1, title: 'The Future of Outdoor Advertising in India', author: 'Rahul Sharma', category: 'Industry Trends', status: 'Published', publishDate: '2026-07-15', views: 1240 },
  { id: 2, title: 'How to Choose the Perfect Hoarding Location', author: 'Priya Patel', category: 'Tips & Guides', status: 'Published', publishDate: '2026-07-10', views: 890 },
  { id: 3, title: 'Digital vs Traditional Billboards: Which is Right for You?', author: 'Amit Verma', category: 'Comparison', status: 'Draft', publishDate: null, views: 0 },
  { id: 4, title: 'Maximizing ROI with Outdoor Advertising', author: 'Sneha Reddy', category: 'Marketing', status: 'Published', publishDate: '2026-07-05', views: 1560 },
  { id: 5, title: 'Top 10 High-Traffic Locations in Mumbai for Ads', author: 'Raj Deshmukh', category: 'Guides', status: 'Draft', publishDate: null, views: 0 },
];

export default function BlogCMSPage() {
  const [posts, setPosts] = useState(initial);
  const [editing, setEditing] = useState<{ id: number | null; title: string; author: string; category: string; status: string; content: string }>({ id: null, title: '', author: '', category: 'General', status: 'Draft', content: '' });

  const startAdd = () => setEditing({ id: null, title: '', author: '', category: 'General', status: 'Draft', content: '' });
  const startEdit = (p: typeof initial[0]) => setEditing({ id: p.id, title: p.title, author: p.author, category: p.category, status: p.status, content: p.title + ' — full content editor would go here.' });

  const save = () => {
    if (!editing.title || !editing.author) { toast.error('Title and author are required.'); return; }
    if (editing.id) {
      setPosts(prev => prev.map(p => p.id === editing.id ? { ...p, title: editing.title, author: editing.author, category: editing.category, status: editing.status } : p));
      toast.success('Post updated.');
    } else {
      setPosts(prev => [...prev, { id: Date.now(), title: editing.title, author: editing.author, category: editing.category, status: editing.status, publishDate: editing.status === 'Published' ? new Date().toISOString().split('T')[0] : null, views: 0 }]);
      toast.success('Post created.');
    }
    setEditing({ id: null, title: '', author: '', category: 'General', status: 'Draft', content: '' });
  };

  const remove = (id: number, title: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    toast.success(`"${title}" deleted.`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">Blog Management</h1><p className="text-foreground/50 text-sm">{posts.filter(p => p.status === 'Published').length} published, {posts.filter(p => p.status === 'Draft').length} drafts</p></div>
        <button onClick={startAdd} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Plus className="w-4 h-4" /> New Post</button>
      </div>

      {(editing.id !== undefined) && (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="col-span-2"><label className="block text-xs font-medium mb-1">Title</label><input type="text" value={editing.title} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">Category</label><select value={editing.category} onChange={e => setEditing(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm"><option>General</option><option>Industry Trends</option><option>Tips & Guides</option><option>Comparison</option><option>Marketing</option><option>Guides</option></select></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div><label className="block text-xs font-medium mb-1">Author</label><input type="text" value={editing.author} onChange={e => setEditing(p => ({ ...p, author: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
            <div><label className="block text-xs font-medium mb-1">Status</label><select value={editing.status} onChange={e => setEditing(p => ({ ...p, status: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm"><option>Draft</option><option>Published</option></select></div>
          </div>
          <div><label className="block text-xs font-medium mb-1">Content</label><textarea rows={4} value={editing.content} onChange={e => setEditing(p => ({ ...p, content: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm resize-none" /></div>
          <div className="flex gap-3">
            <button onClick={save} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold">{editing.id ? 'Update' : 'Save'}</button>
            <button onClick={() => setEditing({ id: null, title: '', author: '', category: 'General', status: 'Draft', content: '' })} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-left">
          <thead><tr className="border-b border-stone-200 bg-stone-50">
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Title</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Author</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Category</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Status</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Publish Date</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Views</th>
            <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Actions</th>
          </tr></thead>
          <tbody>
            {posts.map(p => (
              <tr key={p.id} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="p-3 text-sm font-medium"><div className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-foreground/30" />{p.title}</div></td>
                <td className="p-3 text-sm"><div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-foreground/30" />{p.author}</div></td>
                <td className="p-3"><span className="text-xs px-2 py-0.5 rounded-full border bg-stone-100 text-stone-600 border-stone-200">{p.category}</span></td>
                <td className="p-3"><span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${p.status === 'Published' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{p.status}</span></td>
                <td className="p-3 text-sm text-foreground/60"><div className="flex items-center gap-1.5">{p.publishDate ? <><Calendar className="w-3.5 h-3.5 text-foreground/30" />{p.publishDate}</> : <span className="text-foreground/30">—</span>}</div></td>
                <td className="p-3 text-sm text-foreground/60"><div className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-foreground/30" />{p.views}</div></td>
                <td className="p-3 text-right"><div className="flex items-center justify-end gap-1">
                  <button onClick={() => startEdit(p)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600 hover:bg-blue-50"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => remove(p.id, p.title)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
