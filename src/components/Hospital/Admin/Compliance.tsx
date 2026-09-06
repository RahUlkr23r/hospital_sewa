import React from 'react';
import { Construction } from 'lucide-react';

export default function Compliance() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] space-y-4">
      <Construction size={64} className="text-amber-500 opacity-50" />
      <h2 className="text-2xl font-semibold">Compliance & Audits</h2>
      <p>View ABDM compliance logs and system audit trails.</p>
    </div>
  );
}
