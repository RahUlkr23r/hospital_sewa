import React from 'react';
import { Construction } from 'lucide-react';

export default function PharmacyManagement() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] space-y-4">
      <Construction size={64} className="text-amber-500 opacity-50" />
      <h2 className="text-2xl font-semibold">Pharmacy Management</h2>
      <p>Inventory, low stock alerts, and expiry tracking coming soon.</p>
    </div>
  );
}
