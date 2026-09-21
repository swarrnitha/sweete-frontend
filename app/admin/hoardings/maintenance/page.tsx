'use client';
import { Wrench, MapPin, Maximize, User, Calendar, AlertTriangle } from 'lucide-react';

const maintenance = [
  { id: 5, name: 'Anna Nagar Tower', location: 'Chennai', size: '10x5 ft', image: 'https://picsum.photos/seed/annanagar/80/60', technician: 'Rajesh Kumar', technicianPhone: '+91 98765 43210', startDate: '2026-07-15', expectedCompletion: '2026-07-22', priority: 'High', remarks: 'Electrical wiring damage due to storm. Requires rewiring and panel replacement.' },
  { id: 11, name: 'MG Road Billboard', location: 'Bangalore', size: '25x12 ft', image: 'https://picsum.photos/seed/mgroad/80/60', technician: 'Suresh Patel', technicianPhone: '+91 87654 32109', startDate: '2026-07-18', expectedCompletion: '2026-07-20', priority: 'Medium', remarks: 'Routine inspection and bulb replacement for LED panels.' },
  { id: 12, name: 'Park Street Banner', location: 'Kolkata', size: '12x6 ft', image: 'https://picsum.photos/seed/parkstreet/80/60', technician: 'Amit Das', technicianPhone: '+91 76543 21098', startDate: '2026-07-19', expectedCompletion: '2026-07-21', priority: 'Low', remarks: 'Fabric replacement due to wear and tear from weather.' },
];

const priorityStyles: Record<string, string> = {
  High: 'bg-red-50 text-red-700 border-red-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low: 'bg-green-50 text-green-700 border-green-200',
};

export default function MaintenancePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Maintenance</h1>
        <p className="text-foreground/50 text-sm">{maintenance.length} hoardings under maintenance</p>
      </div>

      <div className="space-y-3">
        {maintenance.map(h => (
          <div key={h.id} className="bg-white rounded-2xl border border-stone-200 p-4">
            <div className="flex gap-4">
              <img src={h.image} alt={h.name} className="w-16 h-12 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{h.name}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${priorityStyles[h.priority]}`}>{h.priority}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-foreground/50 mt-0.5">
                    <MapPin className="w-3 h-3" /> {h.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-foreground/50">
                    <Maximize className="w-3 h-3" /> {h.size}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Assigned Technician</p>
                  <div className="flex items-center gap-1.5 text-sm">
                    <User className="w-3.5 h-3.5 text-foreground/30" /> {h.technician}
                  </div>
                  <p className="text-xs text-foreground/40 mt-0.5">{h.technicianPhone}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Schedule</p>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3 h-3 text-foreground/30" /> Started: {h.startDate}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs mt-0.5">
                    <AlertTriangle className="w-3 h-3 text-foreground/30" /> Expected: {h.expectedCompletion}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-foreground/40 uppercase tracking-wide mb-1">Remarks</p>
                  <p className="text-xs text-foreground/60">{h.remarks}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
