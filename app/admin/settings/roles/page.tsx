'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Shield, Plus, Edit2, Trash2, Check, X } from 'lucide-react';

const permissions = {
  hoardings: ['View', 'Create', 'Edit', 'Delete', 'Approve'],
  advertisers: ['View', 'Create', 'Edit', 'Delete', 'Verify', 'Suspend'],
  bookings: ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Cancel'],
  payments: ['View', 'Create', 'Edit', 'Delete', 'Refund'],
  subscriptions: ['View', 'Create', 'Edit', 'Delete'],
  reports: ['View', 'Export', 'Configure'],
  cms: ['View', 'Create', 'Edit', 'Delete'],
  notifications: ['View', 'Send', 'Create'],
  settings: ['View', 'Edit'],
};

const initialRoles = [
  { id: 1, name: 'Super Admin', description: 'Full system access with all permissions', users: 2, isSystem: true, perms: Object.fromEntries(Object.entries(permissions).map(([k, v]) => [k, v])) },
  { id: 2, name: 'Admin', description: 'Administrative access excluding system settings', users: 5, isSystem: true, perms: Object.fromEntries(Object.entries(permissions).map(([k, v]) => [k, ['View', 'Create', 'Edit', 'Delete'].filter(p => v.includes(p))])) },
  { id: 3, name: 'Moderator', description: 'Content moderation and booking management', users: 8, isSystem: false, perms: { hoardings: ['View', 'Edit'], advertisers: ['View'], bookings: ['View', 'Approve'], payments: ['View'], subscriptions: ['View'], reports: ['View'], cms: ['View', 'Edit'], notifications: ['View'], settings: ['View'] } },
];

export default function RolesPage() {
  const [roles, setRoles] = useState(initialRoles);
  const [editing, setEditing] = useState<{ id: number | null; name: string; desc: string }>({ id: null, name: '', desc: '' });

  const startAdd = () => setEditing({ id: null, name: '', desc: '' });
  const startEdit = (r: typeof initialRoles[0]) => setEditing({ id: r.id, name: r.name, desc: r.description });

  const saveRole = () => {
    if (!editing.name) { toast.error('Role name required.'); return; }
    if (editing.id) {
      setRoles(prev => prev.map(r => r.id === editing.id ? { ...r, name: editing.name, description: editing.desc } : r));
      toast.success('Role updated.');
    } else {
      setRoles(prev => [...prev, { id: Date.now(), name: editing.name, description: editing.desc, users: 0, isSystem: false, perms: Object.fromEntries(Object.entries(permissions).map(([k, v]) => [k, []])) }]);
      toast.success('Role created.');
    }
    setEditing({ id: null, name: '', desc: '' });
  };

  const togglePerm = (roleId: number, module: string, perm: string) => {
    setRoles(prev => prev.map(r => {
      if (r.id !== roleId) return r;
      const current = r.perms[module] || [];
      const updated = current.includes(perm) ? current.filter((p: string) => p !== perm) : [...current, perm];
      return { ...r, perms: { ...r.perms, [module]: updated } };
    }));
  };

  const remove = (id: number, name: string) => {
    if (roles.find(r => r.id === id)?.isSystem) { toast.error('Cannot delete system roles.'); return; }
    setRoles(prev => prev.filter(r => r.id !== id));
    toast.success(`"${name}" deleted.`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold">Roles &amp; Permissions</h1><p className="text-foreground/50 text-sm">{roles.length} roles defined</p></div>
        <button onClick={startAdd} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add Role</button>
      </div>

      {(editing.id !== undefined) && (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 mb-4 flex items-end gap-3">
          <div className="flex-1"><label className="block text-xs font-medium mb-1">Role Name</label><input type="text" value={editing.name} onChange={e => setEditing(p => ({ ...p, name: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
          <div className="flex-[2]"><label className="block text-xs font-medium mb-1">Description</label><input type="text" value={editing.desc} onChange={e => setEditing(p => ({ ...p, desc: e.target.value }))} className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm" /></div>
          <button onClick={saveRole} className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold">{editing.id ? 'Update' : 'Save'}</button>
          <button onClick={() => setEditing({ id: null, name: '', desc: '' })} className="px-4 py-2 border border-stone-200 rounded-xl text-sm font-medium">Cancel</button>
        </div>
      )}

      {roles.map(r => (
        <div key={r.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden mb-4">
          <div className="p-4 border-b border-stone-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm">{r.name} {r.isSystem && <span className="text-xs text-foreground/40 font-normal">(System)</span>}</p>
                  <p className="text-xs text-foreground/50">{r.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-foreground/40">{r.users} user{r.users !== 1 ? 's' : ''}</span>
                {!r.isSystem && <><button onClick={() => startEdit(r)} className="p-1.5 rounded-lg text-foreground/30 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button><button onClick={() => remove(r.id, r.name)} className="p-1.5 rounded-lg text-foreground/30 hover:text-red-600"><Trash2 className="w-4 h-4" /></button></>}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead><tr className="border-b border-stone-100 bg-stone-50">
                <th className="p-2 text-xs font-semibold text-foreground/50 uppercase w-28">Module</th>
                {Object.values(permissions)[0].map(p => <th key={p} className="p-2 text-xs font-semibold text-foreground/50 uppercase text-center">{p}</th>)}
              </tr></thead>
              <tbody>
                {Object.entries(permissions).map(([module, perms]) => (
                  <tr key={module} className="border-b border-stone-50 hover:bg-stone-50">
                    <td className="p-2 text-sm font-medium capitalize">{module}</td>
                    {perms.map(p => {
                      const enabled = r.perms[module]?.includes(p);
                      return (
                        <td key={p} className="p-2 text-center">
                          <button onClick={() => togglePerm(r.id, module, p)} className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${enabled ? 'bg-primary/10 text-primary' : 'text-foreground/20 hover:text-foreground/40'}`}>
                            {enabled ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
