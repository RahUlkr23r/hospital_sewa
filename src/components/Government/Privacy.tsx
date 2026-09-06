import React from 'react';
import { Lock, Shield, FileX } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <Lock className="w-6 h-6 text-blue-500" />
          Data Privacy & Consent Oversight
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Recent Consent Actions</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-[var(--text-muted)] border-b border-[var(--border-color)]">
                <th className="pb-2">Patient ID</th>
                <th className="pb-2">Entity Requesting</th>
                <th className="pb-2">Data Scope</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { id: 'PT-8821', entity: 'Dr. Sharma (Cardiology)', scope: 'Medical History', status: 'Granted' },
                { id: 'PT-9932', entity: 'PharmaCorp Research', scope: 'Anonymized Vitals', status: 'Revoked' },
                { id: 'PT-1044', entity: 'City Hospital', scope: 'All Records', status: 'Granted' },
              ].map((r, i) => (
                <tr key={i} className="border-b border-[var(--border-color)]/30">
                  <td className="py-3 text-[var(--text-primary)]">{r.id}</td>
                  <td className="py-3 text-[var(--text-secondary)]">{r.entity}</td>
                  <td className="py-3 text-[var(--text-secondary)]">{r.scope}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${r.status === 'Granted' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Compliance Tools</h2>
          <p className="text-sm text-[var(--text-secondary)]">Enforce national privacy regulations across the HealthBridge network.</p>
          <button className="w-full btn-secondary flex items-center justify-center gap-2 py-3">
            <Shield className="w-4 h-4" />
            Generate Compliance Report
          </button>
          <button className="w-full bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20 rounded-lg flex items-center justify-center gap-2 py-3 transition-colors">
            <FileX className="w-4 h-4" />
            Global Consent Override
          </button>
        </div>
      </div>
    </div>
  );
}
