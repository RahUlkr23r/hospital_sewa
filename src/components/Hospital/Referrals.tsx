import React from 'react';
import { Construction } from 'lucide-react';

export default function Referrals() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] space-y-4">
      <Construction size={64} className="text-amber-500 opacity-50" />
      <h2 className="text-2xl font-semibold">Referrals Module</h2>
      <p>Inter-department and cross-hospital referrals under construction.</p>
    </div>
  );
}
