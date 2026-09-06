import React from 'react';
import { Construction } from 'lucide-react';

export default function DiagnosticTools() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] space-y-4">
      <Construction size={64} className="text-amber-500 opacity-50" />
      <h2 className="text-2xl font-semibold">Diagnostic Tools</h2>
      <p>ECG and X-Ray analysis tools being integrated.</p>
    </div>
  );
}
