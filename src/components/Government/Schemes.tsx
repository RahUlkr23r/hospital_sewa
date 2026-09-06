import React from 'react';
import { FileText, CheckCircle, IndianRupee } from 'lucide-react';

export default function Schemes() {
  const schemes = [
    { name: 'Ayushman Bharat', enrolled: '24.5M', budget: '7,200 Cr', desc: 'Health coverage up to 5 Lakhs per family per year for secondary and tertiary care hospitalization.' },
    { name: 'National Health Mission', enrolled: 'Pan India', budget: '36,000 Cr', desc: 'Strengthening health systems in rural and urban areas.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-500" />
          Government Health Schemes
        </h1>
        <button className="btn-primary">Add New Scheme</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schemes.map((s, i) => (
          <div key={i} className="glass-card p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gradient gradient-brand mb-2">{s.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6">{s.desc}</p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-[var(--border-color)]">
              <div className="flex flex-col">
                <span className="text-xs text-[var(--text-muted)] flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Enrolled</span>
                <span className="font-semibold text-[var(--text-primary)]">{s.enrolled}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-[var(--text-muted)] flex items-center gap-1"><IndianRupee className="w-3 h-3" /> Allocated Budget</span>
                <span className="font-semibold text-[var(--text-primary)]">₹{s.budget}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
