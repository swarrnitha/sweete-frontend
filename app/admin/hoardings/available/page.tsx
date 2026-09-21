'use client';
import toast from 'react-hot-toast';
import { MapPin, Maximize, CalendarCheck } from 'lucide-react';

const available = [
  { id: 2, name: 'Connaught Place Signage', location: 'Delhi', type: 'Digital Screen', size: '15x8 ft', price: 60000, image: 'https://picsum.photos/seed/connaught/80/60' },
  { id: 3, name: 'MG Road Billboard', location: 'Bangalore', type: 'Billboard', size: '25x12 ft', price: 45000, image: 'https://picsum.photos/seed/mgroad/80/60' },
  { id: 7, name: 'Park Street Banner', location: 'Kolkata', type: 'Banner', size: '12x6 ft', price: 30000, image: 'https://picsum.photos/seed/parkstreet/80/60' },
  { id: 9, name: 'FC Road Billboard', location: 'Pune', type: 'Billboard', size: '22x11 ft', price: 42000, image: 'https://picsum.photos/seed/fcroad/80/60' },
];

export default function AvailablePage() {
  const book = (id: number, name: string) => {
    toast.success(`Booking initiated for "${name}"`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Available Hoardings</h1>
        <p className="text-foreground/50 text-sm">{available.length} hoardings ready for booking</p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase w-12">Image</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Name</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Location</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Type</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Size</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase">Price</th>
                <th className="p-3 text-xs font-semibold text-foreground/50 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {available.map(h => (
                <tr key={h.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                  <td className="p-3"><img src={h.image} alt={h.name} className="w-10 h-8 rounded-lg object-cover" /></td>
                  <td className="p-3 text-sm font-medium">{h.name}</td>
                  <td className="p-3 text-sm text-foreground/60 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {h.location}</td>
                  <td className="p-3 text-sm text-foreground/60">{h.type}</td>
                  <td className="p-3 text-sm text-foreground/60 flex items-center gap-1.5"><Maximize className="w-3.5 h-3.5 text-foreground/30" /> {h.size}</td>
                  <td className="p-3 text-sm font-semibold">₹{h.price.toLocaleString()}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => book(h.id, h.name)} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-semibold hover:bg-primary/20 transition-colors flex items-center gap-1.5 ml-auto">
                      <CalendarCheck className="w-3.5 h-3.5" /> Book Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
