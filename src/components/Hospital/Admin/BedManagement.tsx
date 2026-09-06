import React from 'react';
import { BedDouble, Users } from 'lucide-react';

export default function BedManagement() {
  // Simple grid for beds
  const beds = Array.from({ length: 24 }).map((_, i) => {
    const status = Math.random() > 0.6 ? 'occupied' : Math.random() > 0.8 ? 'maintenance' : 'available';
    return { id: `B-${i+1}`, status };
  });

  return (
    <div className="space-y-6">
      <h1 className="section-title">Bed Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-card p-4 text-center">
          <div className="text-emerald-500 font-bold text-2xl">
            {beds.filter(b => b.status === 'available').length}
          </div>
          <div className="text-sm text-[var(--text-secondary)]">Available</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-red-500 font-bold text-2xl">
            {beds.filter(b => b.status === 'occupied').length}
          </div>
          <div className="text-sm text-[var(--text-secondary)]">Occupied</div>
        </div>
        <div className="glass-card p-4 text-center">
          <div className="text-gray-500 font-bold text-2xl">
            {beds.filter(b => b.status === 'maintenance').length}
          </div>
          <div className="text-sm text-[var(--text-secondary)]">Maintenance</div>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {beds.map(bed => (
            <div 
              key={bed.id}
              className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 border cursor-pointer hover:scale-105 transition-transform ${
                bed.status === 'available' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' :
                bed.status === 'occupied' ? 'bg-red-500/10 border-red-500/30 text-red-500' :
                'bg-gray-500/10 border-gray-500/30 text-gray-500'
              }`}
            >
              <BedDouble size={24} className="mb-1" />
              <span className="text-xs font-medium">{bed.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
